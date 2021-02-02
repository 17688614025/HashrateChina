<template>
  <el-container direction="vertical">
    <header>
      <header-component />
    </header>
    <el-main>
      <router-view />
    </el-main>
    <footer>
      <FooterComponent/>
    </footer>
  </el-container>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent'
import FooterComponent from '@/components/FooterComponent'
export default {
  components: {
    HeaderComponent,
    FooterComponent
  },
  data: () => ({}),
  computed: {

  },
  watch: {

  },
  mounted() {},

  methods: {}
}
</script>
<style lang="less" scoped>
/deep/.el-input__inner {
  background-color: #031321;
  color: #ccc;
  border: 1px solid #ccc;
}

/deep/.el-radio-button__inner {
  background: #031321;
  color: #ccc;
}

/deep/.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background-color: #00b6b8;
  border: 1px solid #ccc;
  color: #ccc;
  -webkit-box-shadow: -1px 0 0 0 #00b6b8;
  box-shadow: -1px 0 0 0 #00b6b8;
}

.el-container {
  background-color: #01080f;
}

header {
  background-color: #031321;
  text-align: center;
  height: 116rem;
  line-height: 116rem;
}

footer {
  background-color: #031321;
  min-height: 276rem;
}

.el-main {
  padding: 0;
  min-height: 750rem;
  margin-bottom: 50rem;
  overflow: hidden;
}
</style>
