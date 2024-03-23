export default function createListSchema(itemSchema) {
  return {
    type: 'object',
    required: ['total', 'count', 'limit', 'offset', 'items'],
    properties: {
      total: { type: 'number' },
      count: { type: 'number' },
      limit: { type: 'number' },
      offset: { type: 'number' },
      items: {
        type: 'array',
        items: itemSchema,
      },
    },
  };
}
