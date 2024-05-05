import { SchemaCreator, addSchema } from '@system/objectMapper';

export const RESPONSE_KEY = 'CATEGORIES';

const listSchema = {
  type: 'array',
  properties: {
    type: 'object',
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      image: { type: 'string' },
    },
  },
};

addSchema(RESPONSE_KEY, listSchema);
