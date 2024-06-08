export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return res.status(200).json({
        data: {
          count: 1,
          next: null,
          previous: null,
          count: 2,
          next: null,
          previous: null,
          results: [
            {
              id: 1,
              category1: {
                id: 3,
                name: '중식',
              },

              category2: null,
              name: '서래향',
              image: 'https://picsum.photos/200',
              address: '서울 강남구 광평로51길 6-9 새롬빌딩',
              counter: 9999,
            },

            {
              id: 2,
              category1: {
                id: 5,
                name: '고기',
              },
              category2: {
                id: 1,
                name: '수서역',
              },
              name: '판교집 수서점',
              image: 'https://picsum.photos/200',
              address: '서울 강남구 광평로 280 지하2층 137호',
              counter: 11238,
            },
          ],
        },
      });

    default:
      throw new Error('no supported method');
  }
}
