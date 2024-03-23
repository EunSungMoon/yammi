// 만약 문자열을 가지고도 판별하고자 한다면, validator 에 isDate 를 쓰시오.

export default function isDateObject(val) {
  return typeof val === 'object' && val instanceof Date;
}
