export default [
  {
    prop: 'height',
    label: '区块高度'
  },
  {
    prop: 'time',
    label: '最新区块时间'
  },
  {
    prop: 'total_quality_power',
    label: '全网有效算力',
    needTips: '当前全网有效算力（有效存储空间）的总和'
  },
  {
    prop: 'active_miners',
    label: '活跃矿工数',
    needTips: '当前有效算力值大于0的矿工数'
  },
  {
    prop: 'price',
    label: '最新价格',
    needTips: 'FIL最新价格，数据来源Coingecko'
  },
  {
    prop: 'payment_1T',
    label: '单T质押量'
  },
  {
    prop: 'preGas_1T',
    label: '单T Gas费'
  },
  {
    prop: 'total_fil',
    label: 'FIL总供给量'
  },
  {
    prop: 'total_1T',
    label: '每T扇区的总成本'
  },
  {
    prop: 'latest_block_reward',
    label: '最新赢票的奖励'
  },
  // {
  //   prop: 'block_reward',
  //   label: '每区块奖励',
  //   needTips: '当前高度下的区块奖励，每个高度有多个区块，每个区块均可获得该奖励'
  // },
  {
    prop: 'fil_per_tera',
    label: '24h平均挖矿收益',
    needTips: '近24h每个高度出块奖励与有效算力比值的均值'
  },
  // {
  //   prop: 'one_day_fil',
  //   label: '近24h产出量',
  //   needTips: '近24h累计挖矿产出的FIL数量'
  // },
  // {
  //   prop: 'pledge_collateral',
  //   label: 'FIL质押量',
  //   needTips: '当前矿工进行挖矿所质押的FIL总和'
  // },
  {
    prop: 'total_rewards',
    label: '全网出块奖励',
    needTips: '全网近24h累计挖矿产出的FIL数量'
  },
  {
    prop: 'total_blocks',
    label: '全网出块数量'
  },
  {
    prop: 'power_ratio',
    label: '存储速度',
    needTips: '近24小时全网存储速度'
  },

  // {
  //   prop: 'increase_power_per_day_str',
  //   label: '全网算力增速'
  // },
  // {
  //   prop: 'rate',
  //   label: '当前基础费率'
  // },
  {
    prop: 'messageCount',
    label: '24h消息数'
  }
  // {
  //   prop: 'total_accounts',
  //   label: '总账户数'
  // },
  // {
  //   prop: 'avg_block_time',
  //   label: '平均区块间隔',
  //   needTips: '近24h出块的平均时间间隔'
  // },
  // {
  //   prop: 'avg_blocks_in_tipset_str',
  //   label: '平均每高度区块数量',
  //   needTips: '近24h相同高度下的平均区块数量'
  // },
  // {
  //   prop: 'FIL_in_circulation',
  //   label: 'FIL流通量',
  //   needTips: '当前自由流通的FIL总和'
  // },
  // {
  //   prop: 'block_interval',
  //   label: '平均区块间隔',
  //   needTips: '近24h出块的平均时间间隔'
  // },
  // {
  //   prop: 'add_computing_cost',
  //   label: '新增算力成本',
  //   needTips: '新增算力所需要花费的成本，包括扇区质押和封装手续费'
  // },
  // {
  //   prop: 'FIL_destroyed_num',
  //   label: 'FIL销毁量'
  // },

  // {
  //   prop: 'flow_rate',
  //   label: 'FIL流通率',
  //   needTips: '流通率=流通量/总供给量'
  // }

]
