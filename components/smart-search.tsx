'use client'

import { useState, useEffect, useTransition, useCallback, useMemo } from 'react';
import { FashionItem } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { searchItems } from '@/app/actions';
import ItemList from '@/components/commercial/ItemList';
import CategoryFilter from '@/components/commercial/CategoryFilter';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import debounce from 'lodash/debounce';

interface SmartSearchProps {
  initialItems: FashionItem[];
  categories: string[];
  initialCategory?: string;
}

export default function SmartSearch({ initialItems, categories, initialCategory }: SmartSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<FashionItem[]>(initialItems);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(initialCategory);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Optimoitu hakuehdotusten generointi
  const suggestions = useMemo(() => {
    if (searchQuery.length < 2) return [];
    return initialItems
      .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(item => item.name)
      .slice(0, 5);
  }, [searchQuery, initialItems]);
  // Hakutoiminto, joka kutsuu palvelimen searchItems-funktiota
  const performSearch = useCallback(async (query: string, category: string | undefined) => {
    if (query.length < 2) {
      setItems(initialItems);
      return;
    }
    try {
      const results = await searchItems(query, category);
      setItems(results);
      setError(null);
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
      console.error('Search error:', err);
    }
  }, [initialItems]);
  // Debounce-toiminto hakujen optimoimiseksi
  const debouncedSearch = useMemo(
    () => debounce((query: string, category: string | undefined) => {
      startTransition(() => performSearch(query, category));
    }, 300),
    [performSearch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length >= 2) {
      debouncedSearch(query, selectedCategory);
    } else {
      setItems(initialItems);
    }
  };
  // Käsittelee kategorian vaihdoksen
  const handleCategoryChange = (category: string | undefined) => {
    setSelectedCategory(category);
    if (category === undefined || category === "All") {
      setSearchQuery('');
      setItems(initialItems);
    } else {
      performSearch(searchQuery, category);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    performSearch(suggestion, selectedCategory);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div>
      <div className="flex flex-col space-y-2 mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pr-10"
          />
          {isPending && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin" />
          )}
        </div>
        {suggestions.length > 0 && (
          <ul className="bg-white border border-gray-300 rounded-md shadow-lg">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
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
      {items.length > 0 ? (
        <ItemList items={items} />
      ) : (
        <p className="text-center text-gray-500">No items found. Try a different search term or category.</p>
      )}
    </div>
  );
}