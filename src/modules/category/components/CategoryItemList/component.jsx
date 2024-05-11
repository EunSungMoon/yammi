import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

import CategoryItem from '../CategoryItem';

const Component = ({ categories }) => {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const handleClick = id => {
    setClicked(id);
    router.push(`/categories/${id}`);
  };

  return (
    <Wrapper>
      {categories.map(category => (
        <CategoryItem
          key={category.name}
          category={category}
          onClick={() => handleClick(category.id)}
          clicked={category.id === clicked}
        />
      ))}
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 21px;

  flex-flow: row wrap;

  margin-bottom: 20px;
`;
