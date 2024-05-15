import styled from 'styled-components';

import TopSelectedRestaurantItem from '../TopSelectedRestaurantItem';

const Component = ({ list }) => {
  return (
    <Wrapper>
      {list.map((item, index) => (
        <TopSelectedRestaurantItem
          key={item.id}
          item={item}
          isLast={list.length === index + 1}
          rank={index + 1}
        />
      ))}
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.div``;
