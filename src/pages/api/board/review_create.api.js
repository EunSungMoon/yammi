export default function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return res.status(200).json({
        data: {
          restaurant: 2,
          star: 3,
          comment: '완전최고',
        },
      });

    default:
      throw new Error('no supported method');
  }
}
