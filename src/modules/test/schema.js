import { SchemaCreator, addSchema } from '@system/objectMapper';

export const RESPONSE_KEY = 'ITEMS';

const listSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    content: { type: 'string' },
  },
};

addSchema(RESPONSE_KEY, listSchema);
