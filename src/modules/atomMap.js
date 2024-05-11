import { randomResturantAtom, resturantListAtom } from './board/atom';
import { categoriesAtom } from './category/atom';

const atomMapKey = Object.freeze({
  category: {
    categoriesAtom: 'categoriesAtom',
  },
  board: {
    randomResturantAtom: 'randomResturantAtom',
    resturantListAtom: 'resturantListAtom',
  },
});

const atomMap = Object.freeze({
  [atomMapKey.category.categoriesAtom]: categoriesAtom,
  [atomMapKey.board.randomResturantAtom]: randomResturantAtom,
  [atomMapKey.board.resturantListAtom]: resturantListAtom,
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
