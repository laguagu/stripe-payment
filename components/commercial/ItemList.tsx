import Link from "next/link";
import { FashionItem } from "@/lib/types";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function ItemCard({ item }: { item: FashionItem }) {
  return (
    <Link href={`/commercial/item/${item.id}`}>
      <Card className="h-full hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
        <div className="relative h-64 w-full">
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl">{item.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-3">{item.category}</p>
          <p className="text-blue-600 font-bold text-lg">
            ${item.price.toFixed(2)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function ItemList({ items }: { items: FashionItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}