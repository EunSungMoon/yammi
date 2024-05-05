export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return res.status(200).json({
        data: {
          id: 1,
          category1: {
            id: 3,
            name: '한식',
          },
          category2: {
            id: 2,
            name: '햄치피',
          },
          bookmark: false,
          bookmark_count: 2,
          menu: [
            {
              id: 1,
              name: '메뉴1',
              description: '도마다리 감자탕',
              price: 0,
              image: '/media/%E1%84%85%E1%85%A9%E1%84%80%E1%85%A91_1QMCXT4.png',
              restaurant: 1,
            },
            {
              id: 2,
              name: '간짜장',
              description: null,
              price: 9000,
              image: null,
              restaurant: 1,
            },
          ],
          average_star: 4.4,
          name: '도마다리감자탕',
          image:
            'http://127.0.0.1:8000/media/Blue_And_White_Cleaning_Services_Logo.png',
          address: '경기도 광주시 오포읍 능평로 193',
          counter: 70,
        },
      });

    default:
      throw new Error('no supported method');
  }
}
