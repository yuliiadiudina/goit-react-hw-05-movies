import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from 'components/Loader/Loader';
import { fetchTrendMovies } from 'api/movies';
import MoviesCollection from 'components/MoviesCollection/MoviesCollection';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [trendMovies, setTrendMovies] = useState([]);

  useEffect(() => {
    async function loadTrendMovies() {
      try {
        setIsLoading(true);
        const response = await fetchTrendMovies();
        setTrendMovies(response.results);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          return toast.warn(`Oops, something went wrong.`);
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadTrendMovies();
  }, []);
  return (
    <>
      <MoviesCollection movies={trendMovies} sectionTitle={'Trending Today'} />
      {isLoading && <Loader />}
      <ToastContainer autoClose={3000} />
    </>
  );
}
export default Home;