export default function createSuccessSchema() {
  return {
    type: 'object',
    additionalProperties: false,
    required: ['success'],
    properties: {
      success: {
        type: 'boolean',
      },
    },
  };
}
