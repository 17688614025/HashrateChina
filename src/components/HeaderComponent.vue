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
      index="/"
    >
      <img
        class="logoimg"
        src="../assets/imgs/logo.png"
        alt="logo"
      >
    </el-menu-item>
    <el-menu-item
      v-for="(item, key) in leftNavItems"
      :key="key"
      :index="item.indexPath"
      :class="'underline ' + (!key && 'ml-005')"
    >
      {{ item.name }}
    </el-menu-item>
    <el-submenu
      v-if="Object.keys(rightNavItems).length"
      class="fr right-item"
      index="dropdown"
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
    <el-menu-item :index="$route.path" class="fr">
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

  .menu-item,
  .el-menu-item {
    height: 40rem;
    line-height: 40rem;
    border: none;
  }

  .underline::after {
    display: block;
    content: "";
    height: 2px;
    width: 0%;
    background-color: #5bfdff;
    position: absolute;
    top: 100%;
    left: 50%;
    right: 50%;
    transition: all 0.5s;
  }

  .underline:hover::after,
  .underline:focus::after {
    left: 25%;
    right: 25%;
    width: 50%;
  }
}

/deep/.el-submenu .el-submenu__title {
  height: 40rem;
  // line-height: 40rem;
  padding: 0;
  cursor: pointer;
  border-bottom: none;
}

/deep/.el-submenu.is-active .el-submenu__title {
  border-bottom: none;
  color: #303133;
}

.el-menu {
  width: 96%;
  margin: 20rem auto;

  .logo {
    .logoimg {
      height: 30rem;
    }
  }

  .mainnet {
    font-size: 14rem;
    margin-right: 25rem;
    color: #ccc;
  }

  .el-dropdown-link {
    border: 1px solid #5bfdff;
    padding: 3rem 20rem;
    border-radius: 20px;
    font-size: 14rem;
    color: #5bfdff;
    margin: 0;
  }
}
</style>
