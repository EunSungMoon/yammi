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
          bookmark: true,
          bookmark_count: 2,
          menu: [
            {
              id: 1,
              name: '짜장',
              description: '도마다리 감자탕',
              price: 12000,
              image: 'https://picsum.photos/200',
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
            {
              id: 3,
              name: '탕수육',
              description: '도마다리 감자탕',
              price: 3243423,
              image: 'https://picsum.photos/200',
              restaurant: 1,
            },
            {
              id: 4,
              name: '짬뽕',
              description: null,
              price: 234234,
              image: null,
              restaurant: 1,
            },
          ],
          average_star: 2,
          name: '도마다리감자탕',
          image: 'https://picsum.photos/200',
          address: '경기도 광주시 오포읍 능평로 193',
          counter: 70,
        },
      });

    default:
      throw new Error('no supported method');
  }
}
