import { useRouter } from 'next/router';
import styled from 'styled-components';

import Image from '@components/Image';
import Typography from '@components/Typography';
import withComma from '@system/stringUtils/withComma';

const Component = ({ item, isLast }) => {
  const router = useRouter();
  const {
    address,
    average_star,
    category1,
    category2,
    counter,
    id,
    image,
    name,
    review_count,
  } = item;

  return (
    <Wrapper $isLast={isLast} onClick={() => router.push(`/resturant/${id}`)}>
      <Flex $gap={'16px'}>
        <ImageWrapper>
          <Image src={image || 'https://picsum.photos/200'} fill alt={''} />
        </ImageWrapper>
        <Box>
          <Flex $gap={'4px'}>
            <TypoXS>{category1.name}</TypoXS>
            <TypoXS>|</TypoXS>
            <TypoXS>{category2 || '-'}</TypoXS>
          </Flex>
          <Name>{name}</Name>
          <Flex $gap={'8px'}>
            <Flex $gap={'2px'}>
              <Image
                src={'/images/star_filled.svg'}
                width={16}
                height={16}
                alt={'star'}
              />
              <TypoXS>{average_star}</TypoXS>
            </Flex>
            <Flex $gap="8px">
              <TypoXS>리뷰 {withComma(review_count)}개</TypoXS>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.div`
  margin-bottom: ${({ $isLast }) => ($isLast ? '0' : '16px')};
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  img {
    border-radius: 8px;
    border: ${({ theme }) => `1px solid ${theme.colors.neutral[200]}`};
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ $gap }) => $gap && $gap};
`;

const Box = styled.div``;
const TypoXS = styled(Typography).attrs({
  variant: 'xs',
  fontWeight: 'regular',
})`
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

const Name = styled(Typography).attrs({
  variant: 'l',
  fontWeight: 'bold',
})`
  color: ${({ theme }) => theme.colors.neutral[900]};
  margin: 2px 0 4px;
`;
