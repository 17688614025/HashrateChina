export default [
  {
    prop: 'height',
    label: '高度',
    width: '100',
    linkUrl: '/tipset/',
    linkType: 'time',
    type: 'Array'
  },
  {
    prop: 'blocks',
    label: '区块ID',
    width: '105',
    linkUrl: '/block/',
    linkType: 'cid',
    type: 'Array'
  },
  {
    prop: 'blocks',
    label: '矿工',
    width: '',
    linkUrl: '/address/',
    linkType: 'miner',
    type: 'Array'
  },
  {
    prop: 'blocks',
    label: '标签',
    width: '180',
    linkType: 'minerTag',
    type: 'Array'
  },
  {
    prop: 'blocks',
    label: '消息',
    width: '',
    linkType: 'messageCount',
    type: 'Array'
  },
  {
    prop: 'blocks',
    label: '奖励',
    width: '',
    linkType: 'reward',
    type: 'Array'
  }
]
