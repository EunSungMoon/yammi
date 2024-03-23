export default function withRequiredString(
  schema = {},
  option = {
    errorMessage: '필수 입력값입니다.',
  },
) {
  let ret = {
    ...schema,
  };

  ret.minLength = 1;
  ret.errorMessage = ret.errorMessage || {};
  ret.errorMessage.minLength = option.errorMessage;

  schema.type = [schema.type, 'null'];
  return schema;
}
