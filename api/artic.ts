import axios from 'axios';
import { IGetArtwork, IGetArtworks } from '../types/api';

const apiURL = 'https://api.artic.edu/api/v1';
const iiifURL = 'https://www.artic.edu/iiif/2';

export const getArtworks = (params: { q: string }) => {
  return axios
    .get<IGetArtworks>(`${apiURL}/artworks/search`, {
      params: { ...params, fields: ['id', 'title', 'artist_title', 'image_id', 'thumbnail'] },
    })
    .then(res => res.data);
};

export const getArtwork = (id: number) => {
  return axios
    .get<IGetArtwork>(`${apiURL}/artworks/${id}`, {
      params: { fields: ['id', 'title', 'artist_title', 'image_id', 'thumbnail'] },
    })
    .then(res => res.data);
};
