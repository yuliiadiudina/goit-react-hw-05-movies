import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Loader } from 'components/Loader/Loader';
import { Section, SectionNav, InfoLink } from './AdditionalInfo.styled';

function AdditionalInfo() {
  return (
    <Section>
      <SectionNav>
        <h3>Additional information</h3>
        <InfoLink to="cast"> Cast </InfoLink>
        <InfoLink to="reviews"> Reviews </InfoLink>
      </SectionNav>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </Section>
  );
}

export default AdditionalInfo;