import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Element } from 'react-scroll';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Button from '@components/Button';
import EmptyState from '@components/EmptyState';
import Form from '@components/Form';
import Image from '@components/Image';
import Tab from '@components/Tab';
import Textarea from '@components/Textarea';
import Typography from '@components/Typography';
import { NetworkError } from '@system/fetcher';
import withComma from '@system/stringUtils/withComma';

import { useToast } from '../../../hooks/useToast';
import { accessTokenAtom } from '../../../modules/auth/atom';
import {
  restaurantDetailAtom,
  reviewListAtom,
  setReviewListAtom,
} from '../../../modules/board/atom';
import MenuItemList from '../../../modules/board/components/MenuItemList';
import RestuarantDetail from '../../../modules/board/components/RestuarantDetail';
import ReviewItemList from '../../../modules/board/components/ReviewItemList';
import { createReview, getReviewList } from '../../../modules/board/fetch';

const Component = () => {
  const form = useForm();
  const { addToast } = useToast();

  const reviewList = useRecoilValue(reviewListAtom);
  const restaurantDetail = useRecoilValue(restaurantDetailAtom);
  const accessToken = useRecoilValue(accessTokenAtom);

  const setReviewList = useSetRecoilState(setReviewListAtom);

  const slicedMenuList = restaurantDetail.menu.slice(0, 3);
  const slicedReviewList = reviewList.slice(0, 3);
  const [isMore, setIsMore] = useState(true);
  const [isMoreReview, setIsMoreReview] = useState(true);
  const tabList = [
    {
      label: '메뉴',
      value: 'menu',
    },
    {
      label: '리뷰',
      value: 'review',
    },
    {
      label: '위치',
      value: 'map',
    },
  ];

  const handleCreateReview = async data => {
    try {
      await createReview(
        {
          comment: data.comment,
          restaurant: restaurantDetail.id,
        },
        { accessToken },
      );
      addToast({
        title: '리뷰가 작성되었습니다.',
        appearance: 'success',
      });

      const response = await getReviewList({}, { accessToken });
      setReviewList(response.data);
    } catch (err) {
      if (err instanceof NetworkError) {
        addToast({
          title: err.message,
          appearance: 'error',
        });
      } else {
        addToast({
          title: '리뷰를 작성하는데 오류가 발생했습니다.',
          appearance: 'warn',
        });
      }
    } finally {
      form.setValue('comment', '');
    }
  };

  return (
    <Wrapper>
      <RestuarantDetail reviewTotal={reviewList.length} />
      <Divider />
      <TabWrapper>
        <Tab items={tabList} id={'detail'} isCenter />
      </TabWrapper>
      <Element name="menu">
        <Content>
          <Title>메뉴</Title>
          {restaurantDetail.menu.length > 0 ? (
            <>
              <MenuItemList
                list={isMore ? slicedMenuList : restaurantDetail.menu}
              />
              <Button
                label={
                  <>
                    <ButtonLabel>메뉴</ButtonLabel>{' '}
                    {isMore ? '더보기' : '숨기기'}
                  </>
                }
                block
                appearance="subtle"
                onClick={() => setIsMore(!isMore)}
              />
            </>
          ) : (
            <EmptyState title={'메뉴가 없습니다.'} />
          )}
        </Content>
      </Element>
      <Divider />
      <Element name={'review'}>
        {/* TODO: 인기순, 최근순 */}
        <Content>
          <Title>리뷰 {withComma(reviewList.length)}개</Title>
          {reviewList.length > 0 ? (
            <>
              <ReviewItemList
                list={isMoreReview ? slicedReviewList : reviewList}
              />
              <Button
                label={
                  <>
                    <ButtonLabel>리뷰</ButtonLabel>{' '}
                    {isMoreReview ? '더보기' : '숨기기'}
                  </>
                }
                block
                appearance="subtle"
                onClick={() => setIsMoreReview(!isMoreReview)}
              />
            </>
          ) : (
            <EmptyState
              isIcon
              title={'등록된 리뷰가 없습니다.'}
              description={'리뷰를 작성해주세요!'}
            />
          )}

          {accessToken ? (
            <>
              <Title $marginTop={'14px'}>리뷰 작성하기</Title>
              <Form form={form} onSubmit={handleCreateReview}>
                {/* TODO: 별점 */}
                <Flex>
                  <Textarea
                    name="comment"
                    placeholder={'식당에 대한 리뷰를 남겨주세요.'}
                  />
                  <Button
                    label={'등록'}
                    appearance="primary"
                    minWidth={'60'}
                    type={'submit'}
                  />
                </Flex>
              </Form>
            </>
          ) : null}
        </Content>
      </Element>
    </Wrapper>
  );
};

export default Component;
const Wrapper = styled.div`
  padding-bottom: 100px;
`;
const TabWrapper = styled.div`
  position: sticky;
  top: 56px;
  z-index: 10;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  button {
    height: 104px;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.neutral[200]};
`;
const Content = styled.div`
  padding: 20px 16px;
`;
const Title = styled(Typography).attrs({
  variant: 'm',
  fontWeight: 'bold',
})`
  margin-bottom: 20px;
  margin-top: ${({ $marginTop }) => $marginTop};
`;

const StarImageWrapper = styled.div`
  width: 20px;
  height: 20px;
  padding: 1px;
`;

const ButtonLabel = styled(Typography).attrs({
  fontWeight: 'bold',
  variant: 'm',
  component: 'span',
})`
  color: inherit;
`;
