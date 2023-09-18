import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from 'components/Loader/Loader';
import { fetchMovieDetails } from 'api/movies';
import MovieCard from 'components/MovieCard/MovieCard';
import AdditionalInfo from 'components/AdditionalInfo/AdditionalInfo';

function MovieDetails() {
  const abortCtrl = useRef();
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState();

  useEffect(() => {
    async function loadMovieDetails() {
      if (abortCtrl.current) {
        abortCtrl.current.abort();
      }
      abortCtrl.current = new AbortController();
      try {
        setIsLoading(true);
        const response = await fetchMovieDetails({
          abortCtrl,
          movieId,
          fetchField: 'movie',
        });
        setMovieDetails(response);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          return toast.warn(`Oops, something went wrong.`);
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadMovieDetails();
  }, [movieId]);

  return (
    <>
      <MovieCard movieDetails={movieDetails} />
      {isLoading && <Loader />}
      <AdditionalInfo />
      <ToastContainer autoClose={3000} />
    </>
  );
}
export default MovieDetails;