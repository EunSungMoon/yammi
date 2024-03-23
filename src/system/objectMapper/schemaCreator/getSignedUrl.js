export default function createGetSignedUrlScheme() {
  return {
    type: 'object',
    required: ['key', 'location', 'urls'],
    properties: {
      key: {
        type: 'string',
      },
      location: {
        type: 'string',
      },
      urls: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
  };
}
