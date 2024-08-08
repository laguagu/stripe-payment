"use client";
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory?: string;
  onCategoryChange: (category: string | undefined) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Categories</h2>
      <div className="flex flex-wrap gap-4">
        <Button
          variant={!selectedCategory ? "default" : "outline"}
          onClick={() => onCategoryChange(undefined)}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}