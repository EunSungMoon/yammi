import { getItemAtom, itemAtom } from './test/atom';

const atomMapKey = Object.freeze({
  test: {
    itemAtom: 'itemAtom',
  },
});

const atomMap = Object.freeze({
  [atomMapKey.test.itemAtom]: itemAtom,
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
