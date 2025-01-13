const users = [
  { id: 0, name: 'Umi', nickName: 'U', gender: 'MALE' },
  { id: 1, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
];

export default {
  'GET /api/v1/queryUserList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: users },
      errorCode: 0,
    });
  },
  'PUT /api/v1/user/': (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
    });
  },
  // 'GET /api/v1/queryNewsMap': (req: any, res: any) => {
  //   res.json({
  //     success: true,
  //     errorCode: 0,
  //     data: [
  //       { value: 'news', label: '要闻' },
  //       { value: 'finance', label: '金融' }
  //     ]
  //   });
  // },
  'GET /api/v1/queryTodayNews': (req: any, res: any) => {
    res.json({
      success: true,
      data: {
        list: [
          { type: 'news', title: '中央财办伟文秀：加长完兽“想消费“收消费“鹿消费”的玫策环境,中央财办伟文秀：加长完兽“想消费“收消费“鹿消费”的玫策环境,中央财办伟文秀：加长完兽“想消费“收消费“鹿消费”的玫策环境,中央财办伟文秀：加长完兽“想消费“收消费“鹿消费”的玫策环境,中央财办伟文秀：加长完兽“想消费“收消费“鹿消费”的玫策环境', extra: '213245', id: 1 },
          { type: 'finance', title: '月投价出炉：s年期和；年期射郵站維將不愛', id: 2 }
        ]
      },
      errorCode: 0,
    });
  },
};
