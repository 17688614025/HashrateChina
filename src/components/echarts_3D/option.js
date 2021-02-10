
export function option(mapChart, contourChart, config, that, apiRes, loc) {
  const option = {
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
      environment: require('@/assets/imgs/starfield.png'),
      baseTexture: require(`${process.env.NODE_ENV === 'production' ? './static/' : '../../../static/'}8.png`),
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

  return option
}
