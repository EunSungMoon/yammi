export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return res.status(200).json({
        data: {
          id: 2,
          average_star: 4.5,
          review_count: 10,
          category1: {
            id: 3,
            name: '한식',
          },
          category2: '국밥',
          name: '김밥천국',
          image: 'https://picsum.photos/200',
          address: '서울 강남구 광평로 280 지하2층 137호',
          counter: 0,
        },
      });

    default:
      throw new Error('no supported method');
  }
}
