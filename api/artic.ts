import axios from 'axios';
import { IArtwork } from '../types/api';

const serverURL = 'https://api.artic.edu/api/v1';

export const getArtworks = () => {
  return axios.get<IArtwork[]>(`${serverURL}/artworks`);
};
