import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Typography from '@components/Typography';

import {
  searchResultListAtom,
  topSelectedRestaurantListAtom,
} from '../../modules/board/atom';
import SearchItemList from '../../modules/board/components/SearchItemList';
import TopSelectedRestaurantItemList from '../../modules/board/components/TopSelectedRestaurantItemList';

const Component = () => {
  const router = useRouter();
  const topSelectedRestaurantList = useRecoilValue(
    topSelectedRestaurantListAtom,
  );
  const searchResult = useRecoilValue(searchResultListAtom);
  const { keyword } = router.query;

  const showTopSelectedList = useMemo(() => {
    if (keyword !== undefined && searchResult.results.length > 0) {
      return false;
    } else if (!keyword) {
      return true;
    } else {
      return true;
    }
  }, [router, searchResult]);

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
        <TopSelectedBox>
          <TopTitle>TOP 5</TopTitle>
          <TopDescriptoin>Ya:ㅁ! 이용자가 직접 선택한 TOP 5!</TopDescriptoin>
          <TopSelectedRestaurantItemList list={topSelectedRestaurantList} />
        </TopSelectedBox>
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

const TopTitle = styled(Typography).attrs({
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
