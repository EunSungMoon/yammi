import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import EmptyState from '@components/EmptyState';
import Tab from '@components/Tab';

import { myBookmarkedListAtom } from '../../../modules/user/atom';
import FavoriteItemList from '../../../modules/user/components/FavoriteItemList';

const Component = () => {
  const router = useRouter();
  const myBookmarkList = useRecoilValue(myBookmarkedListAtom);
  console.log('🚀 ~ Component ~ myBookmarkList:', myBookmarkList);

  const tabList = [
    { label: '저장된 맛집', value: 'BOOKMARKED', link: '/favorites/bookmarks' },
    { label: '평가한 맛집', value: 'REVIEWED', link: '/favorites/reviews' },
  ];

  return (
    <Wrapper>
      <Tab items={tabList} id={'bookmarks'} isRouter />
      <Content>
        {myBookmarkList.results.length > 0 ? (
          <FavoriteItemList list={myBookmarkList.results} />
        ) : (
          <EmptyStateWrapper>
            <EmptyState
              isIcon
              title={'저장된 맛집이 없습니다'}
              description={'지금 바로 맛집을 등록해보세요'}
              buttons={[
                {
                  label: '맛집 구경가기',
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
