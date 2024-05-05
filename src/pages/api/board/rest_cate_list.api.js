export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return res.status(200).json({
        data: {
          count: 2,
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
              counter: 42,
            },
            {
              id: 2,
              average_star: null,
              review_count: 0,
              category1: {
                id: 3,
                name: '한식',
              },
              category2: null,
              name: '김밥천국',
              image: 'http://127.0.0.1:8000/media/main.jpeg',
              address: '서울 강남구 광평로 280 지하2층 137호',
              counter: 0,
            },
          ],
        },
      });

    default:
      throw new Error('no supported method');
  }
}
