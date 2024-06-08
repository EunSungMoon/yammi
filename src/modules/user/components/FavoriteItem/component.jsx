import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Image from '@components/Image';
import Typography from '@components/Typography';
import { NetworkError } from '@system/fetcher';

import { useToast } from '../../../../hooks/useToast';
import { accessTokenAtom } from '../../../../modules/auth/atom';
import { setMyBookmarkedListAtom } from '../../atom';
import { getMyBookmarkedList, postFavorite } from '../../fetch';

const Component = ({ item, isLast, isReview }) => {
  const { restaurant } = item;
  const { addToast } = useToast();
  const router = useRouter();

  const [clicked, setClicked] = useState({
    id: restaurant.id,
    isClicked: true,
  });

  const accessToken = useRecoilValue(accessTokenAtom);

  const setMyBookmarkedList = useSetRecoilState(setMyBookmarkedListAtom);

  const handleFavorite = async () => {
    try {
      setClicked({
        id: restaurant.id,
        isClicked: !clicked.isClicked,
      });
      await postFavorite({
        id: restaurant.id,
        bool: !clicked.isClicked,
      });
      addToast({
        title: `저장된 맛집 ${!clicked.isClicked ? '등록' : '삭제'} 성공했습니다.`,
        appearance: 'success',
      });
      const response = await getMyBookmarkedList({}, { accessToken });
      setMyBookmarkedList(response);
    } catch (err) {
      if (err instanceof NetworkError) {
        addToast({
          title: err.message,
          appearance: 'error',
        });
      } else {
        addToast({
          title: '맛집을 저장하는데 오류가 발생했습니다.',
          appearance: 'warn',
        });
      }
    }
  };

  return (
    <Wrapper $isLast={isLast}>
      <Flex $gap={'16px'}>
        <ImageWrapper>
          <Image
            src={restaurant?.image || 'https://picsum.photos/200'}
            fill
            alt={restaurant.name}
          />
        </ImageWrapper>
        <Box>
          <Flex $justifyContent={'space-between'} $gap={'2px'}>
            <Name onClick={() => router.push(`/restaurant/${restaurant.id}`)}>
              {restaurant.name}
            </Name>
            {!isReview ? (
              <FavoriteButton onClick={() => handleFavorite()}>
                <Image
                  src={`/images/star_${clicked.isClicked && clicked.id === restaurant.id ? 'filled' : 'gray'}.svg`}
                  width={20}
                  height={20}
                  alt={'star'}
                />
              </FavoriteButton>
            ) : null}
          </Flex>
          <Flex $gap={'4px'}>
            <TypoXS>{restaurant.category1?.name}</TypoXS>
            {restaurant.category2 !== null ? (
              <>
                <TypoXS>|</TypoXS>
                <TypoXS>{restaurant.category2?.name}</TypoXS>
              </>
            ) : null}
          </Flex>
          {isReview ? (
            <Flex $gap={'8px'} $margin={'4px 0 0'} $flex>
              <Flex $gap={'2px'}>
                <StarImageWrapper>
                  <Image
                    src={'/images/star_filled.svg'}
                    width={13}
                    height={13}
                    alt={'star'}
                  />
                </StarImageWrapper>
                <TypoXS>{item.star}</TypoXS>
              </Flex>
              <Comment>{item.comment}</Comment>
            </Flex>
          ) : null}
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
  flex: ${({ $flex }) => ($flex ? '1' : 'initial')};
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  img {
    border-radius: 8px;
    border: ${({ theme }) => `1px solid ${theme.colors.neutral[200]}`};
  }
`;

const Name = styled(Typography).attrs({
  variant: 'l',
  fontWeight: 'bold',
})`
  margin-bottom: 2px;
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
  flex: 1;
`;

const FavoriteButton = styled.div`
  border: ${({ theme }) => `1px solid ${theme.colors.neutral[100]}`};
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
  width: 30px;
  height: 30px;
`;

const Box = styled.div`
  flex: 1;
`;

const StarImageWrapper = styled.div`
  width: 16px;
  height: 16px;
  padding: 2px 1px;
`;
