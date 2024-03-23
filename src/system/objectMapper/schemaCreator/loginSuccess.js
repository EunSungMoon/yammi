export default function createloginSuccess() {
  return {
    type: 'object',
    additionalProperties: false,
    required: [
      'accessToken',
      'refreshToken',
      'idToken',
      'expiresIn',
      'tokenType',
    ],
    properties: {
      accessToken: {
        type: 'string',
      },
      refreshToken: {
        type: 'string',
      },
      idToken: {
        type: 'string',
      },
      expiresIn: {
        type: 'number',
      },
      tokenType: {
        type: 'string',
      },
    },
  };
}
