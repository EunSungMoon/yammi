export default function createVerifyMobile() {
  return {
    type: 'object',
    additionalProperties: false,
    required: ['verifyCode'],
    properties: {
      verifyCode: {
        type: 'string',
      },
    },
  };
}
