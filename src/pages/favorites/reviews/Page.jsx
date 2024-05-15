import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Tab from '@components/Tab';

import { myReviewListAtom } from '../../../modules/board/atom';
import FavoriteItemList from '../../../modules/board/components/FavoriteItemList';

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
        <FavoriteItemList list={myReviewList.results} isReview />
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
