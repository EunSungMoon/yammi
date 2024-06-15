import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';

import Image from '@components/Image';
import Typography from '@components/Typography';
import withComma from '@system/stringUtils/withComma';

const Component = ({ item, isLast, rank }) => {
  const router = useRouter();
  const {
    id,
    average_star,
    review_count,
    category1,
    category2,
    name,
    image,
    address,
    counter,
  } = item;
  return (
    <Wrapper $isLast={isLast} onClick={() => router.push(`/restaurant/${id}`)}>
      <Flex $gap={'16px'}>
        <Rank>{rank}</Rank>
        <InfoBox>
          <Flex $gap={'8px'}>
            <ImageWrapper>
              <Image src={image || '/images/전체.svg'} fill alt={name} />
            </ImageWrapper>
            <Box>
              <Name>{name}</Name>
              <Flex $gap={'8px'}>
                <Flex $gap={'2px'}>
                  <Image
                    src={'/images/star_filled.svg'}
                    width={16}
                    height={16}
                    alt={'star'}
                  />
                  <TypoXS>{average_star || '평가 없음'}</TypoXS>
                </Flex>
                <ReviewText>리뷰 {withComma(review_count)}개</ReviewText>
              </Flex>
            </Box>
          </Flex>
        </InfoBox>
      </Flex>
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.div`
  cursor: pointer;
  ${({ theme, $isLast }) => {
    if (!$isLast) {
      return css`
        margin-bottom: 12px;
        padding-bottom: 10px;
        border-bottom: 1px solid ${theme.colors.neutral[100]};
      `;
    } else {
      return css`
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      `;
    }
  }}
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ $gap }) => $gap && $gap};
`;

const InfoBox = styled.div``;
const Box = styled.div``;

const ImageWrapper = styled.div`
  position: relative;
  width: 48px;
  height: 48px;

  img {
    border-radius: 8px;
    border: ${({ theme }) => `1px solid ${theme.colors.neutral[200]}`};
  }
`;

const Rank = styled(Typography).attrs({
  variant: 'm',
  fontWeight: 'bold',
})``;

const Name = styled(Typography).attrs({
  variant: 's',
  fontWeight: 'bold',
})`
  margin-bottom: 4px;
`;

const TypoXS = styled(Typography).attrs({
  variant: 'xs',
  fontWeight: 'regular',
})`
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

const ReviewText = styled(TypoXS)`
  color: ${({ theme }) => theme.colors.neutral[700]};
`;
