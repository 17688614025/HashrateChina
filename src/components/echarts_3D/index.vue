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

      $.when(
        $.getScript('../../../static/d3-contour.js'),
        $.getScript('../../../static/d3_geo.js'),
        $.getScript('../../../static/d3_timer.js')
      ).done(res => {
        var loadImage = src => {
          var promise = new Promise((resolve, reject) => {
            const image = new Image()
            image.src = src
            image.onload = () => {
              resolve(image)
            }
            image.onerror = () => {
              reject(Error)
            }
          })
          return promise
        }
        image('../../../static/8.png').then(image => {
          // loadImage('../../../static/8.png').then(image => {
          console.log(image)
          debugger
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
          return new Promise((resolve) => {
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
          const canvas1 = document.createElement('canvas')
          const mapChart = echarts.init(canvas1, null, {
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

          var option = {
            title: {
              // text: '点击地球获取该区域地图',
              textStyle: {
                color: '#fff'
              }
            },
            tooltip: {
              show: true
            },
            globe: {
              // baseTexture: mapChart,
              environment: require('../../assets/imgs/starfield.png'),
              baseTexture: require('../../../static/8.png'),
              shading: 'lambert',
              light: {
                // 光照阴影
                main: {
                  color: 'blue', // 光照颜色
                  intensity: 14.2, // 光照强度
                  shadowQuality: 'ultra', // 阴影亮度
                  shadow: true, // 是否显示阴影
                  alpha: 40,
                  beta: -30
                },
                ambient: {
                  intensity: 4.6
                }
              },
              viewControl: {
                alpha: 30,
                beta: 160,
                // targetCoord: [116.46, 39.92],
                autoRotate: true,
                autoRotateAfterStill: 10,
                distance: 240,
                autoRotateSpeed: 4
              },
              postEffect: {
                // 为画面添加高光，景深，环境光遮蔽（SSAO），调色等效果
                enable: true, // 是否开启
                SSAO: {
                  // 环境光遮蔽
                  radius: 1, // 环境光遮蔽的采样半径。半径越大效果越自然
                  intensity: 1, // 环境光遮蔽的强度
                  enable: true
                }
              },

              layers: [
                {
                  type: 'blend',
                  blendTo: 'emission',
                  texture: contourChart,
                  intensity: config.intensity
                }
              ]
            },
            series: [
              {
                name: 'lines3D',
                type: 'lines3D',
                coordinateSystem: 'globe',
                effect: {
                  show: true,
                  period: 2,
                  trailWidth: 3,
                  trailLength: 0.5,
                  trailOpacity: 1,
                  trailColor: '#0087f4'
                },
                blendMode: 'lighter',
                lineStyle: {
                  width: 1,
                  color: '#0087f4',
                  opacity: 0.2
                },
                data: [],
                silent: false
              },
              {
                // 点
                name: '景区',
                // type: 'effectScatter',
                // coordinateSystem: 'bmap',
                type: 'scatter3D',
                blendMode: 'lighter',
                coordinateSystem: 'globe',
                showEffectOn: 'render',
                zlevel: 2,
                effectType: 'ripple',
                symbolSize: 15,
                rippleEffect: {
                  period: 4,
                  scale: 4,
                  brushType: 'fill'
                },

                // showEffectOn: 'hover',
                hoverAnimation: true,
                label: {
                  normal: {
                    show: true,
                    position: 'right',
                    // formatter: '{b}',
                    formatter: params => {
                      // console.log(params)
                      return params.data[2]
                    },
                    textStyle: {
                      fontSize: 18,
                      color: '#f5d909',
                      fontWeight: 'bold',
                      backgroundColor: 'transparent'
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: 'rgb(29,183,255)'
                  }
                },
                data: that.dealData(apiRes, loc)
              }
            ]
          }
          // 随机数据

          option.series[0].data = []
          that.dealData(apiRes, loc).map(item => {
            option.series[0].data.push({
              coords: [
                item,
                [118.58, 32.01]
              ],
              value: (Math.random() * 3000).toFixed(2)
            })
          })

          for (let i = 0; i < 10; i++) {
            option.series[0].data = option.series[0].data.concat(rodamData())
          }

          function rodamData() {
            // const name = '随机点' + Math.random().toFixed(5) * 100000
            // let longitude = Math.random() * 62 + 73
            const longitude = 118.58
            const longitude2 = Math.random() * 360 - 180
            // let latitude = Math.random() * 50 + 3.52
            const latitude = 32.01
            const latitude2 = Math.random() * 180 - 90
            return {
              coords: [
                [longitude2, latitude2],
                [longitude, latitude]
              ],
              value: (Math.random() * 3000).toFixed(2)
            }
          }
          myChart.setOption(option)
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
