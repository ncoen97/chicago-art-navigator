import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IArtwork } from '../../types/api';

export interface FavoritesState {
  artworks: IArtwork[];
}

const initialState: FavoritesState = {
  artworks: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addArtwork: (state, action: PayloadAction<IArtwork>) => {
      state.artworks.push(action.payload);
    },
    removeArtwork: (state, action: PayloadAction<number>) => {
      state.artworks = state.artworks.filter(artwork => artwork.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addArtwork, removeArtwork } = favoritesSlice.actions;

export default favoritesSlice.reducer;
