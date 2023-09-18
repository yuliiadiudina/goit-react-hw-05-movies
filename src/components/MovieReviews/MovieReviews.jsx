import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from 'components/Loader/Loader';
import { fetchMovieDetails } from 'api/movies';
import { List, Link } from './MovieReviews.styled';

function MovieReviews() {
  const abortCtrl = useRef();
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [movieReviews, setMovieReviews] = useState();

  useEffect(() => {
    async function loadMovieReviews() {
      if (abortCtrl.current) {
        abortCtrl.current.abort();
      }
      abortCtrl.current = new AbortController();
      try {
        setIsLoading(true);
        const response = await fetchMovieDetails({
          abortCtrl,
          movieId,
          fetchField: 'reviews',
        });
        setMovieReviews(response.results);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          return toast.warn(`Oops, something went wrong.`);
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadMovieReviews();
  }, [movieId]);

  return (
    <List>
      {movieReviews &&
        movieReviews.map(({ id, author, content, url }) => {
          if (content.length > 500) {
            content = content.slice(0, 500) + '...';
          }
          return (
            <li key={id}>
              <h4>{`Author: ${author}`}</h4>
              <p>{content}</p>
              {content.length > 500 && (
                <Link href={url} target="_blank" rel="noreferrer noopener">
                  Read full article
                </Link>
              )}
            </li>
          );
        })}
      {movieReviews && !movieReviews.length && (
        <p>There are no reviews for this movie.</p>
      )}
      {isLoading && <Loader />}
      <ToastContainer autoClose={3000} />
    </List>
  );
}

export default MovieReviews;