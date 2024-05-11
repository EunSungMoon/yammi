import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { categoriesAtom } from '../../modules/category/atom';
import CategoryItemList from '../../modules/category/components/CategoryItemList';

const Component = () => {
  const categories = useRecoilValue(categoriesAtom);

  return (
    <Wrapper>
      <CategoryItemList categories={categories} />
    </Wrapper>
  );
};

export default Component;
const Wrapper = styled.div`
  padding: 24px 16px;
  margin-bottom: 100px;
`;
