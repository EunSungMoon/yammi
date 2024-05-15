export default function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return res.status(201).json({
        data: '닉네임 수정 성공했습니다.',
      });

    default:
      throw new Error('no supported method');
  }
}
