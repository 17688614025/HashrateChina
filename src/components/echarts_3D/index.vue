<template>
  <section>
    <div id="earth"
         style="width: 100%; height: 462rem; box-sizing: border-box;" />
  </section>
</template>

<script>
import echarts from 'echarts'
import 'echarts-gl'
import { getEarthView, getMap } from '@/utils/api'
import earth from './earth1'
import { option } from './option'
export default {
  /* eslint-disable no-undef */
  data: () => ({
    resizefun: null
  }),
  computed: {},
  // 移除事件监听，避免内存泄漏
  beforeDestroy() {
    window.removeEventListener('resize', this.resizefun)
    this.resizefun = null
  },
  mounted() {
    // this.getEarthData(this.initData)
    this.initData()
  },
  methods: {
    dealData(res, loc) {
      loc = loc
        ? {
          peer: 'peer',
          loc: 'loc',
          lon: 'lon',
          lat: 'lat'
        }
        : {
          peer: 'peer_id',
          loc: 'location_cn',
          lon: 'longitude',
          lat: 'latitude'
        }
      const data = [
        [117.11, 34.15, '徐州'],
        [123.38, 41.8, '沈阳'],
        [112.01, 38.01, '太原'],
        [139.46, 35.42, '日本'],
        [116.58, 6.1, '雅加达'],
        [102.9, 25.31, '昆明'],
        [118.58, 32.01, '南京']
      ]
      if (res) {
        res = res.slice(0, 7)
        res.map(item => {
          data.push([item[loc.lat], item[loc.lon], item[loc.loc]])
        })
      }
      return data
    },
    // 绘制图表
    initData(apiRes, loc) {
      console.log(apiRes, loc)
      var config = {
        color: '#750be8',
        levels: 1,
        intensity: 4,
        threshold: 0.01
      }

      var canvas = document.createElement('canvas')
      canvas.width = 2048
      canvas.height = 1024
      var context = canvas.getContext('2d')

      context.lineWidth = 0.5
      context.strokeStyle = config.color
      context.fillStyle = config.color
      context.shadowColor = config.color
      const that = this

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
          var contours = d3
            .contours()
            .size([n, m])
            .smooth(true)
          var projection = d3.geoIdentity().scale(canvas.width / n)
          var path = d3.geoPath(projection, context)

          //   StackBlur.R(image, 5);

          for (var j = 0, k = 0; j < m; ++j) {
            for (var i = 0; i < n; ++i, ++k) {
              values[k] = image.data[k << 2] / 255
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
              thresholds.push((threshold + (1 / levels) * i) % 1)
            }
            results = contours.thresholds(thresholds)(values)
            redraw()
          }

          function redraw() {
            results.forEach((d, idx) => {
              context.beginPath()
              path(d)
              context.globalAlpha = 1
              context.stroke()
              if (idx > (config.levels / 5) * 3) {
                context.globalAlpha = 0.01
                context.fill()
              }
            })
            opt.onupdate()
          }
          d3.timer((t) => {
            var threshold = (t % 10000) / 10000
            update(threshold, 1)
          })

          initCharts(opt)

          update(config.threshold, config.levels)
        })
        function image(url) {
          return new Promise(resolve => {
            var image = new Image()
            image.src = url
            image.onload = () => {
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
          var myChart = echarts.init(document.getElementById('earth'))
          const mapChart = echarts.init(document.createElement('canvas'), null, {
            width: 2048,
            height: 1024
          })
          // 实现自适应部分
          that.resizefun = () => {
            echarts.init(document.getElementById('earth')).resize()
          }
          window.addEventListener('resize', that.resizefun)

          var contourChart = echarts.init(
            document.createElement('canvas'),
            null,
            {
              width: 2048,
              height: 1024
            }
          )

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

          opt.onupdate = () => {
            img.dirty()
          }

          mapChart.setOption(earth)
          myChart.setOption(option(mapChart, contourChart, config, that, apiRes, loc))
        }
      })
    },
    // 获取地球数据
    getEarthData(cb) {
      getEarthView({})
        .then(({ data }) => {
          if (data) {
            cb(data.peers, 'loc')
          } else {
            this.initData()
          }
        })
        .catch(err => {
          console.log(err)
          getMap({})
            .then(({ data }) => {
              if (data) {
                cb(data)
              } else {
                this.initData()
              }
            })
            .catch(error => {
              // console.log(error)
              this.initData(error)
            })
        })
    }
  }
}
</script>
