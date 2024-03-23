import {
  isArray,
  isDate,
  isEqual,
  isObject,
  keys,
  merge,
  omitBy,
  pick,
} from 'lodash';
function isIsoString(text) {
  if (typeof text !== 'string') {
    return false;
  }
  const regex =
    /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/g;
  return regex.test(text);
}
function isAllUndefined(value) {
  if (isArray(value) || !isObject(value)) {
    return false;
  }
  if (isDate(value)) {
    return false;
  }
  // value checker
  function checker(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const val = obj[key];
        if (isObject(val)) {
          checker(val);
        }
        if (typeof value !== 'undefined') {
          return false;
        }
      }
    }
    return true;
  }
  return checker(value);
}

const getDifference = (obj1, obj2, option) => {
  const diffs = {};
  let key;
  // 비교대싱이 될 값=origin (obj1)은 store의 값(Proxy value or deserialized value)이고
  // 비교할 값 (obj2)는 plain object이기에 변경사항을 정확히 체크할 수 없는 문제가 발생합니다.
  // 따라서 모두 plain object상태로 변환하여 변경값만을 체크하도록 합니다.
  const _obj1 = obj1;
  const _obj2 = obj2;
  // 기본 세팅 옵션
  const optionDefs = {
    filterEmptyObject: true,
    customArrayComparer: undefined,
  };
  const _option = merge(optionDefs, option);
  const arraysMatch = function (arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      const val1 = arr1[i];
      const val2 = arr2[i];
      if (!isEqual(val1, val2)) return false;
    }
    return true;
  };
  const compare = function (item1, item2, key) {
    const type1 = Object.prototype.toString.call(item1);
    const type2 = Object.prototype.toString.call(item2);
    if (item1 === item2) {
      return;
    }
    if (type2 === '[object Null]') {
      diffs[key] = null;
      return;
    }
    // If type2 is undefined it has been removed
    if (type2 === '[object Undefined]') {
      diffs[key] = undefined;
      return;
    }
    // if Date,
    if (isIsoString(item1)) {
      if (new Date(item1).toISOString() !== new Date(item2).toISOString()) {
        diffs[key] = item2;
      }
      return;
    }
    // If items are different types
    if (type1 !== type2) {
      diffs[key] = item2;
      return;
    }
    // If an object, compare recursively
    if (type1 === '[object Object]') {
      const objDiff = getDifference(item1, item2);
      if (Object.keys(objDiff).length > 0) {
        diffs[key] = objDiff;
      }
      return;
    }
    // If an array, compare
    if (type1 === '[object Array]') {
      if (typeof _option.customArrayComparer !== 'undefined') {
        diffs[key] = _option.customArrayComparer(item1, item2);
      } else {
        // replace array
        if (!arraysMatch(item1, item2)) {
          diffs[key] = item2;
        }
      }
      return;
    }
    // Else if it's a function, convert to a string and compare
    // Otherwise, just compare
    if (type1 === '[object Function]') {
      if (item1.toString() !== item2.toString()) {
        diffs[key] = item2;
      }
    } else {
      if (item1 !== item2) {
        diffs[key] = item2;
      }
    }
  };
  // Loop through the first object
  for (key in pick(_obj1, keys(_obj2))) {
    if (_obj1.hasOwnProperty(key)) {
      compare(_obj1[key], _obj2[key], key);
    }
  }
  // Loop through the second object and find missing items
  for (key in _obj2) {
    if (_obj2.hasOwnProperty(key)) {
      if (!_obj1[key] && _obj1[key] !== _obj2[key]) {
        diffs[key] = _obj2[key];
      }
    }
  }
  // filtering empty objects
  if (_option.filterEmptyObject) {
    const ret = omitBy(diffs, isAllUndefined);
    return ret;
  }
  // Return the object of differences
  return diffs;
};
/* eslint-enable */
export default getDifference;
