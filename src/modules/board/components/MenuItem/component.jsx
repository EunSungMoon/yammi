import styled from 'styled-components';

import Button from '@components/Button';
import Image from '@components/Image';
import Typography from '@components/Typography';
import withComma from '@system/stringUtils/withComma';

const Component = ({ item, isLast }) => {
  const { description, id, image, name, price, restaurant } = item;
  return (
    <Wrapper $isLast={isLast}>
      <ImageWrapper>
        <Image src={image ? image : '/images/logo.svg'} fill alt={''} />
      </ImageWrapper>
      <div>
        <Menu>{name}</Menu>
        <Menu>{description}</Menu>
        <Price>{withComma(price)}원</Price>
      </div>
    </Wrapper>
  );
};
export default Component;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: ${({ $isLast }) => ($isLast ? '0' : '16px')};
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 82px;
  height: 82px;
  img {
    border-radius: 8px;
    border: ${({ theme }) => `1px solid ${theme.colors.neutral[200]}`};
  }
`;

const Menu = styled(Typography).attrs({
  variant: 'l',
  fontWeight: 'regular',
})``;

const Price = styled(Typography).attrs({
  variant: 'm',
  fontWeight: 'bold',
})`
  margin-top: 4px;
`;
