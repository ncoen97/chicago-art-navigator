import { useQuery } from 'react-query';
import { getArtworks } from '../api/artic';

const useArtworks = ({ q }: { q: string }) => {
  return useQuery({ queryKey: ['artworks', q], queryFn: () => getArtworks({ q }), enabled: !!q });
};

export default useArtworks;
