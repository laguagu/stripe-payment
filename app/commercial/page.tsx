import { createClient } from "@supabase/supabase-js";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ClientSeach from "@/components/client-seach"; 
import SmartAutomaticSearch from "@/components/smart-automatic-search";
import { FashionItem } from '@/lib/types';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getCategories() {
  const { data, error } = await supabase
    .from("distinct_categories_view")
    .select();

  if (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }

  return data?.map((item) => item.category) || [];
}

async function getItems(category: string | null) {
  let query = supabase.from("fashion_items").select("*");
  if (category) {
    query = query.eq("category", category);
  }
  const { data, error } = await query;

  if (error) {
    console.error("Error fetching items:", error);
    throw error;
  }

  return data || [];
}
// async function getItems() {
//   const { data, error } = await supabase.from("fashion_items").select("*");

//   if (error) {
//     console.error("Error fetching items:", error);
//     throw error;
//   }

//   return data || [];
// }
export default async function Home({
  searchParams,
}: {
  searchParams: { category: string | undefined };
}) {
  let categories: string[] = [];
  let items: FashionItem[] = [];
  let error: Error | null = null;

  try {
    categories = await getCategories();
    items = await getItems(searchParams.category || null);
    // items = await getItems();
  } catch (e) {
    error = e as Error;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold mb-16 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Fashion Brand
          </span>
        </h1>
        {error ? (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              An error occurred while fetching data. Please try again later.
            </AlertDescription>
          </Alert>
        ) : (
          <SmartAutomaticSearch 
            initialItems={items} 
            categories={categories} 
            initialCategory={searchParams.category}
          />
        )}
      </div>
    </div>
  );
}