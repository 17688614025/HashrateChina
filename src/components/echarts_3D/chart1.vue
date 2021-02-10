<template>
  <section>
    <div id="earth"
         style="width: 100%; height: 462rem; box-sizing: border-box;" />
  </section>
</template>

<script>
import { getEarthView, getMap } from '@/utils/api'
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
    this.getEarthData(this.initData)
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
    initData(apiRes, loc) { },
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
