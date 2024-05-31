import { accessTokenAtom } from './auth/atom';
import {
  randomRestaurantAtom,
  restaurantDetailAtom,
  restaurantListAtom,
  reviewListAtom,
  searchResultListAtom,
  topSelectedRestaurantListAtom,
} from './board/atom';
import { categoriesAtom } from './category/atom';
import { myBookmarkedListAtom, myReviewListAtom, userAtom } from './user/atom';

const atomMapKey = Object.freeze({
  auth: {
    accessTokenAtom: 'accessTokenAtom',
  },
  category: {
    categoriesAtom: 'categoriesAtom',
  },
  board: {
    randomRestaurantAtom: 'randomRestaurantAtom',
    restaurantListAtom: 'restaurantListAtom',
    topSelectedRestaurantListAtom: 'topSelectedRestaurantListAtom',
    searchResultListAtom: 'searchResultListAtom',
    restaurantDetailAtom: 'restaurantDetailAtom',
    reviewListAtom: 'reviewListAtom',
  },
  user: {
    myBookmarkedListAtom: 'myBookmarkedListAtom',
    myReviewedListAtom: 'myReviewedListAtom',
    userAtom: 'userAtom',
  },
});

const atomMap = Object.freeze({
  [atomMapKey.category.categoriesAtom]: categoriesAtom,

  [atomMapKey.board.randomRestaurantAtom]: randomRestaurantAtom,
  [atomMapKey.board.restaurantListAtom]: restaurantListAtom,
  [atomMapKey.board.topSelectedRestaurantListAtom]:
    topSelectedRestaurantListAtom,
  [atomMapKey.board.searchResultListAtom]: searchResultListAtom,
  [atomMapKey.board.restaurantDetailAtom]: restaurantDetailAtom,
  [atomMapKey.board.reviewListAtom]: reviewListAtom,

  [atomMapKey.user.myBookmarkedListAtom]: myBookmarkedListAtom,
  [atomMapKey.user.myReviewedListAtom]: myReviewListAtom,
  [atomMapKey.user.userAtom]: userAtom,

  [atomMapKey.auth.accessTokenAtom]: accessTokenAtom,
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
