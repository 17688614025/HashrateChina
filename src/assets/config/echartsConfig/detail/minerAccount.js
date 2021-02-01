export default {
  tooltip: {
    trigger: 'item',
    formatter: function(params) {
      return `${params.marker} ${params.name}: ${(params.value / Math.pow(10, 18)).toFixed(4)} FIL (${params.percent}%)</br>`
    },
    position: [20, 20]
  },
  legend: { show: false },
  series: [
    {
      name: '',
      type: 'pie',
      radius: ['30%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '16',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ]
    }
  ]
}
