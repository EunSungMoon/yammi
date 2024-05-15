import styled from 'styled-components';

import Image from '@components/Image';
import Typography from '@components/Typography';

const Component = ({ category, onClick, clicked }) => {
  return (
    <CategoryItem onClick={onClick}>
      <CategoryImageWrapper $clicked={clicked}>
        <Image
          src={category.image || 'https://picsum.photos/200'}
          fill
          alt={category.name}
        />
      </CategoryImageWrapper>
      <CatgegoryName>{category.name}</CatgegoryName>
    </CategoryItem>
  );
};

export default Component;

const CategoryItem = styled.div`
  cursor: pointer;
`;

const CategoryImageWrapper = styled.div`
  width: 70px;
  height: 70px;
  position: relative;

  border-radius: 8px;
  img {
    border-radius: 8px;
    border: ${({ theme, $clicked }) =>
      `1px solid ${$clicked ? theme.colors.primary[300] : theme.colors.neutral[200]}`};
  }
`;

const CatgegoryName = styled(Typography).attrs({
  variant: 'm',
  fontWeight: 'regular',
})`
  color: ${({ theme }) => theme.colors.neutral[700]};
  text-align: center;
  margin-top: 8px;
`;
