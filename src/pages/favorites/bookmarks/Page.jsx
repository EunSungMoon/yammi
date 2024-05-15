import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Tab from '@components/Tab';

import { myBookmarkedListAtom } from '../../../modules/user/atom';
import FavoriteItemList from '../../../modules/user/components/FavoriteItemList';

const Component = () => {
  const myBookmarkList = useRecoilValue(myBookmarkedListAtom);

  const tabList = [
    { label: '저장된 맛집', value: 'BOOKMARKED', link: '/favorites/bookmarks' },
    { label: '평가한 맛집', value: 'REVIEWED', link: '/favorites/reviews' },
  ];

  return (
    <Wrapper>
      <Tab items={tabList} id={'bookmarks'} isRouter />
      <Content>
        <FavoriteItemList list={myBookmarkList.results} />
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
