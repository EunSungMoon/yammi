export default function getReviewDto() {
  return {
    type: 'object',
    properties: {
      comment: {
        type: 'string',
        minLength: 1,
        errorMessage: {
          type: '리뷰를 작성해주세요.',
          minLength: '리뷰를 작성해주세요.',
        },
      },
    },
  };
}
