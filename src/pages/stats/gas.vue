<template>
  <div class="main">
    <!-- 第三部分 饼图 折线图 -->
    <el-row :gutter="20">
      <el-col :sm="24" :lg="24" class="mt-14">
        <el-card class="box-card">
          <div slot="header">
            <span class="card-title">GAS统计-基础费率走势</span>
            <div class="fr">
              <el-radio-group
                v-model="ruleForm.baseFee_duration"
                class="isWebShow"
                size="mini"
                @change="val => durationChange(val, 'baseFee')"
              >
                <el-radio-button label="24h">24时</el-radio-button>
                <el-radio-button label="7d">7天</el-radio-button>
                <el-radio-button label="30d">30天</el-radio-button>
                <el-radio-button label="1y">1年</el-radio-button>
              </el-radio-group>
              <el-select
                v-model="ruleForm.baseFee_duration"
                class="isAppShow mxw-150"
                size="mini"
                @change="val => durationChange(val, 'baseFee')">
                <el-option label="24时" value="24h"/>
                <el-option label="7天" value="7d"/>
                <el-option label="30天" value="30d"/>
                <el-option label="1年" value="1y"/>
              </el-select>
            </div>
          </div>
          <el-row :gutter="20" class="gas">
            <el-col :span="24">
              <div ref="baseFee" :style="{ width: '100%', height: '400rem' }" />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="24" class="mt-14">
        <el-card class="box-card baseFee">
          <div slot="header">
            <span class="card-title">24h Gas 数据</span>
          </div>
          <el-row :gutter="20" class="gas">
            <el-col :span="24">
              <TableComponent
                :size="'mini'"
                :loading="loading.rich"
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
  </div>
</template>

<script>
import TableComponent from '@/components/TableComponent'
import PhoneTable from '@/components/PhoneTable'
import tableConfig from '@/assets/config/tableConfig/stats/messageFee'
import { baseFee, messageFee } from '@/utils/api'
import { toThousands, formatDate } from '@/utils/auth'
import { chartMixin } from '@/assets/js/chartMixin'
export default {
  components: {
    TableComponent,
    PhoneTable
  },
  mixins: [chartMixin],
  data: () => ({
    tableConfig,
    tableData: [],
    loading: {},
    ruleForm: {
      baseFee_duration: '24h'
    }
  }),
  computed: {
    baseFeeOptions() {
      return require('@/assets/config/echartsConfig/Home/baseFee').default
    }
  },
  mounted() {
  },
  // 移除事件监听，避免内存泄漏
  beforeDestroy() {
    window.removeEventListener('resize', this.resizefun)
    this.resizefun = null
  },
  methods: {
    initData() {
      this.getBaseFee()
      this.getMessageFee()
    },
    // 获取24h Gas 数据
    getMessageFee() {
      const p = {}
      this.action(messageFee, p, res => {
        const startTotalFee = res[0].totalFee
        const startCount = res[0].count
        res.map(item => {
          item.method = item.method ? item.method : '全部'
          item.gasPremium = toThousands(item.gasPremium) + ' nanoFIL'
          item.gasLimit = toThousands(item.gasLimit)
          item.gasUsed = toThousands(item.gasUsed)
          item.fee = toThousands(item.fee, 4, 'FIL') + ' FIL'
          item.totalFee =
            toThousands(item.totalFee, 6, 'FIL') +
            ' FIL/' +
            ((item.totalFee / startTotalFee) * 100).toFixed(2) +
            '%'
          item.count =
            item.count +
            ' / ' +
            ((item.count / startCount) * 100).toFixed(2) +
            '%'
        })
        this.tableData = res
      })
    },
    // 获取基础费率-24gas折线图走势
    getBaseFee() {
      const p = { duration: this.ruleForm.baseFee_duration, samples: 48 }
      this.action(baseFee, p, res => {
        this.showBaseFeeOptions(res)
      })
    },
    // 显示折线图数据
    showBaseFeeOptions(res) {
      this.baseFeeOptions.xAxis.data = []
      this.baseFeeOptions.series[0].data = []
      res.map(item => {
        const item_date = formatDate(item.timestamp)
        this.baseFeeOptions.xAxis.data.push(item_date)
        this.baseFeeOptions.series[0].data.push(item.baseFee / Math.pow(10, 9))
      })
      this.drawLine(this.baseFeeOptions, 'baseFee')
    },
    // 挖矿排行-切换时间
    durationChange(val, tag) {
      switch (tag) {
        case 'baseFee':
          this.ruleForm.baseFee_duration = val
          this.getBaseFee()
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/css/mixin.less";

.card-title {
  border-left: 3px solid #5bfdff;
  padding-left: 16rem;
}
</style>
