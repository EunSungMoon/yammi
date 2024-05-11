import styled from 'styled-components';

import ResturantItem from '../ResturantItem';

const Component = ({ list }) => {
  return (
    <Wrapper>
      {list.map((item, index) => (
        <ResturantItem
          key={item.id}
          item={item}
          isLast={list.length === index + 1}
        />
      ))}
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.div``;
