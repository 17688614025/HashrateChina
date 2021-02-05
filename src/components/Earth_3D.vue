<template>
  <!-- 例子6 -->
  <div>
    <div
      id="container"
      style="width: 100%; height: 462rem; box-sizing: border-box;"
    />
    <ul ref="tootips" :class="`tootips ${isShow ? 'show' : 'hide'}`">
      <li v-for="(item, i) in tootips" :key="i">
        <label>{{ item.label }}:</label>
        <router-link
          v-if="['矿工', '节点ID'].includes(item.label)"
          :to="`/address/${item.val}`"
        >{{ item.val }}</router-link
        >
        <span v-else>{{ item.val }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import echarts from 'echarts'
// import 'echarts/map/js/world.js'
import 'echarts-gl'
import { getEarthView, getMap } from '@/utils/api'
import { subStrCenter } from '@/utils/auth'
export default {
  data: () => ({
    isShow: false,
    tootips: []
  }),
  watch: {},
  mounted() {
    this.getEarthData(this.initData)
  },
  methods: {
    // 3D地球
    drawEarth(myChart, series) {
      var option = {
        // backgroundColor: '#031321',
        globe: {
          baseTexture: myChart,
          top: 'middle',
          left: 'center',
          shading: 'realistic',
          displacementScale: 0.04,
          environment: require('../assets/imgs/earth_bg.png'),
          // shading: 'color',
          realisticMaterial: {
            // roughness: 0.9
            roughness: 1
          },
          postEffect: {
            enable: true
          },
          viewControl: {
            distance: 240,
            autoRotate: true
          },
          light: {
            main: {
              intensity: 5,
              shadow: true
            },
            ambientCubemap: {
              // texture: hdr,
              exposure: 1,
              diffuseIntensity: 0.5,
              specularIntensity: 2
            }
          }
        },
        series: series
      }
      // 画图
      const myChartView = echarts.init(document.getElementById('container'))
      myChartView.setOption(option, true)
      window.addEventListener('resize', function() {
        myChartView.resize()
      })
      var that = this
      var tootips = that.$refs.tootips
      if (!that.isShow) {
        document.onmouseover = function(event) {
          var ev = ev || event
          if (tootips) {
            tootips.style.top = event.offsetY + 'rem'
            tootips.style.left = event.offsetX + 'rem'
          }
          // console.log(event, tootips.style.top, tootips.style.left)
          myChart.on('mouseover', function(params) {
            if (params.value) {
              that.tootips = [
                { label: '节点ID', val: params.value[2] },
                { label: '矿工', val: params.value[3] },
                { label: '位置', val: params.name },
                { label: 'IP', val: params.value[4] }
              ]
            }
            that.isShow = !!params.value
          })
        }
      }
      myChart.on('click', function(params) {
        if (params.value) {
          that.$router.push({
            path: `/address/${params.value[3]}`
          })
        }
      })
    },
    drawEarthBg(dser, series) {
      // 使用世界地图生成地球皮肤
      var canvas = document.createElement('canvas')
      var myChart = echarts.init(canvas, null, {
        width: 4096,
        height: 2048
      })

      myChart.setOption({
        backgroundColor: 'rgba(3,28,72,0.3)',
        // backgroundColor: 'transparent',
        title: {
          show: true
        },
        geo: {
          type: 'map',
          map: 'world',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          boundingCoords: [
            [-180, 90],
            [180, -90]
          ],
          zoom: 0,
          roam: false,
          itemStyle: {
            borderColor: '#000d2d',
            normal: {
              // areaColor: 'rgba(36,85,173, 0.5)',
              areaColor: '#2455ad',
              borderColor: '#000c2d'
            },
            emphasis: {
              // areaColor: 'rgba(53,124,248,0.5)'
              areaColor: '#357cf8'
            }
          },
          label: {
            fontSize: 24
          }
        },
        series: dser
      })
      this.drawEarth(myChart, series)
    },
    // 绘制图表
    initData(res, loc) {
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
      /*
    图中相关城市经纬度,根据你的需求添加数据
    关于国家的经纬度，可以用首都的经纬度或者其他城市的经纬度
    */
      var geoCoordMap = {}
      var CQData = []
      var GZData = []
      var NNData = []
      var NSData = []
      // var NCData = []
      // var NDData = []
      var Data_Map = []
      // console.log(res)
      if (res) {
        var num = res.length
        for (let i = 0; i < num; i++) {
          geoCoordMap[res[i][loc.loc]] = [
            res[i][loc.lon],
            res[i][loc.lat],
            subStrCenter(res[i][loc.peer]),
            res[i].miner,
            res[i].ip
          ]
        }

        const randomArr = []
        for (let i = 0; i < 6; i++) {
          randomArr.push(parseInt(Math.random() * num))
        }

        const createData = function(datas, n) {
          for (let i = 0; i < n; i++) {
            datas.map(item => {
              item.name.push([
                { name: res[item.random][loc.loc] },
                {
                  name: res[parseInt(Math.random() * num)][loc.loc],
                  value: Math.random() * 50 + 30
                }
              ])
            })
          }
        }
        createData([
          { name: CQData, random: randomArr[1] },
          { name: GZData, random: randomArr[2] }
        ], 2)
        createData([
          { name: NNData, random: randomArr[3] },
          { name: NSData, random: randomArr[4] }
        ], 5)
        // createData([
        //   { name: NCData, random: randomArr[5] },
        //   { name: NDData, random: randomArr[6] }
        // ], 8)
        Data_Map = [
          [res[randomArr[1]][loc.loc], CQData],
          [res[randomArr[2]][loc.loc], GZData],
          [res[randomArr[3]][loc.loc], NNData],
          [res[randomArr[4]][loc.loc], NSData]
          // [res[randomArr[5]][loc.loc], NCData],
          // [res[randomArr[6]][loc.loc], NDData]
        ]
      } else {
        geoCoordMap = {
          南宁: [108.479, 23.1152, '0', 'f067314', '101.71.134.194'],
          广州: [113.5107, 23.2196, '0', 'f067314', '101.71.134.194'],
          深圳: [113.8, 22.6, '0', 'f067314', '101.71.134.194'],
          重庆: [107.7539, 30.1904, '0', 'f067314', '101.71.134.194'],
          芬兰: [24.909912, 60.169095, '0', 'f067314', '101.71.134.194'],
          美国: [-100.696295, 33.679979, '0', 'f067314', '101.71.134.194'],
          日本: [139.710164, 35.706962, '0', 'f067314', '101.71.134.194'],
          韩国: [126.979208, 37.53875, '0', 'f067314', '101.71.134.194'],
          瑞士: [7.445147, 46.956241, '0', 'f067314', '101.71.134.194'],
          东南亚: [117.53244, 5.300343, '0', 'f067314', '101.71.134.194'],
          澳大利亚: [135.193845, -25.304039, '0', 'f067314', '101.71.134.194'],
          德国: [13.402393, 52.518569, '0', 'f067314', '101.71.134.194'],
          英国: [-0.126608, 51.208425, '0', 'f067314', '101.71.134.194'],
          南非: [28.11, 25.43, '0', 'f067314', '101.71.134.194'],
          印度: [77.13, 28.4, '0', 'f067314', '101.71.134.194'],
          俄罗斯: [37.35, 55.45, '0', 'f067314', '101.71.134.194'],
          上海: [120, 31, '0', 'f067314', '101.71.134.194'],
          黑龙江: [126.63, 45.75, '0', 'f067314', '101.71.134.194'],
          北京: [115, 40, '0', 'f067314', '101.71.134.194']
        }
        /*
        记录下起点城市和终点城市的名称，以及权重
        数组第一位为终点城市，数组第二位为起点城市，以及该城市的权重，就是图上圆圈的大小
     */
        CQData = [[{ name: '重庆' }, { name: '英国', value: 70 }]]

        GZData = [
          [
            { name: '深圳' },
            {
              name: '日本',
              value: 30,
              label: '* 地区：日本\n* ip：139.710164, 35.706962'
            }
          ],
          [{ name: '深圳' }, { name: '黑龙江', value: 45 }],
          [{ name: '深圳' }, { name: '俄罗斯', value: 65 }],
          [{ name: '深圳' }, { name: '德国', value: 25 }],
          [{ name: '深圳' }, { name: '上海', value: 35 }]
        ]

        NNData = [
          [{ name: '南宁' }, { name: '加拿大', value: 80 }],
          [{ name: '南宁' }, { name: '美国', value: 100 }],
          [{ name: '南宁' }, { name: '澳大利亚', value: 95 }],
          [{ name: '南宁' }, { name: '瑞士', value: 50 }],
          [{ name: '南宁' }, { name: '印度', value: 70 }],
          [{ name: '南宁' }, { name: '广州', value: 40 }],
          [{ name: '南宁' }, { name: '南非', value: 60 }]
        ]
        Data_Map = [
          ['重庆', CQData],
          ['深圳', GZData],
          ['南宁', NNData]
        ]
      }

      var convertData = function(data) {
        // console.log(data)
        var res = []
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i]
          var fromCoord = geoCoordMap[dataItem[1].name]
          var toCoord = geoCoordMap[dataItem[0].name]
          if (fromCoord && toCoord) {
            res.push([fromCoord, toCoord])
          }
        }
        // console.log(res)
        return res
      }

      var series = [] // 3D飞线
      var dser = [] // 2D散点坐标
      Data_Map.forEach(function(item, i) {
        dser.push(
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 3,
            rippleEffect: {
              brushType: 'stroke'
            },
            label: {
              fontSize: 24,
              show: true,
              position: 'right',
              formatter: ''
              // formatter: '{b}'
            },
            itemStyle: {
              normal: {
                color: '#f5f802'
              }
            },
            data: item[1].map(function(dataItem) {
              return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[1].name],
                symbolSize: dataItem[1].value / 4
              }
            })
          },
          {
            type: 'effectScatter',
            // type: 'scatter',
            coordinateSystem: 'geo',
            zlevel: 3,
            rippleEffect: {
              brushType: 'stroke'
            },
            label: {
              normal: {
                show: true,
                position: 'left',
                fontSize: 18,
                formatter: ''
                // formatter: '{b}'
              }
            },
            itemStyle: {
              normal: {
                color: '#ff0000'
              }
            },
            data: [
              {
                name: item[0],
                value: geoCoordMap[item[0]],
                symbolSize: parseInt(Math.random() * 20 + 10),
                label: {
                  normal: {
                    position: 'right'
                  }
                }
              }
            ]
          }
        )
        series.push({
          type: 'lines3D',
          // type: 'scatter3D',
          effect: {
            show: true,
            period: 3, // 速度
            trailLength: 0.1 // 尾部阴影
          },
          lineStyle: {
            // 航线的视图效果
            width: 1,
            color: '#fff',
            opacity: 0.5
          },
          data: convertData(item[1]) // 特效的起始、终点位置，一个二维数组，相当于coords: convertData(item[1])
        })
      })
      this.drawEarthBg(dser, series)
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
<style lang="less" scoped>
#container {
  background: url('../assets/imgs/earth_bg.png') no-repeat;
  background-position: left;
}

.tootips {
  position: absolute;
  border-style: solid;
  white-space: nowrap;
  z-index: 9999999;
  transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s;
  background-color: rgba(0, 0, 0, 0.6);
  border-width: 0;
  border-color: rgb(51, 51, 51);
  border-radius: 4px;
  color: rgb(255, 255, 255);
  font: 14px / 21px;
  padding: 5px;
  left: 34px;
  top: 20px;
  pointer-events: auto;

  li {
    margin-bottom: 5rem;
  }
}

.show {
  display: block;
}

.hide {
  display: none;
}
</style>
