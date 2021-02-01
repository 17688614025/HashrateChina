<template>
  <div>
    <!-- 修改签名 部分 -->
    <div class="nav">
      <span class="name">账户 {{ path }}</span>
      <span v-if="addressDetail.tagName" class="tag">
        {{ addressDetail.tagName }}
        <el-tooltip v-if="addressDetail.tag.signed" placement="bottom-start">
          <div slot="content">加V表示账户已完成所有者的签名验证</div>
          <img src="@/assets/imgs/vip.png" alt="vip" >
        </el-tooltip>
      </span>
    </div>
    <!-- 第一部分 矿工概览 -->
    <el-row :gutter="20">
      <el-col :span="24" class="mt-14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card-title">账户概览</span>
          </div>
          <PhoneTable :table-data="addressDetail.accountList" :table-config="accountConfig"/>
        </el-card>
      </el-col>
    </el-row>
    <!-- 第二部分 账户变化 -->
    <el-row :gutter="20">
      <el-col :span="24" class="mt-14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card-title">账户变化</span>
            <div class="fr" style="margin-left: 20rem;">
              <el-radio-group
                v-model="ruleForm.addressBalanceStats_duration"
                size="mini"
                class="isWebShow"
                @change="val => durationChange(val, 'addressBalanceStats')"
              >
                <el-radio-button label="24h">24时</el-radio-button>
                <el-radio-button label="7d">7天</el-radio-button>
                <el-radio-button label="30d">30天</el-radio-button>
                <el-radio-button label="1y">1年</el-radio-button>
              </el-radio-group>
              <el-select
                v-model="ruleForm.addressBalanceStats_duration"
                class="isAppShow"
                size="mini"
                @change="val => durationChange(val, 'addressBalanceStats')">
                <el-option label="24时" value="24h"/>
                <el-option label="7天" value="7d"/>
                <el-option label="30天" value="30d"/>
                <el-option label="1年" value="1y"/>
              </el-select>
            </div>
          </div>
          <el-col :span="24">
            <div ref="addressBalanceStats" :style="{ width: '100%', height: '400rem' }" />
          </el-col>
        </el-card>
      </el-col>
    </el-row>
    <!-- 消息列表 -->
    <el-row :gutter="20" class="mt-14">
      <el-col :span="24">
        <el-card class="box-card power">
          <div slot="header" class="clearfix mt-14 power">
            <el-col :md="24" :lg="12" class="power-title">
              <span class="show-more fl">
                <el-link
                  v-for="(item, i) in powerLink"
                  :underline="false"
                  :key="i"
                  :class="ruleForm.activeTab === item.val ? 'active-class' : ''"
                  @click.native="activeTabChange(item.val)"
                >
                  {{ item.label }}&nbsp;
                </el-link>
              </span>
            </el-col>
            <el-col v-if="ruleForm.activeTab === 'Messages'" :lg="12" class="isWebShow">
              <el-select
                v-model="ruleForm.method"
                size="mini"
                class="fr"
                placeholder="请选择"
                @change="methodChange"
              >
                <el-option
                  v-for="(item, i) in options"
                  :key="i"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <div class="total">共 {{ total }} {{ ruleForm.activeTab==='Messages'?'条消息':ruleForm.activeTab==='Blocks'?'个区块':'条转账' }}</div>
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
import { chartMixin } from '@/assets/mixins/chartMixin'
import {
  getAddressDetail,
  addressBalanceStats,
  addressMessages,
  addressBlocks,
  addressTransfers
} from '@/utils/api'
import { toThousands, formatDate, byteConvert, dicSwitch, subStrCenter, switchUnit } from '@/utils/auth'
export default {
  components: {
    TableComponent,
    PhoneTable,
    Pagination
  },
  mixins: [chartMixin],
  data: () => ({
    tableData: [],
    addressDetail: {
      balanceList: [
        { label: '可用余额', val: '73.66 PiB' },
        { label: '扇区抵押', val: '73.66 PiB' },
        { label: '挖矿锁仓', val: '73.66 PiB' }
      ]
    },
    loading: {},
    total: 0,
    listQuery: {
      page: 0, // 与后台定义好的分页参数
      pageSize: 20
    },
    ruleForm: {
      activeTab: 'Messages',
      method: null,
      addressBalanceStats_duration: '24h'
    }
  }),
  computed: {
    path() {
      return this.$route.params.address
    },
    powerLink: {
      get() {
        return [
          { val: 'Messages', label: '消息列表 |' },
          { val: 'Transfers', label: '转账列表' }
        ]
      },
      set() {}
    },
    accountConfig: {
      get() {
        return require('@/assets/config/tableConfig/detail/accountConfig').default
      },
      set() {}
    },
    tableConfig: {
      get() {
        return require('@/assets/config/tableConfig/detail/richAddress' +
        this.ruleForm.activeTab).default
      },
      set() {}
    },
    options: {
      get() {
        return [
          { value: null, label: '全部' },
          { value: 'ChangeOwnerAddress', label: 'ChangeOwnerAddress' },
          { value: 'ChangeWorkerAddress', label: 'ChangeWorkerAddress' },
          { value: 'CreateMiner', label: 'CreateMiner' },
          { value: 'DeclareFaultsRecovered', label: 'DeclareFaultsRecovered' },
          { value: 'PreCommitSector', label: 'PreCommitSector' },
          { value: 'ProveCommitSector', label: 'ProveCommitSector' },
          { value: 'Send', label: 'Send' },
          { value: 'SubmitWindowedPoSt', label: 'SubmitWindowedPoSt' },
          { value: 'WithdrawBalance (miner)', label: 'WithdrawBalance (miner)' }
        ]
      },
      set() {}
    },
    minerAccountOptions() {
      return require('@/assets/config/echartsConfig/detail/minerAccount')
        .default
    },
    addressBalanceStatsOptions() {
      return require('@/assets/config/echartsConfig/detail/richAddressBalanceStats').default
    },
    addressPowerStatsOptions() {
      return require('@/assets/config/echartsConfig/detail/addressPowerStats').default
    }
  },
  watch: {
    path: {
      handler(n) {
        this.initData()
      },
      deep: true
    }
  },
  mounted() {
    console.log(this.path)
  },
  methods: {
    initData() {
      this.getAddressDetail()
      this.getaddressBalanceStats()
      this.activeTabChange(this.ruleForm.activeTab)
    },
    // 矿工概览
    getAddressDetail() {
      const p = { id: this.path }
      this.action(getAddressDetail, p, res => {
        this.addressDetail = {
          ...res,
          tagName: res.tag ? res.tag.name : '',
          // 账户概览
          accountList: [
            {
              address: res.address,
              actor: dicSwitch('actor', res.actor),
              id: res.id,
              balance: toThousands(res.balance, 4, 'FIL') + ' FIL',
              availableBalance: toThousands(res.multisig ? res.multisig.availableBalance : 0, 4, 'FIL') + ' FIL', needTips: '可用余额 = 账户余额 - 扇区抵押 - 挖矿锁仓',
              messageCount: res.messageCount,
              createTimestamp: formatDate(res.createTimestamp),
              lastSeenTimestamp: formatDate(res.lastSeenTimestamp),
              signers: res.multisig ? res.multisig.signers : ['N/A']
            }
          ]
        }
      })
    },
    // 获取账户变化折线图走势
    getaddressBalanceStats() {
      const p = { id: this.path, duration: this.ruleForm.addressBalanceStats_duration }
      this.action(addressBalanceStats, p, res => {
        this.showaddressBalanceStatsOptions(res)
      })
    },
    // 显示账户变化数据
    showaddressBalanceStatsOptions(res) {
      this.addressBalanceStatsOptions.xAxis.data = []
      this.addressBalanceStatsOptions.series[0].data = []
      res.map(item => {
        const item_date = formatDate(item.timestamp)
        this.addressBalanceStatsOptions.xAxis.data.push(item_date)
        this.addressBalanceStatsOptions.series[0].data.push(item.balance / Math.pow(10, 18))
      })
      this.drawLine(this.addressBalanceStatsOptions, 'addressBalanceStats')
    },
    // 消息，区块，转账列表
    getaddressMessages() {
      const apiObj = {
        Messages: addressMessages,
        Blocks: addressBlocks,
        Transfers: addressTransfers
      }
      const p = { ...this.listQuery,
        tab: this.ruleForm.activeTab,
        method: this.ruleForm.method,
        duration: this.ruleForm.duration, id: this.path }
      this.action(
        apiObj[this.ruleForm.activeTab],
        p,
        res => {
          this.total = res.totalCount
          switch (this.ruleForm.activeTab) {
            case 'Messages':
              this.tableData = res.messages
              this.options = [{ value: null, label: '全部' }]
              res.methods.map(item => {
                this.options.push({ value: item, label: item })
              })
              this.tableData.map(item => {
                item.timestamp = formatDate(item.timestamp)
                item.value = switchUnit(item.value, 4)
                item.exitCode = item.receipt && item.receipt.exitCode === 0 ? 'OK' : 'N/A'
              })
              break
            case 'Blocks':
              this.tableData = res.blocks
              this.tableData.map(item => {
                item.timestamp = formatDate(item.timestamp)
                item.reward = switchUnit(item.reward, 4)
                item.size = byteConvert(item.size)
              })
              break
            default:
              this.tableData = res.transfers
              this.tableData.map(item => {
                item.timestamp = formatDate(item.timestamp)
                item.value = switchUnit(item.value, 2)
                item.message = subStrCenter(item.message) || 'N/A'
                item.type = dicSwitch('type', item.type)
              })
              break
          }
        },
        this.loading.power
      )
    },
    // 挖矿排行-切换地区
    methodChange(val) {
      this.ruleForm.method = val
      this.getaddressMessages()
    },
    // 挖矿排行-切换Tab
    activeTabChange(val) {
      this.ruleForm.activeTab = val
      this.getaddressMessages()
    },
    // 挖矿排行-切换时间
    durationChange(val, tag) {
      switch (tag) {
        case 'addressBalanceStats':
          this.ruleForm.addressBalanceStats_duration = val
          this.getaddressBalanceStats()
          break
        default:
          break
      }
    },
    // 换页
    pageChange(item) {
      this.listQuery = {
        page: item.page,
        pageSize: item.limit
      }
      this.activeTabChange(this.ruleForm.activeTab) // 改变页码，重新渲染页面
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/css/mixin.less";

.nav {
  .tag {
    font-size: 12rem;
    padding: 3rem 14rem;
    margin: 0 20rem;
    border: 1px solid #fff;
    border-radius: 22rem;

    img {
      height: 12rem;
    }
  }
}

.box-card {
  .card-title {
    border-left: 3px solid #5bfdff;
    padding-left: 16rem;
  }
}

.power {
  .power-title {
    padding-left: 0 !important;
  }

  .power-table {
    height: auto;
  }
}

.total {
  float: left;
  width: 100%;
  margin-left: 20rem;
  margin-top: 20rem;
}
</style>
