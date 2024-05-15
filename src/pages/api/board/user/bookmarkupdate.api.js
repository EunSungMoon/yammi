export default function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return res.status(201).json({
        data: '수정성공',
      });

    default:
      throw new Error('no supported method');
  }
}
