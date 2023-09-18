import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from 'components/Loader/Loader';
import { fetchMovies } from 'api/movies';
import Searchbar from '../components/Searchbar/Searchbar';
import MoviesCollection from 'components/MoviesCollection/MoviesCollection';

function Movies() {
  const abortCtrl = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  const onQueryChange = chosenQuery => {
    chosenQuery ? setSearchParams({ query: chosenQuery }) : setSearchParams({});
    if (chosenQuery !== query) setMovies([]);
  };

  useEffect(() => {
    if (query === '') return;
    async function loadMovies() {
      if (abortCtrl.current) {
        abortCtrl.current.abort();
      }
      abortCtrl.current = new AbortController();
      try {
        setIsLoading(true);
        const response = await fetchMovies({
          abortCtrl,
          query,
        });
        if (!response.results.length) {
          return toast.warn(
            `Sorry, there are no movies matching your search query. Please try again.`
          );
        }
        setMovies(response.results);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          return toast.warn(`Oops, something went wrong.`);
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadMovies();
  }, [query, setSearchParams]);

  return (
    <>
      <Searchbar
        onSubmit={query => onQueryChange(query)}
        initialValue={query}
      />
      <MoviesCollection movies={movies} />
      {isLoading && <Loader />}
      <ToastContainer autoClose={3000} />
    </>
  );
}
export default Movies;