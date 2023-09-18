import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const Section = styled.section``;
export const SectionNav = styled.div`
  padding: 4px 20px;
  background-color: rgb(255, 109, 0);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
export const InfoLink = styled(Link)`
  display: inline-block;
  margin: 6px;
  padding: 5px;
  width: 70px;
  border-radius: 20px;
  color: black;
  text-align: center;
`;