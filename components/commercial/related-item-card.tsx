import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { FashionItem } from "@/lib/types";

export default function RelatedItemCard({ item }: { item: FashionItem }) {
    return (
      <Link href={`/commercial/item/${item.id}`}>
        <Card className="h-full hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
          <div className="relative h-64">
            <Image
              src={item.image_url}
              alt={item.name}
              fill
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