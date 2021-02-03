<template>
  <div>
    <!-- 修改签名 部分 -->
    <div class="nav">
      <span class="name">区块高度 #{{ query.id }}</span>
    </div>
    <!-- 第一部分 矿工概览 -->
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="box-card">
          <PhoneTable
            :table-data="tipsetDetail.accountList"
            :table-config="[{
              prop: 'timestamp',
              label: '区块时间'
            },{
              prop: 'messageCount',
              label: '累计消息数（去重）',
              width: 'auto'
          }]"/>
        </el-card>
      </el-col>
    </el-row>
    <!-- 所有区块 -->
    <el-row :gutter="20" class="mt-14">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card-title">所有区块</span>
          </div>
          <PhoneTable :bg="'bg'" :table-data="tableData" :table-config="tableConfig"/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import PhoneTable from '@/components/PhoneTable'
import { chartMixin } from '@/assets/js/chartMixin'
import {
  getTipset
} from '@/utils/api'
import { formatDate, switchUnit } from '@/utils/auth'
export default {
  components: {
    PhoneTable
  },
  mixins: [chartMixin],
  data: () => ({
    tableData: [],
    tipsetDetail: {},
    loading: {}
  }),
  computed: {
    query: {
      get() {
        return {
          page: 0, // 与后台定义好的分页参数
          pageSize: 20,
          id: this.$route.params.height
        }
      },
      set() {}
    },
    tableConfig: {
      get() {
        return require('@/assets/config/tableConfig/detail/tipsetDetail').default
      },
      set() {}
    }
  },
  mounted() {
    console.log(this.query.id)
  },
  methods: {
    initData() {
      this.getTipset()
    },
    // 消息
    getTipset() {
      this.action(
        getTipset,
        this.query,
        res => {
          this.tableData = res.blocks
          this.tableData.map(item => {
            item.reward = switchUnit(item.reward, 4)
          })
          this.tipsetDetail = {
            accountList: [
              {
                timestamp: formatDate(res.timestamp),
                messageCount: res.messageCount
              }
            ]
          }
        }
      )
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/css/mixin.less";

.nav {
  line-height: 60rem;

  .name {
    font-size: 22rem;
    margin-left: 15rem;
  }
}

.box-card {
  .card-title {
    border-left: 3px solid #5bfdff;
    padding-left: 16rem;
  }
}

.minerStats {
  padding: 25rem 40rem;
  line-height: 39rem;
}

.bold {
  display: inline-block;
  width: 200rem;
  font-weight: bold;
}
</style>
