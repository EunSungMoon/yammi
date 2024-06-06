import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import EmptyState from '@components/EmptyState';
import Tab from '@components/Tab';

import { myReviewListAtom } from '../../../modules/user/atom';
import FavoriteItemList from '../../../modules/user/components/FavoriteItemList';

const Component = () => {
  const myReviewList = useRecoilValue(myReviewListAtom);

  const tabList = [
    { label: '저장된 맛집', value: 'BOOKMARKED', link: '/favorites/bookmarks' },
    { label: '평가한 맛집', value: 'REVIEWED', link: '/favorites/reviews' },
  ];

  return (
    <Wrapper>
      <Tab items={tabList} id={'reviews'} isRouter />
      <Content>
        {myReviewList.results.length > 0 ? (
          <FavoriteItemList list={myReviewList.results} isReview />
        ) : (
          <EmptyStateWrapper>
            <EmptyState
              isIcon
              title={'평가한 맛집이 없습니다'}
              description={'지금 바로 맛집을 평가해보세요'}
              buttons={[
                {
                  label: '맛집 평가하러 가기',
                  appearance: 'primary',
                  onClick: () => router.push('/categories'),
                  block: true,
                },
              ]}
            />
          </EmptyStateWrapper>
        )}
      </Content>
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.div`
  margin-bottom: 100px;
`;

const Content = styled.div`
  padding: 20px 16px;
`;

const EmptyStateWrapper = styled.div`
  padding: 40px 0;
`;
