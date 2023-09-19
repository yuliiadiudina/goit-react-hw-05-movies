import { Link, useLocation } from 'react-router-dom';
import {
  Section,
  SectionTitle,
  List,
  Item,
  Picture,
  Title,
} from './MoviesCollection.styled';

const IMAGES_URL = 'https://image.tmdb.org/t/p/w500';

function MoviesCollection({ movies, sectionTitle }) {
  const location = useLocation();
  return (
    <Section>
      {sectionTitle && <SectionTitle>{sectionTitle}</SectionTitle>}
      <List>
        {movies.map(({ id, title, poster_path }) => {
          return (
            <Item key={id}>
              <Link to={`/movies/${id}`} state={{ from: location }}>
              {poster_path && <Picture src={IMAGES_URL + poster_path} alt={title} />}
                <Title>{title}</Title>
              </Link>
            </Item>
          );
        })}
      </List>
    </Section>
  );
}
export default MoviesCollection;