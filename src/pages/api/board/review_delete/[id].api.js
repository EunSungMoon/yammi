export default function handler(req, res) {
  switch (req.method) {
    case 'DELTET':
      return res.status(204).json({
        data: {},
      });

    default:
      throw new Error('no supported method');
  }
}
