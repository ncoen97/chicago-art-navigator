import { useQuery } from 'react-query';
import { getArtwork } from '../api/artic';

const useArtwork = (id: number) => {
  return useQuery({ queryKey: ['artwork', id], queryFn: () => getArtwork(id) });
};

export default useArtwork;
