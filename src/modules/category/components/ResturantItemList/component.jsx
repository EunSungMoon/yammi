import styled from 'styled-components';

import RestaurantItem from '../RestaurantItem';

const Component = ({ list, isReview }) => {
  return (
    <Wrapper>
      {list.map((item, index) => (
        <RestaurantItem
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
