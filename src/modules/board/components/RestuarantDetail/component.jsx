import { useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';

import Image from '@components/Image';
import Typography from '@components/Typography';
import { NetworkError } from '@system/fetcher';
import withComma from '@system/stringUtils/withComma';

import { useToast } from '../../../../hooks/useToast';
import { accessTokenAtom } from '../../../auth/atom';
import { postFavorite } from '../../../user/fetch';
import { restaurantDetailAtom } from '../../atom';
//gray, filled, filled_gray
const Component = ({ reviewTotal }) => {
  const { addToast } = useToast();
  const restuarant = useRecoilValue(restaurantDetailAtom);
  const accessToken = useRecoilValue(accessTokenAtom);

  const {
    address,
    average_star,
    bookmark,
    bookmark_count,
    category1,
    category2,
    counter,
    id,
    image,
    menu,
    name,
  } = restuarant;
  console.log('🚀 ~ Component ~ restuarant:', restuarant);
  const [clicked, setClicked] = useState(bookmark);

  const averageStar = Math.ceil(average_star);

  const renderAverageStar = useMemo(() => {
    let array = new Array(5 - averageStar).fill(false);
    let average = new Array(averageStar).fill(true);

    return average.concat(array);
  }, [averageStar]);

  const handleBookmark = async () => {
    try {
      setClicked(!clicked);
      await postFavorite(
        {
          id: id,
          bool: !clicked,
        },
        { accessToken },
      );
      addToast({
        title: `맛집을 ${!clicked ? '저장' : '삭제'} 했습니다.`,
        appearance: 'success',
      });
    } catch (err) {
      console.log(err);
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
    <Wrapper>
      <BannerWrapper>
        <Image
          src={image}
          layout="responsive"
          width={1}
          height={1}
          alt={'main'}
        />
      </BannerWrapper>
      <Info>
        <TopSection>
          <Flex $gap={'4px'}>
            <TypoXS>{category1.name}</TypoXS>
            {category2 !== null && (
              <>
                <TypoXS>|</TypoXS>
                <TypoXS>{category2.name}</TypoXS>
              </>
            )}
          </Flex>
          <Flex $justifyContent={'space-between'} $margin={'2px 0 4px'}>
            <Restaurant>{name}</Restaurant>
            <IconBox onClick={handleBookmark}>
              <Image
                src={
                  clicked ? '/images/star_filled.svg' : '/images/star_gray.svg'
                }
                height={20}
                width={20}
                alt={'star'}
              />
            </IconBox>
          </Flex>
          <Flex $gap={'8px'} $margin={'0 0 12px'}>
            <Flex $gap={'4px'}>
              {renderAverageStar.map((item, index) => (
                <StarIconWrapper key={index}>
                  <Image
                    src={
                      item
                        ? '/images/star_filled.svg'
                        : '/images/star_filled_gray.svg'
                    }
                    width={16}
                    height={16}
                    alt={''}
                  />
                </StarIconWrapper>
              ))}
            </Flex>
            <TypoXS>{average_star || '0'} / 5</TypoXS>
          </Flex>
          <Address>{address}</Address>
        </TopSection>
        <BottomSection>
          <Flex $justifyContent={'center'}>
            <CountBox $isBorder>
              <TypoXS>페이지 방문 횟수</TypoXS>
              <TypoM>{withComma(counter)}회</TypoM>
            </CountBox>
            <CountBox $isBorder>
              <TypoXS>평가 데이터 개수</TypoXS>
              <TypoM>{withComma(reviewTotal)}개</TypoM>
            </CountBox>
            <CountBox>
              <TypoXS>즐겨찾기 수</TypoXS>
              <TypoM>{withComma(bookmark_count)}개</TypoM>
            </CountBox>
          </Flex>
        </BottomSection>
      </Info>
    </Wrapper>
  );
};

export default Component;
const Wrapper = styled.div``;
const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  img {
    aspect-ratio: 375/211;
  }
`;

const Info = styled.div`
  padding: 20px 16px 12px;
`;

const TopSection = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral[100]};
  padding-bottom: 12px;
`;
const BottomSection = styled.div`
  padding-top: 12px;
`;

const TypoXS = styled(Typography).attrs({
  variant: 'xs',
  fontWeight: 'regular',
  component: 'span',
})`
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ $justifyContent }) => $justifyContent};
  gap: ${({ $gap }) => $gap};
  margin: ${({ $margin }) => $margin};
`;

const Restaurant = styled(Typography).attrs({
  variant: 'xl',
  fontWeight: 'bold',
})``;

const IconBox = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.neutral[100]};
  border-radius: 4px;
  padding: 4px;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const StarIconWrapper = styled.div`
  width: 20px;
  height: 20px;
  padding: 2px;
`;

const TypoM = styled(Typography).attrs({
  variant: 'm',
  fontWeight: 'regular',
})``;

const Address = styled(TypoM)`
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

const CountBox = styled.div`
  ${({ $isBorder, theme }) => {
    if ($isBorder) {
      return css`
        border-right: 1px solid ${theme.colors.neutral[100]};
        margin-right: 16px;
        padding-right: 16px;
      `;
    }
  }}
`;
