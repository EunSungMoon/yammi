export default function createLogsSchema(itemSchema) {
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
        items: {
          type: 'object',
          required: ['id', 'issuer', 'content', 'createdDateTime'],
          properties: {
            id: { type: 'string' },
            issuer: { type: 'string' },
            content: { type: 'string' },
            createdDateTime: { type: 'string' },
          },
        },
      },
    },
  };
}
