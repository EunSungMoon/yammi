export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return res.status(200).json({
        data: {
          email: 'dddd@google.com',
          nickname: 'shinhyenri firefist',
          last_update: '2024-04-02T23:43:01+09:00',
        },
      });

    default:
      throw new Error('no supported method');
  }
}
