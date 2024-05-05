import { categoriesAtom } from './category/atom';
import { getItemAtom, itemAtom } from './test/atom';

const atomMapKey = Object.freeze({
  test: {
    itemAtom: 'itemAtom',
  },
  category: {
    categoriesAtom: 'categoriesAtom',
  },
});

const atomMap = Object.freeze({
  [atomMapKey.test.itemAtom]: itemAtom,
  [atomMapKey.category.categoriesAtom]: categoriesAtom,
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
