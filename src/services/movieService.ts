import axios from 'axios';
import type { Movie } from '../types/movie';
import { VITE_TMDB_TOKEN } from '../services/tmdbApi';

export interface FetchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${VITE_TMDB_TOKEN}`,
  },
});

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