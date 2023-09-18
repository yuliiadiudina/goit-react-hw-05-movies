import React from 'react';
import { StyledHeader, Navigation, NavigationLink } from './Header.styled';

function Header() {
  return (
    <StyledHeader>
      <Navigation>
        <NavigationLink to="/">Home</NavigationLink>
        <NavigationLink to="/movies">Movies</NavigationLink>
      </Navigation>

    </StyledHeader>
  );
}
export default Header;