import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Tab from '@components/Tab';

import { resturantListAtom } from '../../../modules/board/atom';
import ResturantItemList from '../../../modules/board/components/ResturantItemList';
import { categoriesAtom } from '../../../modules/category/atom';

const Component = () => {
  const categories = useRecoilValue(categoriesAtom);
  const resturantList = useRecoilValue(resturantListAtom);

  const tabList = useMemo(() => {
    return categories.map(category => ({
      label: category.name,
      value: category.id,
      link: `/categories/${category.id}`,
    }));
  }, [categories]);

  return (
    <Wrapper>
      <Tab items={tabList} id={'categoryId'} />
      <Content>
        <ResturantItemList list={resturantList.results} />
      </Content>
    </Wrapper>
  );
};

export default Component;
const Wrapper = styled.div`
  margin-bottom: 100px;
`;

const Content = styled.div`
  padding: 24px 16px;
`;
