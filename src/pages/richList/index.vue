<template>
  <div class="main">
    <!-- 富豪榜 -->
    <el-row :gutter="20" class="mt-14">
      <el-col :span="24">
        <el-card class="box-card richList">
          <div slot="header" class="clearfix">
            <span class="card-title">
              <img src="@/assets/imgs/rich.png" alt="rich" >富豪榜
            </span>
          </div>
          <el-row :gutter="20">
            <el-col :span="24">
              <TableComponent
                :loading="loading.richList"
                :size="'mini'"
                :sort="true"
                :table-data="tableData"
                :table-config="tableConfig"
                class="isWebShow"
              />
              <PhoneTable :bg="'bg'" :table-data="tableData" :table-config="tableConfig" class="isAppShow"/>
              <template>
                <Pagination
                  v-if="total > 0"
                  :total="total"
                  :page.sync="listQuery.page"
                  :limit.sync="listQuery.pageSize"
                  :layout="'prev, pager, next, jumper'"
                  @pagination="pageChange"
                />
              </template>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TableComponent from '@/components/TableComponent'
import PhoneTable from '@/components/PhoneTable'
import Pagination from '@/components/Pagination' // 引入
import { richList } from '@/utils/api'
import { toThousands, formatDate, dicSwitch } from '@/utils/auth'
export default {
  components: {
    TableComponent,
    PhoneTable,
    Pagination
  },
  data: () => ({
    tableData: [],
    loading: {
      richList: false
    },
    total: 0,
    listQuery: {
      page: 0, // 与后台定义好的分页参数
      pageSize: 20
    }
  }),
  computed: {
    tableConfig() {
      return require('@/assets/config/tableConfig/richList').default
    }
  },
  watch: {},
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      this.getrichList()
    },
    // 区块列表
    getrichList() {
      this.action(
        richList,
        this.listQuery,
        res => {
          this.tableData = res.richList
          this.total = res.totalCount
          this.tableData.map(item => {
            item.balancePercent =
              (item.availableBalance / item.balance).toFixed(2) + '%'
            item.balance = toThousands(item.balance, 0, 'FIL') + ' FIL'
            item.actor = dicSwitch('actor', item.actor)
            item.createTimestamp = formatDate(item.createTimestamp)
            item.lastSeenTimestamp = formatDate(item.lastSeenTimestamp)
          })
        },
        this.loading.richList
      )
    },
    // 换页
    pageChange(item) {
      console.log(item)
      this.listQuery = {
        page: item.page,
        pageSize: item.limit
      }
      this.initData() // 改变页码，重新渲染页面
    },
    // 请求处理
    action(f, p, cb, loading) {
      loading = true
      f(p)
        .then(res => {
          cb(res)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(res => {
          loading = false
        })
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/css/mixin.less";

.richList {
  .richList-title {
    padding-left: 0 !important;
  }

  .richList-table {
    height: auto;
  }
}

</style>
