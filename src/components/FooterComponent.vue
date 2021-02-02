<template>
  <div class="footer">
    <router-link to="/" class="logo">
      <img
        class="fl logoimg"
        src="../assets/imgs/suan_li_logo.png"
        alt="logo"
      >
      <div class="fl logo-text">
        <p class="text1">算 力 中 国</p>
        <p class="text2">Hashrate China</p>
      </div>
    </router-link>
    <div class="clear text">
      <el-col :sm="24" :lg="18" class="fl">
        <p>hashrate.com是算力中国开发的Filecoin区块链浏览器。为用户稳定地提供Filecoin相关的各类数据、信息和 </p>
        <p>可视化图表等内容，具体包括矿工信息、区块信息、消息信息、FIL代币相关信息、常用工具等.</p>
        <p class="icon">
          <a href="https://www.oschina.net/p/ipfs" target="blank"><img src="https://static.oschina.net/uploads/logo/ipfs_xbj2l.jpg" alt="IPFS"> IPFS</a>
          <a href="https://filscan.io/#/home" target="blank"><img src="https://forcepool-file.oss-accelerate.aliyuncs.com/filscan/img/logo.701cfdc6.png" alt="filscan"> Filscan</a>
          <a href="https://github.com/filecoin-project" target="blank"><i class="fa fa-github"/> Github</a>
          <a href="https://weibo.com/" target="blank"><i class="fa fa-weibo"/> Weibo</a>
        </p>
      </el-col>
      <el-col :sm="24" :lg="6" class="fr code">
        <div class="fl code-img">
          <p><img src="../assets/imgs/wechat.png" alt="wechat"></p>
          <span>公众号二维码</span>
        </div>
        <div class="fl code-img">
          <p><img src="../assets/imgs/kefu.png" alt="kefu"></p>
          <span>客服二维码</span>
        </div>
      </el-col>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({

  }),
  mounted() {

  },
  methods: {

  }
}
</script>
<style lang="less" scoped>

.footer {
  margin: 50rem 5%;
  color: #ccc;

  .logo {
    .logo-text {
      height: 60rem;
      margin: 0 15rem 0;
      color: #ccc;

      p {
        margin: 0;
        height: 20rem;
        line-height: 24rem;
        text-align: left;

        &.text1 {
          font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
          font-size: 18rem;
        }

        &.text2 {
          font-size: 12rem;
        }
      }
    }
  }

  .text {
    line-height: 24rem;

    .icon {
      margin-top: 40rem;
      font-size: 20rem;

      a {
        margin-right: 30rem;

        i {
          font-size: 24rem;
        }

        img {
          height: 24rem;
          vertical-align: middle;
        }
      }
    }

    .code {
      text-align: center;

      .code-img {
        margin: 20rem 0 30rem;
        margin-right: 30rem;

        img {
          height: 100rem;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
