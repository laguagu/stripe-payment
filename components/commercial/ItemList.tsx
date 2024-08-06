import Link from "next/link";
import { FashionItem } from "@/lib/types";
import Image from "next/image";

export default function ItemList({ items }: { items: FashionItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {items.map((item) => (
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
  );
}
