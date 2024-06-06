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
    accessTokenAtom: accessTokenAtom.key,
  },
  category: {
    categoriesAtom: categoriesAtom.key,
  },
  board: {
    randomRestaurantAtom: randomRestaurantAtom.key,
    restaurantListAtom: restaurantListAtom.key,
    topSelectedRestaurantListAtom: topSelectedRestaurantListAtom.key,
    searchResultListAtom: searchResultListAtom.key,
    restaurantDetailAtom: restaurantDetailAtom.key,
    reviewListAtom: reviewListAtom.key,
  },
  user: {
    myBookmarkedListAtom: myBookmarkedListAtom.key,
    myReviewedListAtom: myReviewListAtom.key,
    userAtom: userAtom.key,
  },
});

const atomMap = {
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
};

const atomHydrator = ({ initialData, recoilSetter }) => {
  Object.keys(atomMap).forEach(key => {
    if (initialData[key] !== undefined) {
      recoilSetter(atomMap[key], initialData[key]);
    }
  });
};

export { atomHydrator, atomMapKey };

export default atomMap;
