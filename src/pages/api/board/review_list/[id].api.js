export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return res.status(200).json({
        data: [
          {
            id: 1,
            user: {
              id: 2,
              nickname: '말괄량이 용우',
            },
            comment: '정말 맛있어요',
            star: 4,
            created_date: '2024-05-02T23:43:01+09:00',
            updated_date: '2024-05-02T23:43:07.623357+09:00',
            restaurant: 1,
          },
          {
            id: 2,
            user: {
              id: 2,
              nickname: '말괄량이 용우',
            },
            comment: '맛집최고',
            star: 5,
            created_date: '2024-05-03T00:10:50.927148+09:00',
            updated_date: '2024-05-03T00:10:50.927763+09:00',
            restaurant: 1,
          },
          {
            id: 3,
            user: {
              id: 2,
              nickname: '말괄량이 용우',
            },
            comment: '맛없어요',
            star: 4,
            created_date: '2024-05-03T00:12:48.252583+09:00',
            updated_date: '2024-05-03T00:12:48.253091+09:00',
            restaurant: 1,
          },
          {
            id: 4,
            user: {
              id: 2,
              nickname: '말괄량이 용우',
            },
            comment: '맛없어요',
            star: 4,
            created_date: '2024-05-03T00:13:33.289205+09:00',
            updated_date: '2024-05-03T00:13:33.289832+09:00',
            restaurant: 1,
          },
          {
            id: 5,
            user: {
              id: 1,
              nickname: '검무산',
            },
            comment: '수정',
            star: 3,
            created_date: '2024-05-04T20:45:44.730542+09:00',
            updated_date: '2024-05-04T21:26:51.702476+09:00',
            restaurant: 1,
          },
        ],
      });

    default:
      throw new Error('no supported method');
  }
}
