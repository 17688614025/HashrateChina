<template>
  <div class="aboutus">
    <div class="banner">
      <!-- <h1 class="top">中国的算力 &nbsp;&nbsp; 世界的基建</h1>
      <div class="right">
        <p>以用户价值为导向，专注于IPFS分布式存储行业，</p>
        <p>为全球用户提供一流的产品及服务。</p>
      </div> -->
    </div>
    <div class="jieshao">
      <div class="inner">
        <h1>企业介绍</h1>
        <p>Enterprise introduction</p>
        <div class="mt-100">算力中国是一家专注于IPFS技术研发的分布式网络服务提供商，面向全世界各个国家和地区的企业组织和个人用户，提供一站式分布式网络技术服务。以创新的科技理念打造丰富的行业解决方案，构建开放共赢的分布式网络生态，推动IPFS产业建设发展。</div>
      </div>
    </div>
    <ul class="aboutUs_ul">
      <li>
        <img src="../../assets/imgs/safe.png" alt="safe">
        <p class="text">安全稳定的存储集群</p>
      </li>
      <li>
        <img src="../../assets/imgs/team.png" alt="team">
        <p class="text">专业研发及运维团队</p>
      </li>
      <li>
        <img src="../../assets/imgs/distributed.png" alt="distributed">
        <p class="text">IPFS深度定制的<br>分布式存储服务</p>
      </li>
      <li>
        <img src="../../assets/imgs/IDC.png" alt="IDC">
        <p class="text">Tier 3+ 五星级IDC机房</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data: () => ({
    active: 0,
    windowHeight: 0,
    scrollTop: 0,
    offsetTop: 0
  }),
  computed: {},
  mounted() {
    // 变量 windowHeight 是可视区的高度
    this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight
    const that = this
    window.onscroll = () => {
      // 变量 scrollTop 是滚动条滚动时, 距离顶部的距离
      that.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const ul = document.querySelectorAll('.aboutUs_ul')[0]
      that.offsetTop = ul.offsetTop
      if (that.scrollTop + that.windowHeight > that.offsetTop) {
        ul.className = 'move aboutUs_ul'
      } else {
        ul.className = 'aboutUs_ul'
      }
      console.log(that.scrollTop, that.windowHeight, that.offsetTop, ul.className)
    }
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.banner,
.jieshao {
  width: 100%;
  height: 573rem;
  overflow: hidden;
}

.banner {
  background: url('../../assets/imgs/banner.png') no-repeat;
  background-size: 100% 100%;
}

.jieshao {
  background: url('../../assets/imgs/jieshao.png') no-repeat;
  background-size: 100% 100%;

  .inner {
    position: absolute;
    width: 70%;
    left: 15%;
    margin: 100rem auto;
    padding: 60rem 40rem 100rem;
    background: rgba(0, 0, 0, 0.6);
    opacity: 0;
    animation: innerMove 2s forwards;

    h1 {
      font-size: 50rem;
      margin: 10rem 0;
      text-shadow: #fff 3px 4px 5px;
    }

    p {
      color: #999;
      font-size: 24rem;
    }

    .mt-100 {
      width: 70%;
      margin-top: 100rem;
      line-height: 24rem;
    }
  }
}

ul {
  background: url('../../assets/imgs/us_bg.png') no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 860rem;
  overflow: hidden;

  li {
    width: 50%;
    height: 50%;
    float: left;
    text-align: center;
    opacity: 0;

    img {
      margin-top: 15%;
    }

    .text {
      margin-top: 20rem;
      color: #5bfdff;
      line-height: 40rem;
    }
  }

  &.move li {
    animation: move 1s forwards;
  }
}

@keyframes innerMove {
  from {
    opacity: 0;
    left: -40%;
  }

  to {
    opacity: 1;
    left: 15%;
  }
}

@keyframes move {
  from {
    opacity: 0;
    margin-left: 500rem;
  }

  to {
    opacity: 1;
    margin-left: 0;
  }
}

</style>
