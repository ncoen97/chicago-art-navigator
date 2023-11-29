import { useInfiniteQuery } from 'react-query';
import { getArtworks } from '../api/artic';

const useArtworks = ({ q }: { q: string }) => {
  return useInfiniteQuery({
    queryKey: ['artworks', q],
    queryFn: ({ pageParam }) => getArtworks(q, pageParam),
    getNextPageParam: lastPage => {
      if (lastPage.pagination.current_page < lastPage.pagination.total_pages) {
        return lastPage.pagination.current_page + 1;
      }
      return lastPage;
    },
  });
};

export default useArtworks;
