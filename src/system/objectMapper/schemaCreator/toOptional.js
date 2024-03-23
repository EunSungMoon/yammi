export default function toOptional(schema) {
  schema.type = [schema.type, 'null'];
  return schema;
}
