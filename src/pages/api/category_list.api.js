export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return res.status(200).json({
        data: [
          {
            id: 1,
            name: '한식',
            image: 'http://15.165.20.225:8000/media/default_catgory.png',
          },
          {
            id: 2,
            name: '일식',
            image:
              'http://15.165.20.225:8000/media/default_catgory_MshwnG7.png',
          },
          {
            id: 3,
            name: '중식',
            image:
              'http://15.165.20.225:8000/media/default_catgory_Zibj6d5.png',
          },
          {
            id: 4,
            name: '양식',
            image:
              'http://15.165.20.225:8000/media/default_catgory_Atka4pQ.png',
          },
          {
            id: 5,
            name: '고기',
            image:
              'http://15.165.20.225:8000/media/default_catgory_hhvRamF.png',
          },
          {
            id: 6,
            name: '술집',
            image:
              'http://15.165.20.225:8000/media/default_catgory_7RdiwJu.png',
          },
          {
            id: 7,
            name: '카페',
            image:
              'http://15.165.20.225:8000/media/default_catgory_DUbUHWg.png',
          },
          {
            id: 8,
            name: '분식',
            image:
              'http://15.165.20.225:8000/media/default_catgory_X91z4Lp.png',
          },
          {
            id: 9,
            name: '햄/피/치',
            image:
              'http://15.165.20.225:8000/media/default_catgory_LOqTmPb.png',
          },
          {
            id: 10,
            name: '빵',
            image:
              'http://15.165.20.225:8000/media/default_catgory_ivErm6c.png',
          },
          {
            id: 11,
            name: '기타',
            image:
              'http://15.165.20.225:8000/media/default_catgory_ivErm6c.png',
          },
          {
            id: 12,
            name: '전체',
            image:
              'http://15.165.20.225:8000/media/default_catgory_q3AZPa3.png',
          },
        ],
      });

    default:
      throw new Error('no supported method');
  }
}
