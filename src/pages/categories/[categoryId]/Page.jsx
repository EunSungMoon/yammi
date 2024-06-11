import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Tab from '@components/Tab';

import { restaurantListAtom } from '../../../modules/board/atom';
import { categoriesAtom } from '../../../modules/category/atom';
import RestaurantItemList from '../../../modules/category/components/ResturantItemList';

const Component = () => {
  const categories = useRecoilValue(categoriesAtom);
  const restaurantList = useRecoilValue(restaurantListAtom);

  const tabRef = useRef(null);
  const router = useRouter();

  const tabList = useMemo(() => {
    return categories.map(category => ({
      label: category.name,
      value: category.id,
      link: `/categories/${category.id}`,
    }));
  }, [categories]);

  const getTextLengthPixel = (txt, index) => {
    var myId = 'my_span_ruler';

    var ruler = document.getElementById(myId);

    if (!ruler) {
      ruler = document.createElement('span');
      ruler.id = myId;

      ruler.setAttribute(
        'style',
        'visibility:hidden; white-space:nowrap; position:absolute; left:-9999px; top: -9999px;',
      );
      document.body.appendChild(ruler);
    }

    // 폰트 스타일
    ruler.style.font = document.body.style.font;

    ruler.innerText = txt;

    return ruler.offsetWidth - index * 8 + index * 45;
  };

  useEffect(() => {
    const array = tabList;
    const { categoryId } = router.query;

    const foundSelectedTagIndex = tabList.findIndex(
      el => el.value === Number(categoryId),
    );

    const prevValueOfSelectedArray = array.slice(0, foundSelectedTagIndex);

    const prevValueOfSelectedArrayToText = prevValueOfSelectedArray
      .map(el => el.label)
      .join('');

    tabRef.current.scrollTo(
      getTextLengthPixel(
        prevValueOfSelectedArrayToText,
        prevValueOfSelectedArray.length,
      ),
      0,
    );
  }, [router.query]);

  return (
    <Wrapper>
      <Tab items={tabList} id={'categoryId'} isRouter ref={tabRef} />
      <Content>
        <RestaurantItemList list={restaurantList.results} />
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
