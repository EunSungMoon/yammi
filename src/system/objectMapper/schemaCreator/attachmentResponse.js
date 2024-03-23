export default function attachmentResponseScheme() {
  return {
    type: 'object',
    required: ['location', 'filename', 'size'],
    properties: {
      location: {
        type: 'string',
      },
      filename: {
        type: 'string',
      },
      size: {
        type: 'number',
      },
    },
  };
}
