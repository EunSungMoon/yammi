import styled from 'styled-components';

import ReviewItem from '../ReviewItem';

const Component = ({ list }) => {
  return (
    <Wrapper>
      {list.map((item, index) => (
        <ReviewItem
          item={item}
          key={item.id}
          isLast={item.length === index + 1}
        />
      ))}
    </Wrapper>
  );
};
export default Component;

const Wrapper = styled.div``;
