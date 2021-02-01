<template>
  <div class="flex flex-col text-center auto mh-auto">
    <img
      src="https://filfox.info/dist/img/error.e14e8aa.svg"
      alt="404"
      class="h-56 mx-auto"
    >
    <p class="text-sm">This page could not be found</p>
    <div class="mt-10">
      <router-link to="/">
        <el-button type="primary" round>
          返回首页
        </el-button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
.mh-auto {
  min-height: 600rem;
  margin-top: 10%;
}

.text-sm {
  font-size: 14rem;
}

.h-56 {
  height: 224rem;
}

.mt-10 {
  margin-top: 40rem;
}
</style>
