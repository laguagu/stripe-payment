"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import OpenAI from "openai";
import { FashionItem } from "@/lib/types";

export type LoginState = {
  error?: string;
  message?: string;
} | null;

export type SignupState = {
  error?: string;
  message?: string;
} | null;

const supabase = createClient();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  console.log("Attempting login for:", data.email);

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error("Login error:", error);
    return { error: error ? error.message : undefined };
  }

  console.log("Login successful");
  revalidatePath("/commercial", "layout");
  redirect("/commercial");
}

export async function signup(
  _prevState: SignupState,
  formData: FormData
): Promise<SignupState> {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  console.log("Attempting signup for:", data.email);

  const { data: signUpData, error } = await supabase.auth.signUp(data);

  if (error) {
    console.error("Signup error:", error);
    return { error: error.message };
  }

  console.log("Signup response:", signUpData);

  if (signUpData.user && !signUpData.session) {
    console.log("Confirmation email should be sent");
    return { message: "Tarkista sähköpostisi vahvistaaksesi tilisi." };
  } else {
    console.log("User might be automatically confirmed");
    revalidatePath("/", "layout");
    return { message: "Rekisteröityminen onnistui!" };
  }
}

export const githubSignIn = async () => {
  // 1. Create a Supabase client
  const origin = headers().get("origin");
  console.log("origin:", origin);

  // 2. Sign in with GitHub
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });
  console.log("data:", data);

  if (error) {
    console.log(error);
  } else {
    console.log("Redirecting to:", data.url);

    return redirect(data.url);
  }
  // 3. Redirect to landing page
};

export async function signOut() {
  console.log("Signing out");
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Sign out error:", error);
    throw error; // Throw the error to handle it in the component
  }
  console.log("Sign out successful");
  redirect("/login"); // Redirect to login page instead of home
}

// Apufunktio stop-sanojen poistamiseen
function removeStopWords(text: string): string {
  const stopWords = new Set([
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "by",
  ]);
  return text
    .toLowerCase()
    .split(" ")
    .filter((word) => !stopWords.has(word))
    .join(" ");
}

export async function searchItems(
  searchQuery: string | null,
  category: string | undefined
): Promise<FashionItem[]> {
  console.log("Searching for:", searchQuery, "in category:", category);

  try {
    // Aloita kysely valitsemalla kaikki sarakkeet fashion_items-taulusta
    let query = supabase.from("fashion_items").select("*");

    // Lisää kategoria-suodatus, jos kategoria on määritelty ja se ei ole "All"
    if (category && category !== "All") {
      query = query.eq("category", category);
      console.log("Filtering by category:", category);
    }

    // Lisää tekstihaku, jos hakusana on annettu
    if (searchQuery) {
      // Hae tuotteita, joiden nimi tai kuvaus sisältää hakusanan (case-insensitive)
      query = query.or(
        `name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`
      );
      console.log("Using text search for:", searchQuery);
    }

    // Suorita tekstihakukysely ja rajoita tulokset 50:een
    const { data: textResults, error: textError } = await query.limit(50);

    if (textError) throw textError;

    console.log("Text search results count:", textResults.length);

    // Jos tekstihaku tuotti tuloksia tai hakusanaa ei annettu, palauta tulokset
    if (textResults.length > 0 || !searchQuery) {
      console.log("Returning text search results or all items");
      return textResults as FashionItem[];
    }

    // Jos tekstihaku ei tuottanut tuloksia ja hakusana on annettu, käytetään semanttista hakua
    console.log("No text search results, using semantic search");
    // Poista stop-sanat hakusanasta optimointia varten
    const optimizedQuery = removeStopWords(searchQuery);

    // Tarkista, onko hakusanalle jo olemassa embedding tietokannassa
    if (textResults.length === 0 && searchQuery) {
      console.log("No text search results, using semantic search");
      const optimizedQuery = removeStopWords(searchQuery);
      console.log("Optimized query:", optimizedQuery);

      const { data: existingEmbedding, error: embeddingError } = await supabase
        .from("search_embeddings")
        .select("embedding")
        .eq("search_query", optimizedQuery)
        .single();

      let embedding;
      if (existingEmbedding) {
        console.log("Using existing embedding from database");
        embedding = existingEmbedding.embedding;
      } else {
        console.log("Creating new embedding with OpenAI");
        const embeddingResponse = await openai.embeddings.create({
          model: "text-embedding-3-small",
          input: optimizedQuery,
        });
        embedding = embeddingResponse.data[0].embedding;
        console.log("New embedding created:", embedding.slice(0, 5) + "...");

        await supabase.from("search_embeddings").insert({
          search_query: optimizedQuery,
          embedding: embedding,
        });
        console.log("New embedding saved to database");
      }

      console.log("Calling find_similar_fashion_items with params:", {
        input_id: -1,
        input_embedding: embedding.slice(0, 5) + "...",
        input_category: category && category !== "All" ? category : null
      });

      const { data: semanticResults, error: semanticError } = await supabase.rpc(
        "find_similar_fashion_items",
        { 
          input_id: -1,
          input_embedding: embedding,
          input_category: category && category !== "All" ? category : null
        }
      );
      
      if (semanticError) {
        console.error("Semantic search error:", semanticError);
        throw semanticError;
      }
      
      console.log("Semantic search raw results:", semanticResults?.slice(0, 5));
      console.log("Semantic search results count:", semanticResults?.length);
      
      // Suodata tulokset TypeScript-puolella
      const filteredResults = semanticResults?.filter((item: { similarity: number; }) => item.similarity > 0.2) || [];
      console.log("Filtered semantic search results:", filteredResults.slice(0, 5));
      console.log("Filtered semantic search results count:", filteredResults.length);
      
      return filteredResults as FashionItem[];
    }

    console.log("Returning text search results or all items");
    return textResults as FashionItem[];
  } catch (error) {
    console.error("Error in smart search:", error);
    return [];
  }
}