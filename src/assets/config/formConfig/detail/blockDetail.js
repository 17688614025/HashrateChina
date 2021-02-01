export default [
  {
    prop: 'cid',
    label: '区块ID',
    width: ''
  },
  {
    prop: 'height',
    label: '高度',
    width: '',
    linkUrl: '/tipset/'
  },
  {
    prop: 'miner',
    label: '矿工',
    width: '',
    tag: 'minerTag',
    linkUrl: '/address/'
  },
  {
    prop: 'timestamp',
    label: '时间',
    width: ''
  },
  {
    prop: 'size',
    label: '大小',
    width: ''
  },
  {
    prop: 'messageCount',
    label: '消息',
    width: ''
  },
  {
    prop: 'reward',
    label: '奖励',
    width: ''
  },
  {
    prop: 'winCount',
    label: '奖励份数',
    width: ''
  },
  {
    prop: 'parents',
    label: '父区块',
    type: 'Array',
    width: '',
    linkUrl: '/block/'
  },
  {
    prop: 'parentWeight',
    label: '父区块权重',
    width: ''
  },
  {
    prop: 'parentBaseFee',
    label: 'Parent Base Fee',
    width: ''
  }
]
