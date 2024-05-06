import { useRouter } from 'next/router';
import styled from 'styled-components';

import PageComponent from './Page';

export const getServerSideProps = async ({ req }) => {
  return {
    props: {
      initialData: {},
    },
  };
};

const Page = ({ initialData }) => {
  const rotuer = useRouter();

  return (
    <Wrapper>
      <PageComponent />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

export default Page;
