import { toThousands, position } from '@/utils/auth'

export default {
  title: {},
  tooltip: {
    trigger: 'axis',
    formatter: function(params) {
      var result = params[0].name + '<br/>'
      params.forEach(function(item) {
        result += item.marker + ' ' + item.seriesName + ' : ' + toThousands(item.value, 4) + ' TiB' + '</br>'
      })
      return result
    },
    axisPointer: {
      type: 'cross',
      label: {
        color: '#19D3AF'
      }
    },
    position
  },
  legend: {
    textStyle: {
      color: '#19D3AF'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '5%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisLabel: {
      formatter: function(value) {
        return value.split(' ')[1]
      },
      textStyle: {
        color: '#ccc'
      }
    },
    data: ['11:18', '12:48', '14:18', '15:48', '17:18', '18:48', '20:18', '21:48', '23:18', '00:48', '02:18', '03:48', '05:18', '06:48', '08:18', '09:48']
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        width: 0
      }
    },
    axisLabel: {
      formatter: function(value) {
        return toThousands(value) + ' TiB'
      },
      textStyle: {
        color: '#ccc'
      }
    }
  },
  series: [
    {
      name: '有效算力',
      type: 'line',
      smooth: true,
      data: []
      // data: [820, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 1290, 1330, 1320]
    },
    {
      name: '有效算力增量',
      type: 'bar',
      smooth: true,
      data: []
      // data: [820, 932, 901, 934, 934, 1290, 1330, 1290, 1330, 1320, 932, 901, 1320, 1290, 1330, 1320]
    }
  ]
}
