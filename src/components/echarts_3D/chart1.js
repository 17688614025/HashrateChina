import * as echarts from 'echarts'
import 'echarts-gl'
import option from './option1'
var chartDom = document.getElementById('earth')
var myChart = echarts.init(chartDom)

var config = {
  color: '#c0101a',
  levels: 1,
  intensity: 4,
  threshold: 0.01
}

var canvas = document.createElement('canvas')
canvas.width = 4096
canvas.height = 2048
var context = canvas.getContext('2d')

context.lineWidth = 0.5
context.strokeStyle = config.color
context.fillStyle = config.color
context.shadowColor = config.color
// 环境的切换
var ROOT_PATH = process.env.NODE_ENV === 'production' ? './static/' : '../../../static/'
$.when(
  $.getScript(`${ROOT_PATH}d3-contour.js`),
  $.getScript(`${ROOT_PATH}d3_geo.js`),
  $.getScript(`${ROOT_PATH}d3_timer.js`)
).done(res => {
  image(`${ROOT_PATH}8.png`).then(image => {
    var m = image.height
    var n = image.width
    var values = new Array(n * m)
    var contours = d3.contours().size([n, m]).smooth(true)
    var projection = d3.geoIdentity().scale(canvas.width / n)
    var path = d3.geoPath(projection, context)

    //   StackBlur.R(image, 5);

    for (var j = 0, k = 0; j < m; ++j) {
      for (var i = 0; i < n; ++i, ++k) {
        values[k] = image.data[(k << 2)] / 255
      }
    }

    var opt = {
      image: canvas
    }

    var results = []
    function update(threshold, levels) {
      context.clearRect(0, 0, canvas.width, canvas.height)
      var thresholds = []
      for (var i = 0; i < levels; i++) {
        thresholds.push((threshold + 1 / levels * i) % 1)
      }
      results = contours.thresholds(thresholds)(values)
      redraw()
    }

    function redraw() {
      results.forEach(function(d, idx) {
        context.beginPath()
        path(d)
        context.globalAlpha = 1
        context.stroke()
        if (idx > config.levels / 5 * 3) {
          context.globalAlpha = 0.01
          context.fill()
        }
      })
      opt.onupdate()
    }
    d3.timer(function(t) {
      var threshold = (t % 10000) / 10000
      update(threshold, 1)
    })

    initCharts(opt)

    update(config.threshold, config.levels)
  })

  function image(url) {
    return new Promise(function(resolve) {
      var image = new Image()
      image.src = url
      image.onload = function() {
        var canvas = document.createElement('canvas')
        canvas.width = image.width / 8
        canvas.height = image.height / 8
        var context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
        resolve(context.getImageData(0, 0, canvas.width, canvas.height))
      }
    })
  }

  function initCharts(opt) {
    var contourChart = echarts.init(document.createElement('canvas'), null, {
      width: 4096,
      height: 2048
    })

    var img = new echarts.graphic.Image({
      style: {
        image: opt.image,
        x: -1,
        y: -1,
        width: opt.image.width + 2,
        height: opt.image.height + 2
      }
    })
    contourChart.getZr().add(img)

    opt.onupdate = function() {
      img.dirty()
    }

    myChart && myChart.setOption(option)
  }
})
