export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return res.status(200).json({
        data: {
          count: 1,
          next: null,
          previous: null,
          results: [
            {
              id: 1,
              average_star: 4.25,
              review_count: 4,
              category1: {
                id: 3,
                name: '한식',
              },
              category2: {
                id: 2,
                name: '햄치피',
              },
              name: '도마다리감자탕',
              image:
                'http://127.0.0.1:8000/media/Blue_And_White_Cleaning_Services_Logo.png',
              address: '경기도 광주시 오포읍 능평로 193',
              counter: 44,
            },
          ],
        },
      });

    default:
      throw new Error('no supported method');
  }
}
