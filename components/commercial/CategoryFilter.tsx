"use client";
import { useRouter } from "next/navigation";

export default function CategoryFilter({
  categories,
  selectedCategory,
}: {
  categories: string[];
  selectedCategory?: string;
}) {
  const router = useRouter();

  const handleCategoryChange = (category: string | null) => {
    if (category) {
      router.push(`/commercial/?category=${category}`);
    } else {
      router.push("/commercial");
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Categories</h2>
      <div className="flex flex-wrap gap-4">
        <button
          className={`px-6 py-2 rounded-full transition duration-300 ease-in-out ${
            !selectedCategory
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => handleCategoryChange(null)}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`px-6 py-2 rounded-full transition duration-300 ease-in-out ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
