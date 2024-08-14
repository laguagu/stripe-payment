"use client";

import { useState, useTransition, useCallback, useMemo } from "react";
import { FashionItem } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchItems } from "@/app/actions";
import ItemList from "@/components/commercial/ItemList";
import CategoryFilter from "@/components/commercial/CategoryFilter";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface SmartSearchProps {
  initialItems: FashionItem[];
  categories: string[];
  initialCategory?: string;
}

export default function SmartSearch({
  initialItems,
  categories,
  initialCategory,
}: SmartSearchProps) {
  // Tilamuuttujat
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<FashionItem[]>(initialItems);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    initialCategory
  );
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [hasPerformedSearch, setHasPerformedSearch] = useState(false);

  console.log("Component re-rendered. Current state:", {
    searchQuery,
    selectedCategory,
    itemsCount: items.length,
    hasPerformedSearch,
  });

  // Asiakaspuolen suodatus
  const filteredItems = useMemo(() => {
    console.log("Recalculating filteredItems");
    if (hasPerformedSearch) {
      console.log("Using server-side search results");
      return items;
    }
    const filtered = initialItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!selectedCategory ||
          selectedCategory === "All" ||
          item.category === selectedCategory)
    );
    console.log(`Client-side filtering: ${filtered.length} items found`);
    return filtered;
  }, [initialItems, items, searchQuery, selectedCategory, hasPerformedSearch]);

  // Palvelinpuolen hakufunktio
  const performSearch = useCallback(
    async (query: string, category: string | undefined) => {
      console.log("Performing server-side search:", { query, category });
      try {
        const results = await searchItems(query, category);
        console.log(
          `Server-side search completed: ${results.length} items found`
        );
        setItems(results);
        setError(null);
        setHasPerformedSearch(true);
      } catch (err) {
        console.error("Search error:", err);
        setError("An error occurred while searching. Please try again.");
      }
    },
    []
  );

  // Hakukentän muutoksen käsittelijä
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    console.log("Search query changed:", newQuery);
    setSearchQuery(newQuery);
    setHasPerformedSearch(false); // Nollataan hakutila asiakaspuolen suodatusta varten
  };

  // Kategorian muutoksen käsittelijä
  const handleCategoryChange = (category: string | undefined) => {
    console.log("Category changed:", category);
    setSelectedCategory(category);
    setHasPerformedSearch(false); // Nollataan hakutila asiakaspuolen suodatusta varten
    if (category === undefined || category === "All") {
      console.log("Resetting items to initial state");
      setItems(initialItems);
    }
  };

  // Hae-napin painalluksen käsittelijä
  const handleSearchClick = () => {
    console.log("Search button clicked");
    startTransition(() => performSearch(searchQuery, selectedCategory));
  };

  return (
    <div>
      <div className="flex space-x-2 mb-6">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="flex-grow"
        />
        <Button onClick={handleSearchClick} disabled={isPending}>
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Hae"}
        </Button>
      </div>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {filteredItems.length > 0 ? (
        <ItemList items={filteredItems} />
      ) : (
        <p className="text-center text-gray-500">
          No items found. Try a different search term or category.
        </p>
      )}
    </div>
  );
}
