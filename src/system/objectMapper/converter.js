import MapperError from './mapperError';
import { getSchema } from './validator';

function convertString(currentSchema, value) {
  const { type, format } = currentSchema;
  let ret;

  // 데이타 값이 유형하고 같은 경우 추가 확인이 필요하다.
  if (typeof value === type && typeof format !== 'undefined') {
    // 이 조건안에 없으면 이미 변환 완료 된 것이기 때문에 굳이 변환하지 않는다.
    if (format === 'date-time' || format === 'date') {
      ret = new Date(value);
    } else {
      ret = String(value);
    }
  } else {
    ret = String(value);
  }
  return ret;
}

function convertNumber(currentSchema, value) {
  let ret;

  ret = Number(value);
  return ret;
}

function parseSchema(currentSchemaTarget, dataKey, dataVal) {
  // ajvSchema가 Data Key매칭이 안되는 경우 에러
  if (typeof currentSchemaTarget === 'undefined') {
    throw new MapperError('스키마에 해당 키값이 없습니다.', dataKey);
  }

  const { type, $ref } = currentSchemaTarget;

  let val;
  if (type !== undefined) {
    switch (type) {
      case 'string':
        val = convertString(currentSchemaTarget, dataVal);
        break;
      case 'number':
        val = convertNumber(currentSchemaTarget, dataVal);
        break;
      case 'array':
        if (!Array.isArray(dataVal)) {
          throw new MapperError('스키마는 배열인데, 값은 배열이 아닙니다.');
        }
        val = dataVal.map(d =>
          parseSchema(currentSchemaTarget.items, dataKey, d),
        );
        break;
      // 나머지는 신경쓰지 않는다.
      default:
        val = dataVal;
        break;
    }
  }
  if ($ref !== undefined) {
    val = convert($ref, dataVal);
  }

  return val;
}

export default function convert(ajvSchemaKey, data) {
  const ajvSchema = getSchema(ajvSchemaKey);
  // ajvSchema가 이상한경우 에러
  if (typeof ajvSchema.properties === 'undefined') {
    throw new MapperError('스키마에 값이 존재하지 않습니다.', null);
  }
  let ret = {};
  Object.entries(data).forEach(([dataKey, dataVal]) => {
    const currentSchemaTarget = ajvSchema.properties[dataKey];
    // ajvSchema가 Data Key매칭이 안되는 경우 에러
    if (typeof currentSchemaTarget === 'undefined') {
      console.log(
        'dataKeyError >>>>>>> fieldName :',
        dataKey,
        '<<<<<< - errorField',
      );

      throw new MapperError(
        `스키마에 해당 키값이 없습니다. ${dataKey}`,
        dataKey,
      );
    }

    ret[dataKey] = parseSchema(currentSchemaTarget, dataKey, dataVal);
  });

  return ret;
}
