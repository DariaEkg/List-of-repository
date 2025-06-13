import useSWR from 'swr';
import { Repository } from '@/types';

const ITEMS_PER_PAGE = 10;

interface SearchResponse {
  items: Repository[];
  total_count: number;
}

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error('Failed to fetch repositories');
  return res.json();
});

export function useRepositorySearch(query: string, page: number = 1) {
  const shouldFetch = query.length > 0 && typeof window !== 'undefined';

  const { data, error, isLoading } = useSWR<SearchResponse>(
    shouldFetch 
      ? `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}+in:name&page=${page}&per_page=${ITEMS_PER_PAGE}` 
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  const totalPages = data ? Math.ceil(data.total_count / ITEMS_PER_PAGE) : 0;

  return {
    repositories: data?.items ?? [],
    isLoading,
    error: error as Error | undefined,
    totalPages,
    currentPage: page,
    totalCount: data?.total_count ?? 0,
  };
}

/*export function useRepositorySearch(query: string, page: number = 1) {
  const shouldFetch = query.length > 0;
  
  const { data, error, isLoading } = useSWR<SearchResponse>(
    shouldFetch 
      ? `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}+in:name&page=${page}&per_page=${ITEMS_PER_PAGE}` 
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  const totalPages = data ? Math.ceil(data.total_count / ITEMS_PER_PAGE) : 0;

  return {
    repositories: data?.items ?? [],
    isLoading,
    error: error as Error | undefined,
    totalPages,
    currentPage: page,
    totalCount: data?.total_count ?? 0,
  };
}  */