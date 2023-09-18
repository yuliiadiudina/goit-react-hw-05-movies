import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from 'components/Loader/Loader';
import { fetchMovieDetails } from 'api/movies';
import { List, Item, Picture } from './MovieCast.styled';


const IMAGES_URL = 'https://image.tmdb.org/t/p/w500';
function MovieCast() {
  const abortCtrl = useRef();
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [movieCast, setMovieCast] = useState();

  useEffect(() => {
    async function loadMovieCast() {
      if (abortCtrl.current) {
        abortCtrl.current.abort();
      }
      abortCtrl.current = new AbortController();
      try {
        setIsLoading(true);
        const response = await fetchMovieDetails({
          abortCtrl,
          movieId,
          fetchField: 'cast',
        });
        setMovieCast(response.cast.slice(0, 7));
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          return toast.warn(`Oops, something went wrong.`);
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadMovieCast();
  }, [movieId]);

  return (
    <List>
      {movieCast &&
        movieCast.map(({ id, name, character, profile_path }) => {
          return (
            <Item key={id}>
              {profile_path &&
                <Picture src={IMAGES_URL + profile_path} alt={name} />
              }
              <h5>{name}</h5>
              <p>{`Character: ${character}`}</p>
            </Item>
          );
        })}
      {movieCast && !movieCast.length && (
        <p>There is no information about this movie cast.</p>
      )}
      {isLoading && <Loader />}
      <ToastContainer autoClose={3000} />
    </List>
  );
}

export default MovieCast;