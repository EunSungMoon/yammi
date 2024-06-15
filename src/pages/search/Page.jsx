import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Tags from '@components/Tags';
import Typography from '@components/Typography';

import { LOCAL_STORAGE_SEARCH_HISTORIES } from './index.page';
import {
  searchHistoriesAtom,
  searchResultListAtom,
  setSearchHistoriesAtom,
  topSelectedRestaurantListAtom,
} from '../../modules/board/atom';
import SearchItemList from '../../modules/board/components/SearchItemList';
import TopSelectedRestaurantItemList from '../../modules/board/components/TopSelectedRestaurantItemList';

const Component = ({ handleSaveSearchKeyword }) => {
  const router = useRouter();
  const topSelectedRestaurantList = useRecoilValue(
    topSelectedRestaurantListAtom,
  );
  const searchResult = useRecoilValue(searchResultListAtom);
  const searchHistories = useRecoilValue(searchHistoriesAtom);

  const setSearchHistories = useSetRecoilState(setSearchHistoriesAtom);

  const { keyword } = router.query;

  const showTopSelectedList = useMemo(() => {
    if (keyword !== undefined && searchResult.results.length > 0) {
      return false;
    } else if (!keyword) {
      return true;
    } else {
      return true;
    }
  }, [keyword, searchResult]);

  const handleDeleteSearchHistories = item => {
    const defaultValue = JSON.stringify([]);
    const histories =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_SEARCH_HISTORIES)) ||
      defaultValue;
    const deletedHistories = histories.filter(h => h !== item);
    localStorage.setItem(
      LOCAL_STORAGE_SEARCH_HISTORIES,
      JSON.stringify(deletedHistories),
    );
    setSearchHistories(deletedHistories);
  };

  const handleDeleteAll = () => {
    localStorage.setItem(LOCAL_STORAGE_SEARCH_HISTORIES, []);
    setSearchHistories([]);
  };

  const handleClickSearchHistory = data => {
    handleSaveSearchKeyword(data);
    router.push({
      pathname: '/search',
      query: {
        keyword: data,
      },
    });
  };

  return (
    <Wrapper>
      {!showTopSelectedList && (
        <>
          <TypoS>
            <SearchTotalSpan>{searchResult.results.length}개</SearchTotalSpan>의
            매장
          </TypoS>
          <SearchItemList list={searchResult.results} />
        </>
      )}
      {keyword && searchResult.results.length === 0 && (
        <EmptyState>검색 결과가 없습니다.</EmptyState>
      )}
      {showTopSelectedList ? (
        <>
          {searchHistories.length > 0 && (
            <>
              <SearchHistoriesTitle>
                <Title>최근 검색어</Title>
                <DeleteButton onClick={() => handleDeleteAll()}>
                  전체 삭제
                </DeleteButton>
              </SearchHistoriesTitle>
              <TagWrapper>
                <Tags
                  list={searchHistories}
                  handleDelete={item => handleDeleteSearchHistories(item)}
                  onClick={item => handleClickSearchHistory(item)}
                />
              </TagWrapper>
              <Divider />
            </>
          )}

          <TopSelectedBox>
            <Title>TOP 5</Title>
            <TopDescriptoin>Ya:ㅁ! 이용자가 직접 선택한 TOP 5!</TopDescriptoin>
            <TopSelectedRestaurantItemList list={topSelectedRestaurantList} />
          </TopSelectedBox>
        </>
      ) : null}
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.div`
  margin-bottom: 100px;
`;

const TopSelectedBox = styled.div`
  padding: 24px 16px;
`;

const Title = styled(Typography).attrs({
  variant: 'l',
  fontWeight: 'bold',
})``;

const TopDescriptoin = styled(Typography).attrs({
  variant: 's',
  fontWeight: 'regular',
})`
  margin: 4px 0 20px;
`;

const TypoS = styled(Typography).attrs({
  variant: 's',
  fontWeight: 'regular',
})`
  color: ${({ theme }) => theme.colors.neutral[600]};
  margin-bottom: 20px;
  padding: 24px 16px 0;
`;
const EmptyState = styled(TypoS)`
  text-align: center;
  margin-bottom: 0;
  padding: 50px 0;
  border-bottom: ${({ theme }) => `4px solid ${theme.colors.neutral[200]}`};
`;
const SearchTotalSpan = styled(Typography).attrs({
  variant: 's',
  fontWeight: 'bold',
  component: 'span',
})`
  color: ${({ theme }) => theme.colors.neutral[600]};
`;
const SearchHistoriesTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 16px 20px;
`;
const DeleteButton = styled(Typography).attrs({
  type: 'text',
  size: 'm',
  fontWeight: 'regular',
  component: 'button',
})`
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.neutral[700]};
  padding: 0 8px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.neutral[600]};
  }

  &:active {
    color: ${({ theme }) => theme.colors.neutral[900]};
  }
`;
const TagWrapper = styled.div`
  padding: 0 16px 20px;
`;
const Divider = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.neutral[200]};
`;
