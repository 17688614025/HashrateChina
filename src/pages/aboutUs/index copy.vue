<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <el-card class="box-card title">
        <div slot="header" class="clearfix">
          <span>文章列表</span>
        </div>
        <div
          v-for="(item, i) in list"
          :key="i"
          :class="active === i ? 'text active' : 'text'"
          @click="changeMd(i)"
        >
          {{ `${i + 1}. ${item}` }}
        </div>
      </el-card>
    </el-col>
    <el-col :span="20">
      <!-- 最后在页面上使用 -->
      <mavon-editor
        :subfield="false"
        :toolbars-flag="false"
        :box-shadow="false"
        :ishljs="true"
        class="md box-card"
        v-html="readme"
      />
    </el-col>
  </el-row>
</template>
<script>
import aboutUs_1 from '@/pages/aboutUs/1.md' // 引入md文件
import aboutUs_2 from '@/pages/aboutUs/2.md' // 引入md文件
import aboutUs_3 from '@/pages/aboutUs/3.md' // 引入md文件
export default {
  data: () => ({
    active: 0,
    list: ['入门篇', '挖矿篇', '开发篇'],
    markdownOption: {
      bold: true // 粗体
    },
    readme: '' // 在data里边声明
  }),
  computed: {},
  mounted() {
    this.changeMd(0)
  },
  methods: {
    changeMd(i) {
      this.active = i
      const md = {
        0: aboutUs_1,
        1: aboutUs_2,
        2: aboutUs_3
      }
      this.readme = md[i]
    }
  }
}
</script>
<style lang="less" scoped>
.el-row {
  margin-top: 14rem;
}

.box-card {
  border-radius: 5px;
  border: none;
  background-color: #031321;
  color: #ccc;
  padding: 0 5rem;
  cursor: pointer;
}

.md {
  padding: 30rem;
}

.text {
  font-size: 14rem;
  margin-bottom: 12rem;

  &:hover {
    color: #fff;
  }

  &.active {
    color: blueviolet;
  }
}

</style>
