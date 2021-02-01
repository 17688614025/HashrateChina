<template>
  <el-menu
    :default-active="this.$router.path"
    router
    background-color="#031321"
    text-color="#fff"
    active-text-color="#5BFDFF"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item
      class="logo"
    >
      <router-link to="/">
        <img
          class="logoimg"
          src="../assets/imgs/suan_li_logo.png"
          alt="logo"
        >
        <div class="fr logo-text">
          <p class="text1">算 力 中 国</p>
          <p class="text2">Hashrate China</p>
        </div>
      </router-link>
    </el-menu-item>
    <el-menu-item
      v-for="(item, key) in leftNavItems"
      :key="key"
      :index="item.indexPath"
      :class="!key && 'ml-005'"
    >
      {{ item.name }}
    </el-menu-item>
    <el-submenu
      v-if="Object.keys(rightNavItems).length"
      class="fr right-item"
    >
      <template slot="title">
        <i class="el-icon-s-unfold" style="font-size: 28rem; color: #fff;" />
      </template>
      <el-menu-item
        v-for="(item, key) in rightNavItems"
        :key="key"
        :index="item.indexPath"
      >
        {{ item.name }}
      </el-menu-item>
    </el-submenu>
    <el-menu-item class="fr">
      <span v-if="!Object.keys(rightNavItems).length" class="mainnet">
        <span>当前网络:</span>
        <span>Mainnet</span>
      </span>
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{ language }}
          <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="zh">中文</el-dropdown-item>
          <el-dropdown-item command="en">English</el-dropdown-item>
          <el-dropdown-item command="else">其他</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data: () => ({
    activeIndex: '1',
    language: '中文',
    screenWidth: document.body.clientWidth
  }),
  computed: {
    navItems() {
      return [
        { name: this.$t('home.home'), indexPath: '/', index: '1' },
        // {
        //   name: this.$t('home.calculator'),
        //   indexPath: '/calculator',
        //   index: '2'
        // },
        { name: this.$t('home.ranks'), indexPath: '/ranks/power', index: '3' },
        {
          name: this.$t('home.statistical'),
          indexPath: '/stats/gas',
          index: '4'
        },
        { name: this.$t('home.aboutUs'), indexPath: '/aboutUs', index: '5' }
      ]
    },
    leftNavItems() {
      return this.screenWidth >= 1024 ? this.navItems : {}
    },
    rightNavItems() {
      return this.screenWidth < 1024 ? this.navItems : {}
    }
  },
  watch: {
    screenWidth(n) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = n
        this.timer = true
        setTimeout(() => {
          this.timer = false
        }, 400)
      }
    },
    rightNavItems: {
      handler(n) {
        this.$store.commit('isScreenPhone', Object.keys(n).length)
      },
      deep: true// 深度监视
    }
  },
  mounted() {
    window.onresize = () => {
      this.screenWidth = document.body.clientWidth
    }
  },
  destroyed() {
    // 销毁监听
    clearTimeout(this.timer)
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    handleCommand(command) {
      this.language =
        command === 'zh' ? '中文' : command === 'en' ? 'English' : command
      this.$i18n.locale = command === 'else' ? 'zh' : command
      window.localStorage.setItem('language', this.$i18n.locale)
      this.$message('click on item ' + command)
    }
  }
}
</script>
<style lang="less" scoped>
.el-menu.el-menu--horizontal {
  border-bottom: none;
}

.el-menu--horizontal > .el-menu-item {
  height: 60rem;
  line-height: 60rem;
}

.el-menu {
  width: 96%;
  margin: 28rem auto;

  .logo {
    .logo-text {
      height: 60rem;
      margin: -4rem 15rem 0;

      p {
        margin: 0;
        height: 20rem;
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

  .mainnet {
    font-size: 14rem;
    margin-right: 25rem;
  }

  .el-dropdown-link {
    border: 1px solid #5bfdff;
    padding: 3rem 20rem;
    border-radius: 20px;
    font-size: 14rem;
    color: #5bfdff;
    margin: 0;
  }

  /deep/.el-submenu__title {
    height: 60rem;
    line-height: 60rem;
    padding: 0;
    cursor: pointer;
  }
}
</style>
