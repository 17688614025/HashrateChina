export default [
  {
    prop: 'miner_addr',
    label: '矿工',
    width: '',
    linkUrl: '/address/'
  },
  {
    prop: 'nick_name',
    label: '标签',
    width: '120'
  },
  {
    prop: 'blocks_mined',
    label: '出块份数',
    width: '231',
    progress: 'percent',
    needTips: 'Filecoin挖矿模型中，一个高度（tipset）下可能有多个区块（block），每个区块可能获得多份奖励（win count）。累计出块份数=每次出块获得奖励份数的总和'
  },
  {
    prop: 'lucky_value',
    label: '幸运值',
    width: '100',
    linkType: 'luckyValue',
    needTips: '实际爆块数量和理论爆块数量的比值。若矿工有效算力低于1PiB，则该值存在较大随机性，仅供参考。'
  },
  {
    prop: 'block_reward',
    label: '区块奖励',
    width: '110'
  },
  {
    prop: 'area',
    label: '地区',
    width: '133'
  }
]
