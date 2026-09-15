import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { Toaster, toast } from 'react-hot-toast';
import ReactPaginateModule from 'react-paginate';
import type { ReactPaginateProps } from 'react-paginate';
import type { ComponentType } from 'react';

import SearchBar from '../SearchBar/SearchBar.tsx';
import MovieGrid from '../MovieGrid/MovieGrid.tsx';
import MovieModal from '../MovieModal/MovieModal.tsx';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage.tsx';
import { Loader } from '../Loader/Loader.tsx';

import { fetchMovies } from '../../services/movieService.ts';
import type { Movie } from '../../types/movie.ts';

type ModuleWithDefault<T> = { default: T };
const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);

 const {
  data,
  isLoading,
  isError,
  isSuccess,
} = useQuery({
  queryKey: ['movies', query, page],
  queryFn: () => fetchMovies(query, page),
  enabled: Boolean(query),
  placeholderData: keepPreviousData,
});

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;
  const isEmpty = isSuccess && movies.length === 0;

  // Сповіщення про відсутність результатів з бекенду
  useEffect(() => {
    if (isEmpty && query) {
      toast('No movies found for your request.', {
        icon: '✖️',
        id: 'empty-search-toast',
      });
    }
  }, [isEmpty, query]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <SearchBar onSubmit={handleSearch} />

      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}

      {isLoading && <Loader />}
      
      {isError && (
        <ErrorMessage message="There was an error loading movies, please try again." />
      )}
      
      {isEmpty && (
        <ErrorMessage message="No movies found for your request." />
      )}

      {totalPages > 1 && !isLoading && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          forcePage={page - 1}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}