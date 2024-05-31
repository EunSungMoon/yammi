import styled from 'styled-components';

import MenuItem from '../MenuItem';

const Component = ({ list }) => {
  return (
    <Wrapper>
      {list.map((item, index) => (
        <MenuItem
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
