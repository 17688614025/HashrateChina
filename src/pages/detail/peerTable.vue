<template>
  <div>
    <div>
      <el-card>
        <!-- <el-autocomplete
          :fetch-suggestions="querySearchAsync"
          placeholder="支持输入逗号分隔的店铺id字符串进行商家对比"
          enter-button="对比"
          size="large"
          @select="handleSelect"
        /> -->
      </el-card>
    </div>
    <div class="mt-5">
      <el-menu v-model="current" mode="horizontal">
        <el-menu-item key="shopContrast">店铺对比</el-menu-item>
        <el-menu-item key="dataContrast">数据对比</el-menu-item>
        <el-menu-item key="publicContrast">口碑对比</el-menu-item>
      </el-menu>
    </div>
    <div class="ContrastTable mt-5">
      <el-card>
        <mailTable :table-data="tableData" :table-rows="tableRows" :table-style="{ width:'100%'}"/>
      </el-card>
    </div>
  </div>
</template>

<script>
import mailTable from '@/components/MailTable'

const tableRows = [
  { key: '城市', value: 'city' },
  { key: '区域', value: 'area' },
  { key: '行业', value: 'industry' },
  { key: '健康总分数', value: 'healthScore' },
  { key: '意向', value: 'wonder' },
  { key: '贡献', value: 'gong' },
  { key: '热度', value: 'hotScore' },
  { key: '意向人数', value: 'yiX' },
  { key: '访问人数', value: 'Fang' },
  { key: '客资数', value: 'Ke' },
  { key: '订单量', value: 'Ding' },
  { key: '访问数据', value: 'FD' },
  { key: '访问频次', value: 'FS' }
]

const tableData = [
  { 'city': '杭州', 'area': '上城', 'industry': '婚紗摄影', 'healthScore': 90, 'wonder': 50, 'gong': 22, 'hotScore': 22, 'yiX': 55, 'Fang': 99, 'Ke': 1, 'Ding': 5, 'FD': 10, 'FS': 900 },
  { 'city': '上海', 'area': '浦東', 'industry': '婚纱摄影', 'healthScore': 80, 'wonder': 50 },
  { 'city': '北京', 'area': '海淀', 'industry': '婚纱礼服', 'healthScore': 70, 'wonder': 55 },
  { 'city': '上海', 'area': '浦東', 'industry': '婚纱摄影', 'healthScore': 80, 'wonder': 50 },
  { 'city': '北京', 'area': '海淀', 'industry': '婚纱礼服', 'healthScore': 70, 'wonder': 55 }
]
export default {
  name: 'Test',
  components: {
    mailTable
  },
  data() {
    return {
      tableData,
      tableRows,
      current: ['dataContrast']
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.mt-5 {
  margin-top: 5rem;
}
</style>
