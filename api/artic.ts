import axios from 'axios';
import { IGetArtwork, IGetArtworks } from '../types/api';

const apiURL = 'https://api.artic.edu/api/v1';

export const getArtworks = (q: string, pageParam: number) => {
  return axios
    .get<IGetArtworks>(`${apiURL}/artworks/search`, {
      params: { fields: ['id', 'title', 'artist_title', 'image_id', 'thumbnail'], q, page: pageParam || 1 },
    })
    .then(res => res.data);
};

export const getArtwork = (id: number) => {
  return axios
    .get<IGetArtwork>(`${apiURL}/artworks/${id}`, {
      params: {
        fields: [
          'id',
          'title',
          'artist_title',
          'image_id',
          'medium_display',
          'dimensions',
          'thumbnail',
          'place_of_origin',
          'date_display',
          'exhibition_history',
          'is_on_view',
        ],
      },
    })
    .then(res => res.data);
};
