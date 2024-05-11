import { Controller } from 'react-hook-form';
import styled from 'styled-components';

import CategoryItem from '../CategoryItem';

const Component = ({ categories, name }) => {
  return (
    <Controller
      name={name}
      render={({ field: { value = [], onChange } }) => {
        return (
          <CategoryListWrapper>
            {categories.map(category => (
              <CategoryItem
                key={category.name}
                category={category}
                onClick={() => {
                  if (value.includes(category.id)) {
                    onChange(value.filter(v => v !== category.id));
                  } else {
                    onChange([...value, category.id]);
                  }
                }}
                clicked={value.includes(category.id)}
              />
            ))}
          </CategoryListWrapper>
        );
      }}
    />
  );
};

export default Component;
const CategoryListWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 21px;

  flex-flow: row wrap;

  margin-bottom: 20px;
`;
