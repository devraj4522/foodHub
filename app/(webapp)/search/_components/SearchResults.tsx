import { SkeletonCard } from "./SkeletonCard";
import { IMenuSearchResult, ISearchResult } from '@/types/Restaurant';
import { MenuItemCard } from './MenuItemCard';
import { SearchResultCard } from './SearchResultCard';


type SearchType = 'restaurant' | 'menu';

interface SearchResultsProps {
  searchTerm: string;
  searchResults: ISearchResult[] | IMenuSearchResult[];
  searchType: SearchType;
  isLoading: boolean;
}

export function SearchResults({ searchTerm, searchResults, searchType, isLoading }: SearchResultsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {searchTerm && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(searchResults.length === 0 && !isLoading) && (
              <div className="col-span-full text-center py-8">
                <p className="text-xl text-gray-600">No results found for your search.</p>
              </div>
            )}
            {isLoading ? (
              Array(4).fill(0).map((_, index) => <SkeletonCard key={index} />)
            ) : (
              searchResults.map((item) => (
                searchType === 'restaurant' ? (
                  <SearchResultCard key={item.id} restaurant={item as ISearchResult} searchTerm={searchTerm} searchType={searchType} />
                ) : (
                  <MenuItemCard key={item.id} menuItem={item as IMenuSearchResult} searchTerm={searchTerm} />
                )
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}