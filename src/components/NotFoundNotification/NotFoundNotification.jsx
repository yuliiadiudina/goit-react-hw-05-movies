import styled from '@emotion/styled';
const Section = styled.section`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export function NotFoundNotification() {
  return (
    <Section>
      <h3>Oops! We can't find the page you're looking for</h3>
      <h4>You tried to request a page that doesn't exist </h4>
    </Section>
  );
}