import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { FashionItem } from "@/lib/types";
import Image from "next/image";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getRelatedItems(currentId: number, embedding: string) {
  const { data, error } = await supabase.rpc("find_similar_fashion_items", {
    input_id: currentId,
    input_embedding: embedding,
  });

  if (error) {
    console.error("Error fetching related items:", error);
    return [];
  }

  return data ?? [];
}

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
        {relatedItems.map((item: any) => (
          <Link href={`/item/${item.id}`} key={item.id}>
            <div className="border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
              <div className="relative h-64">
                <Image
                  src={item.image_url}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 mb-3">{item.category}</p>
                <p className="text-blue-600 font-bold text-lg">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
