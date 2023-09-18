import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Section, BackLink, Poster, Description } from './MovieCard.styled';


const IMAGES_URL = 'https://image.tmdb.org/t/p/w500';

function MovieCard({ movieDetails }) {
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? `/movies`);
  if (!movieDetails) return;
  const { poster_path,  title, vote_average, overview, release_date, genres } =
    movieDetails;
  const genresToDisplay = genres.map(({ name }) => name).join(' ');

  return (
    <>
      <BackLink to={backLinkHref.current}>&#129044; Go back</BackLink>
      <Section>
      {poster_path && <Poster src={IMAGES_URL + poster_path} alt={title} />}
        <Description>
          <h2>{`${title} (${release_date.slice(0, 4)})`}</h2>
          <p>User Score: {`${Math.round(Number(vote_average) * 10)}%`}</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h4>Genres</h4>
          <p>{genresToDisplay}</p>
        </Description>
      </Section>
    </>
  );
}

export default MovieCard;