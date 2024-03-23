import Ajv from 'ajv';
import addFormats from 'ajv-formats';

import MapperError from './mapperError';

const ajv = new Ajv({
  removeAdditional: true,
});
addFormats(ajv);

export function addSchema(key, schema, option) {
  // 얘네가 KEY 존재여부도 체크해주고, 유효성 검사도 해준다.
  try {
    ajv.addSchema(schema, key);
  } catch (e) {
    console.log('TCL ~ file: validator.js:16 ~ addSchema ~ e:', e, key);
    throw new MapperError('등록에 실패하였습니다', key);
  }
}

export function getSchema(key) {
  const validator = ajv.getSchema(key);

  if (typeof validator === 'undefined') {
    throw new MapperError('해당 키는 존재하지 않습니다.', key);
  }
  return validator.schema;
}

export async function validate(key, data) {
  const validator = ajv.getSchema(key);
  if (typeof validator === 'undefined') {
    throw new MapperError('해당 키는 존재하지 않습니다.', key);
  }

  console.log(validator(data), 'validator(data)');
  return validator(data);
}
