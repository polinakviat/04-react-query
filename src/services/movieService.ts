import axios from 'axios';
import type { Movie } from '../types/movie';

export interface FetchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Отримуємо Bearer токен із змінних оточення Vite
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
});

// Два обов'язкові позиційні параметри: query та page
export const fetchMovies = async (
  query: string,
  page: number
): Promise<FetchMoviesResponse> => {
  const response = await tmdbApi.get<FetchMoviesResponse>('/search/movie', {
    params: {
      query,
      page,
    },
  });

  return response.data;
};