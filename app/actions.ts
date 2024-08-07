"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export type LoginState = {
  error?: string;
  message?: string;
} | null;

export type SignupState = {
  error?: string;
  message?: string;
} | null;

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const supabase = createClient();

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
  revalidatePath("/", "layout");
  redirect("/");
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
  "use server";

  // 1. Create a Supabase client
  const supabase = createClient();
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
