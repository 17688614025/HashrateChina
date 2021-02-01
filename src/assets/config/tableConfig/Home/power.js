export default [
  {
    prop: 'address',
    label: '矿工',
    width: '',
    linkUrl: '/address/'
  },
  {
    prop: 'tag',
    label: '标签',
    width: '120',
    tag: 'tag'
  },
  {
    prop: 'ratio',
    label: '有效算力/占比',
    w: '360',
    progress: 'percent'
  },
  {
    prop: 'totalRewards',
    label: '24h出块奖励',
    width: '100',
    linkType: 'totalRewards'
  },
  {
    prop: 'efficiency',
    label: '24h挖矿效率',
    width: '110',
    needTips: '近24h矿工平均每T算力所挖出的FIL数量'
  },
  {
    prop: 'rawBytePowerDelta',
    label: '24h算力增量',
    width: '110',
    needTips: '近24h矿工有效算力的增量'
  },
  {
    prop: 'location',
    label: '地区',
    width: '133'
  }
]
