import echarts from 'echarts'
var myChart = ''
export const chartMixin = {
  data: () => ({
    resizefun: null,
    loading: {}
  }),
  computed: {
  },
  mounted() {
    this.initData()
  },
  // 移除事件监听，避免内存泄漏
  beforeDestroy() {
    window.removeEventListener('resize', this.resizefun)
    this.resizefun = null
    myChart && myChart.clear()
  },
  methods: {
    initData() {
      window.localStorage.clear()
    },
    // 画图
    drawLine(options, ref, click) {
      const that = this
      // 基于准备好的dom，初始化echarts实例
      if (that.$refs[ref]) {
        myChart = echarts.init(that.$refs[ref])
      }

      // 绘制图表
      myChart.setOption(options)
      // 实现自适应部分
      that.resizefun = () => {
        if (that.$refs[ref]) {
          echarts.init(that.$refs[ref]).resize()
        }
      }
      window.addEventListener('resize', that.resizefun)
      if (click) {
        myChart.on('click', function(params) {
          const obj = JSON.parse(params.seriesName)
          if (obj.miner) {
            that.$router.push({
              path: `/address/${obj.miner}`
            })
          }
        })
      }
    },
    /**
     * 请求处理
     * @param {Function} f api请求接口函数
     * @param {Object} p 请求参数
     * @param {Function} cb 返回数据的回调函数
     * @param {String} tag loading标签
     */
    action(f, p, cb, tag) {
      this.loading[tag] = true
      f(p).then(res => {
        cb(res)
      }).catch(err => {
        console.log(err)
      }).finally(res => {
        this.loading[tag] = false
      })
    }
  }

}
