import { useQuery } from 'react-query';
import { getArtworks } from '../api/artic';

const useArtworks = () => {
  return useQuery({ queryKey: 'artworks', queryFn: getArtworks });
};

export default useArtworks;
