import styled from '@emotion/styled';
import { Form, Field } from 'formik';

export const StyledSearchbar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  background-color: #757575;

`;
export const StyledForm = styled(Form)`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 300px;
  background-color: #fff;
  border-radius: 40px;
  overflow: hidden;
`;
export const SearchButton = styled.button`
display: flex;
cursor: pointer;
font: inherit;
padding: 10px 10px;
color: #757575;
border: none;
background-color: transparent;
  }
`;
export const SearchInput = styled(Field)`
  display: inline-block;
  width: 100%;
  font: inherit;
  font-size: 18px;
  border: none;
  outline: none;
  height: 40px;
  padding: 0px 0px 0px 14px;
  &::placeholder {
    font: inherit;
    font-size: 18px;
  }
`;