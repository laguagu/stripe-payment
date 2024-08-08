import { Suspense } from 'react';
import { createClient } from "@supabase/supabase-js";
import { FashionItem } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import RelatedItemCard from '@/components/commercial/related-item-card';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getRelatedItems(currentId: number, embedding: string) {
  const { data, error } = await supabase.rpc("find_similar_fashion_items", {
    input_id: currentId,
    input_embedding: embedding,
    category: null  // Lisätty tämä rivi
  });

  if (error) {
    console.error("Error fetching related items:", error);
    throw error;
  }

  return data ?? [];
}

// ... (loput koodista pysyy samana)

export default async function RelatedItems({
  currentId,
  currentEmbedding,
}: {
  currentId: number;
  currentEmbedding: string;
}) {
  const relatedItems = await getRelatedItems(currentId, currentEmbedding);

  return (
    <div className="mt-24">
      <h2 className="text-3xl font-bold mb-10 text-gray-800">Related Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {relatedItems.map((item: FashionItem) => (
          <Suspense key={item.id} fallback={<Skeleton className="h-full w-full" />}>
            <RelatedItemCard item={item} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}