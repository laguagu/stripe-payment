import { Suspense } from 'react';
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { FashionItem } from "@/lib/types";
import RelatedItems from "./RelatedItems";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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
    throw error;
  }

  return data;
}

function ItemDetails({ item }: { item: FashionItem }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <p className="text-xl text-gray-600">{item.category}</p>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-blue-600 mb-4">
          ${item.price.toFixed(2)}
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          {item.description}
        </p>
        <Button size="lg">
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

export default async function ItemPage({ params }: { params: { id: string } }) {
  let item: FashionItem | null = null;
  let error: Error | null = null;

  try {
    item = await getItem(params.id);
  } catch (e) {
    error = e as Error;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          An error occurred while fetching the item. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!item) {
    return (
      <Alert>
        <AlertTitle>Not Found</AlertTitle>
        <AlertDescription>
          The requested item could not be found.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50">
      <Link href="/commercial">
        <Button variant="link" className="mb-8">
          ← Back to Home
        </Button>
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
        <Suspense fallback={<Skeleton className="h-full w-full" />}>
          <ItemDetails item={item} />
        </Suspense>
      </div>
      <Suspense fallback={<Skeleton className="h-96 w-full mt-24" />}>
        <RelatedItems currentEmbedding={item.embedding} currentId={item.id} />
      </Suspense>
    </div>
  );
}