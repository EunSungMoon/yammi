import {
  myBookmarkedListAtom,
  myReviewListAtom,
  randomRestaurantAtom,
  restaurantListAtom,
} from './board/atom';
import { categoriesAtom } from './category/atom';

const atomMapKey = Object.freeze({
  category: {
    categoriesAtom: 'categoriesAtom',
  },
  board: {
    randomRestaurantAtom: 'randomRestaurantAtom',
    restaurantListAtom: 'restaurantListAtom',
    myBookmarkedListAtom: 'myBookmarkedListAtom',
    myReviewedListAtom: 'myReviewedListAtom',
  },
});

const atomMap = Object.freeze({
  [atomMapKey.category.categoriesAtom]: categoriesAtom,
  [atomMapKey.board.randomRestaurantAtom]: randomRestaurantAtom,
  [atomMapKey.board.restaurantListAtom]: restaurantListAtom,
  [atomMapKey.board.myBookmarkedListAtom]: myBookmarkedListAtom,
  [atomMapKey.board.myReviewedListAtom]: myReviewListAtom,
});

function atomHydrator(initialData) {
  const hydrateTargets = [];
  Object.keys(atomMap).forEach(atomMapKey => {
    const targetAtom = atomMap[atomMapKey];

    if (initialData[atomMapKey] !== undefined) {
      hydrateTargets.push([initialData[atomMapKey]]);
    }
  });
  return hydrateTargets;
}

export { atomHydrator, atomMapKey };
export default atomMap;
