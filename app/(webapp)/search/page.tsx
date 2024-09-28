'use client';
import { Button } from '@nextui-org/button';
import { Card } from '@nextui-org/card';
import { Input } from '@nextui-org/input';
import { Skeleton } from "@nextui-org/skeleton";
import { useState, useEffect, useCallback, useRef } from 'react';
import { FiClock, FiSearch, FiShoppingCart, FiShoppingBag } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa6';
import Link from 'next/link';
import debounce from 'lodash/debounce';
import { useSearch } from '@/hooks/search/useSearch';
import { useSearchMenu } from '@/hooks/search/useSearchMenu';
import { IMenuSearchResult, ISearchResult } from '@/types/Restaurant';
import { SearchResults } from './_components/SearchResults';


type SearchType = 'restaurant' | 'menu';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<ISearchResult[] | IMenuSearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<ISearchResult[] | IMenuSearchResult[]>([]);
  const [searchType, setSearchType] = useState<SearchType>('menu');
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const { data: restaurantSearchData, isLoading: isRestaurantLoading, refetch: refetchRestaurants } = useSearch(searchTerm);
  const { data: menuSearchData, isLoading: isMenuLoading, refetch: refetchMenu } = useSearchMenu(searchTerm);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const queryParam = searchParams.get('query');
    if (queryParam) {
      setSearchTerm(queryParam);
      if (searchInputRef.current) {
        searchInputRef.current.value = queryParam;
      }
    }
  }, []);
  
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      if (term.trim() && term.length >= 2) {
        if (searchType === 'restaurant') {
          refetchRestaurants();
        } else {
          refetchMenu();
        }
      } else {
        setSearchResults([]);
        setSuggestions([]);
      }
    }, 500),
    [refetchRestaurants, refetchMenu, searchType, searchTerm]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    if (searchType === 'restaurant' && restaurantSearchData) {
      setSearchResults(restaurantSearchData);
      setSuggestions(restaurantSearchData.slice(0, 4));
    } else if (searchType === 'menu' && menuSearchData) {
      setSearchResults(menuSearchData);
      setSuggestions(menuSearchData.slice(0, 4));
    }
  }, [restaurantSearchData, menuSearchData, searchType]);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const toggleSearchType = (newSearchType: SearchType) => {
    setSearchType(newSearchType);
    setSearchResults([]);
    setSuggestions([]);
    setSearchTerm('');
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
    // Trigger a search immediately after changing the search type
    debouncedSearch('');
  };

  return (
    <div className="min-h-screen">
      <SearchHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchType={searchType}
        toggleSearchType={toggleSearchType}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
        searchInputRef={searchInputRef}
      />
      <SearchResults 
        searchTerm={searchTerm}
        searchResults={searchResults}
        searchType={searchType}
        isLoading={searchType === 'restaurant' ? isRestaurantLoading : isMenuLoading}
      />
    </div>
  );
}

interface SearchHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchType: SearchType;
  toggleSearchType: (searchType: SearchType) => void;
  suggestions: ISearchResult[] | IMenuSearchResult[];
  setSuggestions: (suggestions: ISearchResult[] | IMenuSearchResult[]) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
}

function SearchHeader({ searchTerm, setSearchTerm, searchType, toggleSearchType, suggestions, setSuggestions, searchInputRef }: SearchHeaderProps) {
  return (
    <div className="mb-12 py-8 text-center bg-lime-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl text-black font-bold mb-4">Find Your Next Favorite Meal</h1>
        <p className="text-xl text-gray-800 mb-8">Discover amazing restaurants and delicious dishes near you</p>

        <SearchInput 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchType={searchType}
          setSuggestions={setSuggestions}
          searchInputRef={searchInputRef}
        />

        <SearchSuggestions 
          suggestions={suggestions}
          searchType={searchType}
        />

        <SearchTypeToggle 
          searchType={searchType}
          toggleSearchType={toggleSearchType}
        />
      </div>
    </div>
  );
}

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchType: SearchType;
  setSuggestions: (suggestions: ISearchResult[] | IMenuSearchResult[]) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
}

function SearchInput({ searchTerm, setSearchTerm, searchType, setSuggestions, searchInputRef }: SearchInputProps) {
  return (
    <div className="mb-8 relative">
      <Input
        ref={searchInputRef}
        placeholder={searchType === 'restaurant' ? "Search for restaurants" : "Search for dishes"}
        value={searchTerm}
        onBlur={() => setSuggestions([])}
        onChange={(e) => setSearchTerm(e.target.value)}
        startContent={<FiSearch className="text-gray-400 text-xl" />}
        classNames={{
          mainWrapper: "rounded-full max-w-md w-full mx-auto text-gray-700 bg-white text-xl shadow-xl ring-1 ring-gray-300 focus:ring-gray-500 transition-all duration-300 hover:shadow-2xl", 
          inputWrapper: "text-gray-700 text-xl bg-white py-6 px-12 w-full",
          input: "text-gray-700 text-xl bg-white placeholder-gray-500 w-full",
        }}
        aria-label={searchType === 'restaurant' ? "Search for restaurants" : "Search for menu items"}
      />
    </div>
  );
}

interface SearchSuggestionsProps {
  suggestions: ISearchResult[] | IMenuSearchResult[];
  searchType: SearchType;
}

function SearchSuggestions({ suggestions, searchType }: SearchSuggestionsProps) {
  return (
    <div className="max-w-md mx-auto">
      {suggestions.length > 0 && (
        <div className="absolute z-10 max-w-md w-full mt-1 bg-white shadow-lg rounded-md overflow-hidden">
          {suggestions.map((item) => (
            <Link href={searchType === 'restaurant' ? `/restaurant/${item.id}` : `/menu-item/${item.id}`} key={item.id}>
              <div className="flex items-center p-2 hover:bg-gray-100">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md mr-3" />
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  {searchType === 'restaurant' ? (
                    <p className="text-sm text-gray-600">{(item as ISearchResult).cuisine.join(', ')}</p>
                  ) : (
                    <p className="text-sm text-gray-600">₹{(item as IMenuSearchResult).price}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

interface SearchTypeToggleProps {
  searchType: SearchType;
  toggleSearchType: (searchType: SearchType) => void;
}

function SearchTypeToggle({ searchType, toggleSearchType }: SearchTypeToggleProps) {
  return (
    <div className="mb-4 flex justify-center">
      <div className="flex gap-4">
        <Button 
          className={`${searchType === 'restaurant'? 'bg-gray-900 text-white': 'bg-gray-300 text-gray-800'}`}
          onClick={() => toggleSearchType('restaurant')}
        >
          Search Restaurants
        </Button>
        <Button 
          className={`${searchType === 'menu'? 'bg-gray-900 text-white': 'bg-gray-300 text-gray-800'}`}
          onClick={() => toggleSearchType('menu')}
        >
          Search Menu Items
        </Button>
      </div>
    </div>
  );
}

