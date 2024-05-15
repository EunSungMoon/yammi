import styled from 'styled-components';

import FavoriteItem from '../FavoriteItem';

const Component = ({ list, isReview }) => {
  return (
    <Wrapper>
      {list.map((item, index) => (
        <FavoriteItem
          item={item}
          key={item.id}
          isLast={list.length === index + 1}
          isReview={isReview}
        />
      ))}
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.div``;
