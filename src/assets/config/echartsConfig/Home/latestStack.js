import { position } from '@/utils/auth'
export default {
  tooltip: {
    formatter: function(params) {
      // console.log(params)
      const obj = JSON.parse(params.seriesName)
      return `
            ${params.marker} 矿工ID: ${obj.miner}<br/>
            ${params.marker} 高度: ${params.name}<br/>
            ${params.marker} 出块时间: ${obj.timestamp}<br/>
            ${params.marker} 区块Cid: ${obj.cid}<br/>
            ${params.marker} 赢票数量: ${obj.winCount}<br/>
            `
    },
    // trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    },
    position
  },
  legend: {
    data: []
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '5%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLabel: {
        textStyle: {
          color: '#ccc'
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        textStyle: {
          color: '#ccc'
        }
      },
      splitLine: {
        show: false
      }
    }
  ],
  series: [
    {
      name: '',
      type: 'bar',
      stack: '广告',
      emphasis: {
        focus: 'series'
      },
      data: [1, 1, 1, 1, 1, 1, 1]
    },
    {
      name: '',
      type: 'bar',
      stack: '广告',
      emphasis: {
        focus: 'series'
      },
      data: [1, 0, 0, 0, 0, 0, 0]
    },
    {
      name: '联盟广告',
      type: 'bar',
      stack: '广告',
      emphasis: {
        focus: 'series'
      },
      data: [1, 1, 1, 1, 1, 1, 1]
    },
    {
      name: '视频广告',
      type: 'bar',
      stack: '广告',
      emphasis: {
        focus: 'series'
      },
      data: [1, 1, 1, 1, 1, 1, 1]
    }
  ]
}
