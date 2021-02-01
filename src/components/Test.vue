<template>
  <div class="hello">
    <EarthMapComponent></EarthMapComponent>
    <h1>{{ msg }}</h1>
    <el-button @click="visible = true">Button</el-button>
    <el-dialog :visible.sync="visible" title="Hello world">
      <p>Try Element</p>
    </el-dialog>
  </div>
</template>

<script>
import EarthMapComponent from '@/components/EarthMap'
export default {
  components: {
    EarthMapComponent
  },
  data: () => ({
    msg: 'Welcome to Your Vue.js App',
    visible: false
  }),
  mounted() {
    // this.initWebSocket()
    var timerOne = window.setInterval(() => {
      if (this.$socket) {
        this.$socket.emit('connect', 1)
        window.clearInterval(timerOne)
        return;
      }
    }, 500)
  },
  sockets: {
    connect(data) {
      console.log('连接connect', data);
      this.action(recentList, {}, (res) => {
        if (res) {
          this.$socket.emit('/api/v1/tipset/recent', { count: 10 });      //监听connect事件
          this.recentListData = res
          this.recentListData.map(item => {
            item.height = item.height
            item.time = this.timestamp(item.timestamp)
          })
        }
      })
    },
    message(data) { // 后台推送数据
      console.log('接收数据', data);
    },
    push_message(data) {                                 //监听message事件，方法是后台定义和提供的
      console.log('接收数据2', data);
    }
  },
  methods: {
    initWebSocket() { //初始化weosocket
      const wsuri = 'wss://filfox.info/socket.io/'
      this.websock = new WebSock                                                                                                                                                                                                                          et(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen() { //连接建立之后执行send方法发送数据
      let actions = { 'tags': ['tipset/recent'], 'count': 10 }
      this.websocketsend(JSON.stringify(actions))
    },
    /**
     * 连接建立失败,断开连接
     * 1.查询一次数据库数据
     * 2.查询完后再次建立socket连接
     * */
    websocketonerror() {//连接建立失败重连
      let _this = this
      console.log('连接建立失败')
      //this.websock.onclose()
      this.initWebSocket()
    },
    websocketonmessage(e) { //数据接收
      //const redata = JSON.parse(e.data)
      console.log(e.data)
      this.dealF2DataList(redata)
    },
    websocketsend(Data) {//数据发送
      this.websock.send(Data)
    },
    websocketclose(e) {  //关闭
      console.log('断开连接', e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
h1,
h2 {
  font-weight: normal;
}
</style>
