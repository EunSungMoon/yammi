import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Tab from '@components/Tab';

import { restaurantListAtom } from '../../../modules/board/atom';
import { categoriesAtom } from '../../../modules/category/atom';
import RestaurantItemList from '../../../modules/category/components/CategoryItemList';

const Component = () => {
  const categories = useRecoilValue(categoriesAtom);
  const restaurantList = useRecoilValue(restaurantListAtom);

  const tabList = useMemo(() => {
    return categories.map(category => ({
      label: category.name,
      value: category.id,
      link: `/categories/${category.id}`,
    }));
  }, [categories]);

  return (
    <Wrapper>
      <Tab items={tabList} id={'categoryId'} isRouter />
      <Content>
        <RestaurantItemList categories={restaurantList.results} />
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
