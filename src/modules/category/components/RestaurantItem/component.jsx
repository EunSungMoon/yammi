import { useRouter } from 'next/router';
import styled from 'styled-components';

import Image from '@components/Image';
import Typography from '@components/Typography';
import withComma from '@system/stringUtils/withComma';

const Component = ({ item, isLast }) => {
  const router = useRouter();
  return (
    <Wrapper $isLast={isLast}>
      <Flex $gap={'16px'}>
        <ImageWrapper>
          <Image
            src={item.image || 'https://picsum.photos/200'}
            fill
            alt={item.name}
          />
        </ImageWrapper>
        <Box>
          <Flex $gap={'4px'}>
            <TypoXS>{item.category1?.name}</TypoXS>
            {item.category2 !== null ? (
              <>
                <TypoXS>|</TypoXS>
                <TypoXS>{item.category2?.name}</TypoXS>
              </>
            ) : null}
          </Flex>
          <Name onClick={() => router.push(`/restaurant/${id}`)}>
            {item.name}
          </Name>

          <Flex $gap={'8px'}>
            <Flex $gap={'2px'}>
              <StarImageWrapper>
                <Image
                  src={'/images/star_filled.svg'}
                  width={13}
                  height={13}
                  alt={'star'}
                />
              </StarImageWrapper>
              <TypoXS>{item.average_star}</TypoXS>
            </Flex>
            <TypoXS>리뷰 {withComma(item.review_count)}</TypoXS>
          </Flex>
        </Box>
      </Flex>
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.div`
  margin-bottom: ${({ $isLast }) => ($isLast ? '0' : '16px')};
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ $gap }) => $gap && $gap};
  justify-content: ${({ $justifyContent }) =>
    $justifyContent ? $justifyContent : 'initial'};

  margin: ${({ $margin }) => ($margin ? $margin : '0')};
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  img {
    border-radius: 8px;
    border: ${({ theme }) => `1px solid ${theme.colors.neutral[200]}`};
  }
`;

const Name = styled(Typography).attrs({
  variant: 'l',
  fontWeight: 'bold',
})`
  margin: 2px 0 4px;
  min-width: 200;
  cursor: pointer;
`;

const TypoXS = styled(Typography).attrs({
  variant: 'xs',
  fontWeight: 'regular',
})`
  color: ${({ theme }) => theme.colors.neutral[600]};
  margin-bottom: ${({ $marginBottom }) =>
    $marginBottom ? $marginBottom : '0'};
`;

const Comment = styled(TypoXS)`
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  max-width: 200px;
`;

const FavoriteButton = styled.div`
  border: ${({ theme }) => `1px solid ${theme.colors.neutral[100]}`};
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
  width: 30px;
  height: 30px;
`;

const Box = styled.div``;

const StarImageWrapper = styled.div`
  width: 16px;
  height: 16px;
  padding: 2px 1px;
`;
