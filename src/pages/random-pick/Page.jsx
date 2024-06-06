import { useRouter } from 'next/router';
import { FiAlertCircle } from 'react-icons/fi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Button from '@components/Button';
import Image from '@components/Image';
import Typography from '@components/Typography';
import { NetworkError } from '@system/fetcher';
import withComma from '@system/stringUtils/withComma';

import { useToast } from '../../hooks/useToast';
import {
  randomRestaurantAtom,
  setRandomRestaurantAtom,
} from '../../modules/board/atom';
import { getRandomRestaurant } from '../../modules/board/fetch';

const Component = () => {
  const router = useRouter();
  const { addToast } = useToast();

  const randomRestaurant = useRecoilValue(randomRestaurantAtom);
  const setRandomRestaurant = useSetRecoilState(setRandomRestaurantAtom);

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
  } = randomRestaurant;

  const handleClick = async () => {
    try {
      const response = await getRandomRestaurant({
        category: router.query.category,
      });
      setRandomRestaurant(response.data);
    } catch (err) {
      if (err instanceof NetworkError) {
        addToast({
          title: err.message,
          appearance: 'error',
        });
      } else {
        addToast({
          title: '에러가 발생했습니다.',
          appearance: 'warn',
        });
      }
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <InfoBox>
        <FiAlertCircle size={20} />
        <InfoLabel>사진을 클릭하면 해당 가게 페이지로 이동합니다.</InfoLabel>
      </InfoBox>
      <RestaurantBox>
        <ImageWrapper onClick={() => router.push(`/restaurant/${id}`)}>
          <Image
            src={image || 'https://picsum.photos/200'}
            width={1}
            height={1}
            layout="responsive"
            alt={name}
          />
        </ImageWrapper>
        <Flex>
          <TypoXS>{category1.name}</TypoXS>
          {category2 !== null ? (
            <>
              <TypoXS>|</TypoXS>
              <TypoXS>{category2 || '-'}</TypoXS>
            </>
          ) : null}
        </Flex>
        <Name>{name}</Name>
        <Address>{address}</Address>
        <Flex>
          <TypoXS>{average_star || '평가없음'}</TypoXS>
          <TypoXS>|</TypoXS>
          <TypoXS>{withComma(review_count)}</TypoXS>
        </Flex>
      </RestaurantBox>
      <Button
        label={'다시 뽑기'}
        appearance="primary"
        block
        onClick={handleClick}
      />
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.div`
  padding: 24px 16px;
  margin-bottom: 100px;
`;

const InfoBox = styled.div`
  background-color: ${({ theme }) => theme.colors.blue[50]};
  padding: 8px 12px;
  border-radius: 8px;

  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.blue[400]};
`;

const InfoLabel = styled(Typography).attrs({
  variant: 's',
  fontWeight: 'regular',
  colorInheritance: true,
})``;

const ImageWrapper = styled.div`
  border-radius: 8px;
  position: relative;
  width: 100%;
  margin-bottom: 16px;
  cursor: pointer;
  img {
    aspect-ratio: 1/1;
    border: ${({ theme }) => `1px solid ${theme.colors.neutral[400]}`};
    border-radius: 8px;
  }
`;

const RestaurantBox = styled.div`
  margin: 24px 0;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TypoXS = styled(Typography).attrs({
  variant: 'xs',
  fontWeight: 'regular',
})`
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

const Name = styled(Typography).attrs({
  variant: 'xl',
  fontWeight: 'bold',
})`
  color: ${({ theme }) => theme.colors.neutral[900]};
  margin: 4px 0;
`;

const Address = styled(Typography).attrs({
  variant: 'm',
  fontWeight: 'regular',
})`
  color: ${({ theme }) => theme.colors.neutral[700]};
  margin-bottom: 4px;
`;
