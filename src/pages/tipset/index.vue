<template>
  <!-- 最新区块 -->
  <el-row :gutter="20" class="mt-14">
    <el-col :span="24">
      <el-card class="box-card tipset">
        <div slot="header" class="clearfix">
          <span class="card-title"><i class="el-icon-menu" />区块列表</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="24">
            <TableComponent
              :loading="loading.tipset"
              :size="'mini'"
              :table-data="tableData"
              :table-config="tableConfig"
            />
            <!-- class="isWebShow" -->
            <!-- <PhoneTable :bg="'bg'" :table-data="tableData" :table-config="tableConfig" class="isAppShow"/> -->
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
</template>

<script>
import TableComponent from '@/components/TableComponent'
import PhoneTable from '@/components/PhoneTable'
import Pagination from '@/components/Pagination' // 引入
import { tipsetList } from '@/utils/api'
import { timestamp } from '@/utils/auth'
export default {
  components: {
    TableComponent,
    PhoneTable,
    Pagination
  },
  data: () => ({
    tableData: [],
    loading: {
      tipset: false
    },
    total: 0,
    listQuery: {
      page: 0, // 与后台定义好的分页参数
      pageSize: 20
    }
  }),
  computed: {
    tableConfig() {
      return require('@/assets/config/tableConfig/tipset').default
    }
  },
  watch: {
    // watch就是用来监控数据变化，只有变化了才会调用定时器的变化
    tableData() {
      // 调用定时器
      this.timer()
    }
  },
  mounted() {
    this.initData()
  },
  destroyed() {
    // 销毁监听
    clearTimeout(this.timer)
  },
  methods: {
    initData() {
      this.getTipsetList()
    },
    // 区块列表
    getTipsetList() {
      this.action(
        tipsetList,
        this.listQuery,
        res => {
          this.tableData = res.tipsets
          this.total = res.totalCount
          this.tableData.map(item => {
            item.height = item.height
            item.timestamp = timestamp(item.timestamp)
          })
        },
        this.loading.tipset
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
    },
    // 定时器
    timer() {
      return setTimeout(() => {
        this.getTipsetList()
      }, 30000)
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/css/mixin.less";

.tipset {
  .tipset-title {
    padding-left: 0 !important;
  }

  .tipset-table {
    height: auto;
  }
}

</style>
