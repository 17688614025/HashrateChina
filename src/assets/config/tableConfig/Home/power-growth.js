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
    prop: 'growth',
    label: '算力增速',
    w: '360',
    progress: 'growthPercent',
    needTips: '选定周期内，平均每天完成封装扇区的有效算力总和'
  },
  {
    prop: 'equivalentMiners',
    label: '矿机当量',
    width: '100',
    needTips: '以官方Benchmark推荐配置（AMD Ryzen Threadripper 3970X、NVidia GTX 2080Ti、128GB 2133mhz）视为1台基准矿机，矿机当量为该矿工换算成标准矿机的数量（矿工的算力增速与该基准矿机增速的比值）。'
  },
  {
    prop: 'rawBytePowerGrowth',
    label: '算力增量',
    width: '110',
    needTips: '在选定周期内，矿工的有效算力增量'
  },
  {
    prop: 'qualityAdjPower',
    label: '有效算力',
    width: '110'
  },
  {
    prop: 'location',
    label: '地区',
    width: '133'
  }
]
