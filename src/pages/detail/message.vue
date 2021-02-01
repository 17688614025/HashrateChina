<template>
  <div>
    <!-- 修改签名 部分 -->
    <div class="nav">
      <span class="name">消息详情</span>
    </div>
    <!-- 第一部分 消息概览 -->
    <el-row :gutter="20">
      <el-col :span="24" class="mt-14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card-title">消息概览</span>
          </div>
          <PhoneTable :table-data="messageData" :table-config="messageConfig"/>
        </el-card>
      </el-col>
    </el-row>
    <!-- 消息列表 -->
    <el-row :gutter="20" class="mt-14">
      <el-col :span="24">
        <el-card class="box-card power">
          <div slot="header" class="clearfix power">
            <span class="card-title">转账信息</span>
          </div>
          <el-row :gutter="20" class="power-table">
            <el-col :span="24">
              <TableComponent
                :loading="loading.power"
                :size="'mini'"
                :table-data="tableData"
                :table-config="tableConfig"
                class="isWebShow"
              />
              <PhoneTable :bg="'bg'" :table-data="tableData" :table-config="tableConfig" class="isAppShow"/>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!-- 其他信息 -->
    <el-row :gutter="20">
      <el-col :span="24" class="mt-14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card-title">其他信息</span>
          </div>
          <PhoneTable :table-data="messageData" :table-config="ortherConfig"/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import TableComponent from '@/components/TableComponent'
import PhoneTable from '@/components/PhoneTable'
import { chartMixin } from '@/assets/mixins/chartMixin'
import {
  getMessage
} from '@/utils/api'
import { toThousands, formatDate, dicSwitch, switchUnit } from '@/utils/auth'
export default {
  components: {
    TableComponent,
    PhoneTable
  },
  mixins: [chartMixin],
  data: () => ({
    messageData: [],
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
    messageConfig: {
      get() {
        return require('@/assets/config/tableConfig/detail/messageDetail').default
      },
      set() {}
    },
    ortherConfig: {
      get() {
        return require('@/assets/config/formConfig/detail/ortherMessage').default
      },
      set() {}
    },
    tableConfig: {
      get() {
        return require('@/assets/config/tableConfig/detail/messageTransfers').default
      },
      set() {}
    }
  },
  watch: {
    'query.id': {
      handler(n) {
        console.log(n)
      },
      deep: true
    }
  },
  mounted() {
    console.log(this.query.id)
  },
  methods: {
    initData() {
      this.getMessage()
    },
    // 矿工概览
    getMessage() {
      const p = { id: this.query.id }
      this.action(getMessage, p, res => {
        if (res) {
          res.timestamp = formatDate(res.timestamp)
          res.value = switchUnit(res.value)
          res.gasFeeCap = switchUnit(res.gasFeeCap)
          res.gasPremium = switchUnit(res.gasPremium)
          res.baseFee = switchUnit(res.baseFee)
          res.gasLimit = toThousands(res.gasLimit)
          res.gasUsed = toThousands(res.receipt.gasUsed)
          res.return = res.receipt.return || `(无)`
          res.exitCode = dicSwitch('exitCode', res.receipt.exitCode)
          res.transfers && res.transfers.map(item => {
            item.value = switchUnit(res.value)
            item.type = dicSwitch('type', item.type)
          })
          this.messageData = [res]
          this.tableData = res.transfers
        }
      })
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
</style>
