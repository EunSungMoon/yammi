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
              id: 2,
              restaurant: {
                id: 1,
                category1: {
                  id: 3,
                  name: '중식',
                },
                category2: null,
                name: '서래향',
                image: 'https://picsum.photos/200',
                address: '서울 강남구 광평로51길 6-9 새롬빌딩',
                counter: 0,
              },
              comment: '너무 맛있어요',
              star: 3,
              created_date: '2024-05-06T16:40:38+09:00',
              updated_date: '2024-05-06T16:40:42.252408+09:00',
              user: 1,
            },
            {
              id: 2,
              restaurant: {
                id: 1,
                category1: {
                  id: 3,
                  name: '양식',
                },
                category2: {
                  id: 3,
                  name: '양식',
                },
                name: '서래향',
                image: 'https://picsum.photos/200',
                address: '서울 강남구 광평로51길 6-9 새롬빌딩',
                counter: 0,
              },
              comment:
                '정말 너무 맛있어서 눈물나는 맛이에요. 웨이팅이 살벌하지만 기다린 보람이 있었습니다. 다들 웨이팅 화이팅이에요! 저도 다음에 또 가고 싶어요ㅠㅠㅠㅠㅠ',
              star: 3,
              created_date: '2024-05-06T16:40:38+09:00',
              updated_date: '2024-05-06T16:40:42.252408+09:00',
              user: 1,
            },
            {
              id: 2,
              restaurant: {
                id: 1,
                category1: {
                  id: 3,
                  name: '한식',
                },
                category2: null,
                name: '서래향',
                image: 'https://picsum.photos/200',
                address: '서울 강남구 광평로51길 6-9 새롬빌딩',
                counter: 0,
              },
              comment: '집은 멀지만 또 가고 싶은 맛이요',
              star: 3,
              created_date: '2024-05-06T16:40:38+09:00',
              updated_date: '2024-05-06T16:40:42.252408+09:00',
              user: 1,
            },
          ],
        },
      });

    default:
      throw new Error('no supported method');
  }
}
