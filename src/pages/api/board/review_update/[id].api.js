export default function handler(req, res) {
  switch (req.method) {
    case 'PATCH':
      return res.status(200).json({
        data: {
          star: 4,
          comment: '완전최고에서 수정합니다.',
        },
      });

    default:
      throw new Error('no supported method');
  }
}
