export default function handler(req, res) {
  switch (req.method) {
    case 'DELETE':
      return res.status(200).json({
        data: {},
      });

    default:
      throw new Error('no supported method');
  }
}
