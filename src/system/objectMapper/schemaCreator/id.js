export default function createIdSchema() {
  return {
    type: 'object',
    additionalProperties: false,
    required: ['id'],
    properties: {
      id: {
        type: 'string',
      },
    },
  };
}
