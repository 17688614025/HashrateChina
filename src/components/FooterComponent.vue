<template>
  <div class="footer">
    <el-col :sm="24" :lg="18" class="fl text">
      <div class="logo">
        <router-link to="/">
          <img
            class="fl logoimg"
            src="../assets/imgs/logo.png"
            alt="logo"
          >
        </router-link>
      </div>
      <p class="clear">hashrate.com是算力中国开发的Filecoin区块链浏览器。为用户稳定地提供Filecoin相关的各类数据、信息和 </p>
      <p>可视化图表等内容，具体包括矿工信息、区块信息、消息信息、FIL代币相关信息、常用工具等.</p>
      <p class="icon">
        <a href="https://www.oschina.net/p/ipfs" target="blank"><img src="../assets/imgs/IPFS.png" alt="IPFS"></a>
        <a href="https://filscan.io/#/home" target="blank"><img src="../assets/imgs/Filecoin.png" alt="filscan"></a>
        <a href="https://github.com/filecoin-project" target="blank"><i class="fa fa-github"/> Github</a>
        <a href="https://weibo.com/" target="blank"><i class="fa fa-weibo"/> Weibo</a>
      </p>
    </el-col>
    <el-col :sm="24" :lg="6" class="fr code">
      <div class="fl code-img">
        <p><img src="../assets/imgs/wechat.png" class="img" alt="wechat"></p>
        <span>公众号二维码</span>
      </div>
      <div class="fl code-img">
        <p><img src="../assets/imgs/kefu.png" class="img" alt="kefu"></p>
        <span>客服二维码</span>
      </div>
    </el-col>
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
  margin: 30rem 5%;
  color: #ccc;
  overflow: hidden;

  .text {
    line-height: 24rem;

    .logo {
      margin-bottom: 20rem;
      overflow: hidden;
    }

    .icon {
      margin-top: 20rem;
      font-size: 20rem;

      a {
        margin-right: 30rem;
        color: #ccc;

        i {
          font-size: 24rem;
        }

        img {
          height: 24rem;
          vertical-align: top;
        }
      }
    }
  }

  .code {
    text-align: center;

    .code-img {
      margin: 20rem 0 30rem;
      margin-right: 30rem;

      p {
        .img {
          height: 100rem;
          vertical-align: middle;
          margin-bottom: 10rem;
        }
      }
    }
  }
}
</style>
