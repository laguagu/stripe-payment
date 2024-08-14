'use client'

import { useState, useMemo } from 'react';
import { FashionItem } from '@/lib/types';
import { Input } from '@/components/ui/input';
import ItemList from '@/components/commercial/ItemList';
import CategoryFilter from '@/components/commercial/CategoryFilter';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ClientSeachProps {
  initialItems: FashionItem[];
  categories: string[];
  initialCategory?: string;
}

export default function ClientSeach({ initialItems, categories, initialCategory }: ClientSeachProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(initialCategory);

  const filteredItems = useMemo(() => {
    return initialItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [initialItems, searchQuery, selectedCategory]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category: string | undefined) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <div className="flex flex-col space-y-2 mb-6">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="pr-10"
        />
      </div>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      {filteredItems.length > 0 ? (
        <ItemList items={filteredItems} />
      ) : (
        <Alert>
          <AlertDescription>No items found. Try a different search term or category.</AlertDescription>
        </Alert>
      )}
    </div>
  );
}