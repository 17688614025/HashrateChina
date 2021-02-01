<template>
  <div>
    <!-- 修改签名 部分 -->
    <div class="nav">
      <span class="name">区块详情</span>
    </div>
    <!-- 第一部分 矿工概览 -->
    <el-row :gutter="20">
      <el-col :span="24" class="mt-14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card-title">区块概览</span>
          </div>
          <PhoneTable
            :table-data="blockDetail.accountList"
            :table-config="blockDetailConfig"/>
        </el-card>
      </el-col>
    </el-row>
    <!-- 消息列表 -->
    <el-row :gutter="20" class="mt-14">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix mt-14">
            <span class="card-title">消息列表</span>
            <div class="total">共 {{ total }} 条消息</div>
          </div>
          <el-row :gutter="20">
            <el-col :span="24">
              <TableComponent
                :loading="loading.power"
                :size="'mini'"
                :table-data="tableData"
                :table-config="tableConfig"
                class="isWebShow"
              />
              <PhoneTable :bg="'bg'" :table-data="tableData" :table-config="tableConfig" class="isAppShow"/>
              <template>
                <Pagination
                  v-if="total > 0"
                  :total="total"
                  :page.sync="query.page"
                  :limit.sync="query.pageSize"
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
import { chartMixin } from '@/assets/mixins/chartMixin'
import {
  getBlockDetail,
  getBlockMessages
} from '@/utils/api'
import { toThousands, formatDate, byteConvert, dicSwitch, switchUnit } from '@/utils/auth'
export default {
  components: {
    TableComponent,
    PhoneTable,
    Pagination
  },
  mixins: [chartMixin],
  data: () => ({
    tableData: [],
    blockDetail: {},
    loading: {},
    total: 0
  }),
  computed: {
    query: {
      get() {
        return {
          page: 0, // 与后台定义好的分页参数
          pageSize: 20,
          id: this.$route.params.cid
        }
      },
      set() {}
    },
    blockDetailConfig: {
      get() {
        return require('@/assets/config/formConfig/detail/blockDetail').default
      },
      set() {}
    },
    tableConfig: {
      get() {
        return require('@/assets/config/tableConfig/detail/blockMessages').default
      },
      set() {}
    }
  },
  watch: {
    'query.id': {
      handler(n) {
        this.initData()
      },
      deep: true
    }
  },
  mounted() {
    console.log(this.query.id)
  },
  methods: {
    initData() {
      this.getBlockDetail()
      this.getaddressMessages()
    },
    // 矿工概览
    getBlockDetail() {
      const p = { id: this.query.id }
      this.action(getBlockDetail, p, res => {
        this.blockDetail = {
          ...res,
          // 账户概览
          accountList: [
            {
              ...res,
              timestamp: formatDate(res.timestamp), size: byteConvert(res.size),
              reward: switchUnit(res.reward, 4) || 'N/A',
              parentWeight: toThousands(res.parentWeight),
              parentBaseFee: switchUnit(res.parentBaseFee, 4)
            }
          ]
        }
      })
    },
    // 消息
    getaddressMessages() {
      this.action(
        getBlockMessages,
        this.query,
        res => {
          this.total = res.totalCount
          this.tableData = res.messages
          this.tableData.map(item => {
            item.value = switchUnit(item.value, 4)
            item.exitCode = item.receipt && dicSwitch('exitCode', item.receipt.exitCode)
          })
        }
      )
    },
    // 换页
    pageChange(item) {
      this.query = {
        ...this.query,
        page: item.page,
        pageSize: item.limit
      }
      this.getaddressMessages() // 改变页码，重新渲染页面
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/css/mixin.less";

.box-card {
  .card-title {
    border-left: 3px solid #5bfdff;
    padding-left: 16rem;
  }
}

.total {
  float: left;
  width: 100%;
  margin-left: 20rem;
  margin-top: 20rem;
}

</style>
