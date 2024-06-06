import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Button from '@components/Button';
import Form from '@components/Form';
import Image from '@components/Image';
import Typography from '@components/Typography';

import { categoriesAtom } from '../modules/category/atom';
import CategorySelector from '../modules/category/components/CategorySelector';

const Component = () => {
  const router = useRouter();
  const categoryForm = useForm();

  const categories = useRecoilValue(categoriesAtom);

  const valueCategory = categoryForm.watch('category');
  const queryCategory =
    valueCategory?.length > 0 ? { category: valueCategory.join(', ') } : null;

  return (
    <Wrapper>
      <Banner>
        <Image
          src={'/images/CardBanner.png'}
          layout="responsive"
          width={1}
          height={1}
          alt={'banner'}
        />
      </Banner>

      <RandomPickWrapper>
        <Title>랜덤 맛집 뽑기</Title>
        <Description>선택하기 어려웠던 메뉴선택 이제 Ya;ㅁ!에서!</Description>
        <Form form={categoryForm}>
          <CategorySelector name="category" categories={categories} />
        </Form>

        <Button
          label="뽑기"
          appearance="primary"
          block
          onClick={() => {
            router.push({
              pathname: '/random-pick',
              query: queryCategory,
            });
          }}
        />
      </RandomPickWrapper>
    </Wrapper>
  );
};

export default Component;
const Wrapper = styled.div`
  padding: 24px 16px;
  margin-bottom: 100px;
`;
const Banner = styled.div`
  position: relative;
  width: 100%;

  img {
    aspect-ratio: 343/140;
  }
`;

const RandomPickWrapper = styled.div`
  margin-top: 24px;
`;

const Title = styled(Typography).attrs({
  variant: 'l',
  fontWeight: 'bold',
})`
  margin-bottom: 4px;
`;

const Description = styled(Typography).attrs({
  variant: 's',
  fontWeight: 'regular',
})`
  color: ${({ theme }) => theme.colors.neutral[700]};
  margin-bottom: 20px;
`;
