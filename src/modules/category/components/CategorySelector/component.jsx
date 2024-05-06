import { Controller } from 'react-hook-form';
import styled from 'styled-components';

import Image from '@components/Image';
import Typography from '@components/Typography';

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
                onClick={() => {
                  if (value.includes(category.id)) {
                    onChange(value.filter(v => v !== category.id));
                  } else {
                    onChange([...value, category.id]);
                  }
                }}
              >
                <CategoryImageWrapper $clicked={value.includes(category.id)}>
                  <Image src={category.image} fill alt={category.name} />
                </CategoryImageWrapper>
                <CatgegoryName>{category.name}</CatgegoryName>
              </CategoryItem>
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
  gap: 21px;

  flex-flow: row wrap;

  margin-bottom: 20px;
`;

const CategoryItem = styled.div`
  cursor: pointer;
`;

const CategoryImageWrapper = styled.div`
  width: 70px;
  height: 70px;
  position: relative;

  border: ${({ theme, $clicked }) =>
    `1px solid ${$clicked ? theme.colors.primary[300] : theme.colors.neutral[200]}`};
  border-radius: 8px;
  img {
    border-radius: 8px;
  }
`;

const CatgegoryName = styled(Typography).attrs({
  variant: 'm',
  fontWeight: 'regular',
  component: 'label',
})`
  color: ${({ theme }) => theme.colors.neutral[700]};
  text-align: center;
`;
