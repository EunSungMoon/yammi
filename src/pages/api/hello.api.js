import mSleep from '@system/mSleep';

export default async function handler(req, res) {
  await mSleep(1000);
  switch (req.method) {
    case 'GET':
      return res.status(200).json({
        data: {
          title: 'title',
          content: 'content',
        },
      });
    default:
      throw new Error('no supported method');
  }
}
