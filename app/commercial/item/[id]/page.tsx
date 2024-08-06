import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { FashionItem } from "@/lib/types";
import RelatedItems from "./RelatedItems";
import Image from "next/image";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getItem(id: string) {
  const { data, error } = await supabase
    .from("fashion_items")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching item:", error);
    return null;
  }

  return data;
}

export default async function ItemPage({ params }: { params: { id: string } }) {
  const item = await getItem(params.id);

  if (!item)
    return (
      <div className="text-center text-2xl text-gray-600">Item not found</div>
    );

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50">
      <Link href="/commercial">
        <button className="mb-8 text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
          ← Back to Home
        </button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative h-96 md:h-[600px] rounded-xl overflow-hidden shadow-lg">
          <Image
            src={item.image_url}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            className="transition duration-300 ease-in-out transform hover:scale-105"
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">{item.name}</h1>
          <p className="text-xl text-gray-600">{item.category}</p>
          <p className="text-3xl font-bold text-blue-600">
            ${item.price.toFixed(2)}
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            {item.description}
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1">
            Add to Cart
          </button>
        </div>
      </div>
      <RelatedItems currentEmbedding={item.embedding} currentId={item.id} />
    </div>
  );
}
