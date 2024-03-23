export default function createFileUploadScheme() {
  return {
    type: 'object',
    required: ['key', 'location', 'filename', 'size', 'width', 'height'],
    properties: {
      key: {
        type: 'string',
      },
      location: {
        type: 'string',
      },
      filename: {
        type: 'string',
      },
      size: {
        type: 'number',
      },
      width: {
        type: 'number',
      },
      height: {
        type: 'number',
      },
    },
  };
}
