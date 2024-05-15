import { useRouter } from 'next/router';
import styled from 'styled-components';

import SearchItem from '../SearchItem';

const Component = ({ list }) => {
  return (
    <Wrapper>
      {list.map((item, index) => (
        <SearchItem
          item={item}
          key={item.id}
          isLast={list.length === index + 1}
        />
      ))}
    </Wrapper>
  );
};

export default Component;
const Wrapper = styled.div`
  padding: 0 16px;
`;
