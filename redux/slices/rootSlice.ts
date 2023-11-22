import { combineReducers } from '@reduxjs/toolkit';
import favoritesSlice from './favoritesSlice';

const rootReducer = combineReducers({
  favorites: favoritesSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
