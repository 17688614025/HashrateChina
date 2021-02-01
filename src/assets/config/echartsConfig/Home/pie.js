export default {
  title: {
    // text: '某站点用户访问来源',
    // subtext: '纯属虚构',
    // left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: function(params) {
      return `${params.marker} ${params.name}: ${params.value}TiB (${params.percent}%)</br>`
    }
  },
  legend: {
    // orient: 'vertical',
    bottom: 10,
    left: 'center',
    // left: 'left',
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    // data: []
  },
  series: [
    {
      type: 'pie',
      radius: '60%',
      center: ['50%', '50%'],
      selectedMode: 'single',
      data: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ],
      itemStyle: {
        normal: {
          // 好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
          color: function(params) {
            var colorList = [
              '##19D4AE', '###196DD4', '##FFB980', '###0067A6', '#27727B',
              '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
              '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
            ]
            return colorList[params.dataIndex]
          }
        }
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
