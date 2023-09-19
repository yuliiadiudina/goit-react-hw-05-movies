import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '6455853a1d19428276a493b9a96f5669';

export async function fetchTrendMovies() {
  const params = {
    api_key: API_KEY,
    language: 'en-US',
  };
  const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
    params: params,
  });
  return response.data;
}

export async function fetchMovies({ abortCtrl, query }) {
  const params = {
    api_key: API_KEY,
    query: query,
    language: 'en-US',
    include_adult: false,
  };
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    signal: abortCtrl.signal,
    params: params,
  });
  return response.data;
}

export async function fetchMovieDetails({ abortCtrl, movieId, fetchField }) {
  const params = {
    api_key: API_KEY,
    language: 'en-US',
  };
  let endPoint;
  switch (fetchField) {
    case 'movie':
      endPoint = `${BASE_URL}/movie/${movieId}`;
      break;
    case 'cast':
      endPoint = `${BASE_URL}/movie/${movieId}/credits`;
      break;
    case 'reviews':
      endPoint = `${BASE_URL}/movie/${movieId}/reviews`;
      break;
    default:
      return;
  }
  const response = await axios.get(endPoint, {
    signal: abortCtrl.signal,
    params: params,
  });
  return response.data;
}