import { useRouter } from 'next/router';
import styled from 'styled-components';

import Image from '@components/Image';
import Typography from '@components/Typography';
import withComma from '@system/stringUtils/withComma';

const Component = ({ item, isLast }) => {
  const {
    id,
    average_start,
    review_count,
    category1,
    category2,
    name,
    image,
    address,
    counter,
  } = item;
  const router = useRouter();
  return (
    <Wrapper $isLast={isLast} onClick={() => router.push(`/restaurant/${id}`)}>
      <Flex $gap={'16px'}>
        <ImageWrapper>
          <Image src={image || 'https://picsum.photos/200'} fill alt={name} />
        </ImageWrapper>
        <Box>
          <Flex $gap={'4px'}>
            <TypoXS>{category1.name}</TypoXS>
            {category2 !== null ? (
              <>
                <TypoXS>|</TypoXS>
                <TypoXS>{category2.name}</TypoXS>
              </>
            ) : null}
          </Flex>
          <Name>{name}</Name>
          <Flex $gap={'8px'}>
            <Flex $gap={'2px'}>
              <StarImagWrapper>
                <Image
                  src={'/images/star_filled.svg'}
                  width={13}
                  height={13}
                  alt={'star'}
                />
              </StarImagWrapper>
              <TypoXS>{average_start || '0'}</TypoXS>
            </Flex>
            <TypoXS>리뷰 {withComma(review_count)}개</TypoXS>
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
const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ $gap }) => $gap && $gap};
`;
const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  img {
    border-radius: 8px;
    border: ${({ theme }) => `1px solid ${theme.colors.neutral[200]}`};
  }
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
  margin: 2px 0 4px;
`;

const StarImagWrapper = styled.div`
  width: 16px;
  height: 16px;
  padding: 2px 1px;
`;
