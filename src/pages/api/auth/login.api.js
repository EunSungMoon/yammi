export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return res.status(200).json({
        data: {
          accessToken: '3f3afecb5e99017fbef359292b19dc2a3303511e',
          refreshToken: 'e',
          idToken: 'e',
          expiresIn: 60 * 60 * 24,
          tokenType: 'Bearer',
        },
      });
    default:
      throw new Error('no supported method');
  }
}
