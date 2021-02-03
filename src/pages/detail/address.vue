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
      <span class="changeTag" @click="changeTag">修改签名 ></span>
      <ChangeTag ref="editTag"/>
    </div>
    <!-- 第一部分 矿工概览 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="card-title">
          矿工概览
        </span>
      </div>
      <el-row :gutter="20">
        <el-col :sm="24" :lg="12" class="mt-14">
          <div class="item">
            <el-col :xs="10" :sm="10" :lg="10">
              <div
                ref="minerAccount"
                :style="{ width: '100%', height: '190rem' }"
              />
            </el-col>
            <el-col :xs="14" :sm="14" :lg="14">
              <p>账户余额</p>
              <el-row :gutter="10" class="item-title">
                <el-col :span="24">{{ addressDetail.balance }}</el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col
                  v-for="(tag, i) in addressDetail.balanceList"
                  :span="24"
                  :key="i"
                ><span class="bold">{{ tag.label }}</span>
                  <el-tooltip v-if="tag.needTips" placement="top">
                    <div slot="content" class="mxw-200">{{ tag.needTips }}</div>
                    <i class="el-icon-info" />
                </el-tooltip>： {{ tag.val }}</el-col
                >
              </el-row>
            </el-col>
          </div>
        </el-col>
        <el-col :sm="24" :lg="12" class="mt-14">
          <div class="item">
            <p>有效算力</p>
            <el-row :gutter="10" class="item-title">
              <el-col :lg="12">{{ addressDetail.qualityAdjPower }}</el-col>
              <el-col :xs="12" :lg="8">占比: {{ addressDetail.percent }}</el-col>
              <el-col :xs="12" :lg="4">排名: {{ addressDetail.rawBytePowerRank }}</el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col
                v-for="(tag, i) in addressDetail.powerList"
                :sm="24"
                :lg="tag.label==='扇区状态'?24:12"
                :key="i"
              ><span class="bold">{{ tag.label }}</span>
                <el-tooltip v-if="tag.needTips" placement="top">
                  <div slot="content" class="mxw-200">{{ tag.needTips }}</div>
                  <i class="el-icon-info" />
                </el-tooltip>：
                <template v-if="tag.label==='扇区状态'">
                  <span>{{ tag.val.live }} 全部，</span>
                  <span class="green">{{ tag.val.active }} 有效，</span>
                  <span class="red">{{ tag.val.faulty }} 错误，</span>
                  <span class="yellow">{{ tag.val.recovering }} 恢复中</span>
                </template>
                <template v-else>
                  {{ tag.val }}
                </template>
              </el-col>
            </el-row>
          </div>
      </el-col></el-row
      >
    </el-card>
    <!-- 第二部分 挖矿统计 -->
    <el-row :gutter="20">
      <el-col :span="24" class="mt-14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card-title">挖矿统计</span>
            <div class="fr" style="margin-left: 20rem;">
              <el-radio-group
                v-model="ruleForm.addressMiningStats_duration"
                size="mini"
                class="isWebShow"
                @change="val => durationChange(val, 'addressMiningStats')"
              >
                <el-radio-button label="24h">24时</el-radio-button>
                <el-radio-button label="7d">7天</el-radio-button>
                <el-radio-button label="30d">30天</el-radio-button>
                <el-radio-button label="1y">1年</el-radio-button>
              </el-radio-group>
              <el-select
                v-model="ruleForm.addressMiningStats_duration"
                class="isAppShow"
                size="mini"
                @change="val => durationChange(val, 'addressMiningStats')">
                <el-option label="24时" value="24h"/>
                <el-option label="7天" value="7d"/>
                <el-option label="30天" value="30d"/>
                <el-option label="1年" value="1y"/>
              </el-select>
            </div>
          </div>
          <el-row :gutter="10" class="minerStats">
            <el-col
              v-for="(tag, i) in addressMiningStatsList"
              :sm="12"
              :lg="8"
              :key="i"
            ><span class="bold">{{ tag.label }}</span>
              <el-tooltip v-if="tag.needTips" placement="top">
                <div slot="content" class="mxw-200">{{ tag.needTips }}</div>
                <i class="el-icon-info" />
            </el-tooltip>： {{ tag.val }}</el-col
            >
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!-- 第三部分 账户变化 算力变化 -->
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12" class="mt-14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card-title">账户变化</span>
          </div>
          <el-col :span="24">
            <div ref="addressBalanceStats" :style="{ width: '100%', height: '400rem' }" />
          </el-col>
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="12" class="mt-14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card-title">算力变化</span>
          </div>
          <el-col :span="24">
            <div ref="addressPowerStats" :style="{ width: '100%', height: '400rem' }" />
          </el-col>
        </el-card>
      </el-col>
    </el-row>
    <!-- 第四部分 账户概览 -->
    <el-row :gutter="20">
      <el-col :span="24" class="mt-14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card-title">账户概览</span>
          </div>
          <PhoneTable :val_class="'fr'" :span="12" :table-data="addressDetail.accountList" :table-config="minerStatsConfig"/>
        </el-card>
      </el-col>
    </el-row>
    <!-- 第五部分 消息列表 -->
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
import ChangeTag from '@/components/ChangeTag' // 引入修改标签
import { chartMixin } from '@/assets/js/chartMixin'
import {
  getAddressDetail,
  addressMiningStats,
  addressBalanceStats,
  addressPowerStats,
  addressMessages,
  addressBlocks,
  addressTransfers
} from '@/utils/api'
import { toThousands, formatDate, byteConvert, dicSwitch, subStrCenter, switchUnit } from '@/utils/auth'
export default {
  components: {
    TableComponent,
    PhoneTable,
    Pagination,
    ChangeTag
  },
  mixins: [chartMixin],
  data: () => ({
    tableData: [],
    addressDetail: {
      powerList: [
        { label: '原值算力', val: '73.66 PiB' },
        { label: '累计出块份数', val: '73.66 PiB' },
        { label: '累计出块奖励', val: '73.66 PiB' },
        { label: '扇区大小', val: '73.66 PiB' },
        { label: '扇区状态', val: '73.66 PiB' }
      ],
      balanceList: [
        { label: '可用余额', val: '73.66 PiB' },
        { label: '扇区抵押', val: '73.66 PiB' },
        { label: '挖矿锁仓', val: '73.66 PiB' }
      ]
    },
    addressMiningStatsList: [
      { label: '算力增量', val: '73.66 PiB' },
      { label: '算力增速', val: '73.66 PiB' },
      { label: '矿机当量', val: '73.66 PiB' },
      { label: '出块数量', val: '73.66 PiB' },
      { label: '出块份数', val: '73.66 PiB' },
      { label: '出块奖励 (占比)', val: '73.66 PiB' },
      { label: '挖矿效率', val: '73.66 PiB' },
      { label: '抽查成本', val: '73.66 PiB' },
      { label: '幸运值', val: '73.66 PiB' }
    ],
    loading: {},
    total: 0,
    listQuery: {
      page: 0, // 与后台定义好的分页参数
      pageSize: 20
    },
    ruleForm: {
      activeTab: 'Messages',
      method: null,
      addressMiningStats_duration: '24h'
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
          { val: 'Blocks', label: '区块列表 |' },
          { val: 'Transfers', label: '转账列表' }
        ]
      },
      set() {}
    },
    tableConfig: {
      get() {
        return require('@/assets/config/tableConfig/detail/address' +
        this.ruleForm.activeTab).default
      },
      set() {}
    },
    minerStatsConfig() {
      return require('@/assets/config/formConfig/detail/minerStats').default
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
      return require('@/assets/config/echartsConfig/detail/addressBalanceStats').default
    },
    addressPowerStatsOptions() {
      return require('@/assets/config/echartsConfig/detail/addressPowerStats').default
    }
  },
  mounted() {
    console.log(this.path)
  },
  methods: {
    initData() {
      this.getAddressDetail()
      this.getaddressMiningStats()
      this.getaddressBalanceStats()
      this.getaddressPowerStats()
      this.activeTabChange(this.ruleForm.activeTab)
    },
    // 矿工概览
    getAddressDetail() {
      const p = { id: this.path }
      this.action(getAddressDetail, p, res => {
        const _location = res.miner && res.miner.location
        const _ip = _location && _location.ip.split('.')
        this.addressDetail = {
          ...res,
          tagName: res.tag ? res.tag.name : '',
          balance: toThousands(res.balance, 4, 'FIL') + ' FIL',
          qualityAdjPower: byteConvert(res.miner.qualityAdjPower),
          percent: ((res.miner.qualityAdjPower / res.miner.networkQualityAdjPower) * 100).toFixed(2) + '%',
          rawBytePowerRank: res.miner.rawBytePowerRank,
          balanceList: [
            { label: '可用余额', val: toThousands(res.miner.availableBalance, 4, 'FIL') + ' FIL', needTips: '可用余额 = 账户余额 - 扇区抵押 - 挖矿锁仓' },
            { label: '扇区抵押', val: toThousands(res.miner.sectorPledgeBalance, 4, 'FIL') + ' FIL' },
            { label: '挖矿锁仓', val: toThousands(res.miner.vestingFunds, 4, 'FIL') + ' FIL' }
          ],
          powerList: [
            { label: '原值算力', val: byteConvert(res.miner.qualityAdjPower) },
            { label: '累计出块份数', val: res.miner.weightedBlocksMined,
              needTips: 'Filecoin挖矿模型中，一个高度（tipset）下可能有多个区块（block），每个区块可能获得多份奖励（win count）。累计出块份数=每次出块获得奖励份数的总和' },
            { label: '累计出块奖励', val: toThousands(res.miner.totalRewards, 2, 'FIL') + ' FIL' },
            { label: '扇区大小', val: byteConvert(res.miner.sectorSize) },
            { label: '扇区状态', val: {
              live: toThousands(res.miner.sectors.live),
              active: toThousands(res.miner.sectors.active),
              faulty: toThousands(res.miner.sectors.faulty),
              recovering: toThousands(res.miner.sectors.recovering)
            }}
          ],
          // 账户概览
          accountList: [
            {
              robust: res.robust,
              peerId: res.miner.peerId,
              messageCount: res.messageCount,
              owner: res.miner.owner.address,
              actor: dicSwitch('actor', res.actor),
              worker: res.miner.worker.address,
              createTimestamp: formatDate(res.createTimestamp),
              _location: _location ? `${_location.continentName}-${_location.countryName}-${_location.city}(${_ip[0]}.**.**.${_ip[3]})` : '未知' }
          ]
        }
        this.showminerAccountOptions(res)
      })
    },
    // 显示minerAccount图数据
    showminerAccountOptions(res) {
      this.minerAccountOptions.series[0].data = [
        { value: res.miner.availableBalance, name: '可用余额' },
        { value: res.miner.sectorPledgeBalance, name: '扇区抵押' },
        { value: res.miner.vestingFunds, name: '挖矿锁仓' }
      ]
      this.drawLine(this.minerAccountOptions, 'minerAccount')
    },
    // 挖矿统计
    getaddressMiningStats() {
      const p = { id: this.path, duration: this.ruleForm.addressMiningStats_duration }
      this.action(addressMiningStats, p, res => {
        if (res) {
          this.addressMiningStatsList = [
            { label: '算力增量', val: byteConvert(res.qualityAdjPowerDelta) },
            { label: '算力增速', val: byteConvert(res.qualityAdjPowerGrowth) + ' / 天' },
            { label: '矿机当量', val: res.equivalentMiners.toFixed(2), needTips: '以官方Benchmark推荐配置（AMD Ryzen Threadripper 3970X、NVidia GTX 2080Ti、128GB 2133mhz）视为1台基准矿机，矿机当量为该矿工换算成标准矿机的数量（矿工的算力增速与该基准矿机增速的比值）。' },
            { label: '出块数量', val: res.blocksMined, needTips: '出块数 = 挖矿出块数量（block）的总和' },
            { label: '出块份数', val: res.weightedBlocksMined, needTips: 'Filecoin挖矿模型中，一个高度（tipset）下可能有多个区块（block），每个区块可能获得多份奖励（win count）。累计出块份数=每次出块获得奖励份数的总和' },
            { label: '出块奖励 (占比)', val: `${toThousands(res.totalRewards, 4, 'FIL')} FIL (${(res.totalRewards / res.networkTotalRewards * 100).toFixed(2)}%)` },
            { label: '挖矿效率', val: '0.8836 FIL/TiB', needTips: '选定周期内，矿工累计出块奖励与有效算力的比值' },
            { label: '抽查成本', val: '0.0001 FIL/TiB', needTips: '选定周期内，矿工累计抽查手续费与有效算力的比值' },
            { label: '幸运值', val: (res.luckyValue * 100).toFixed(2) + '%', needTips: '实际爆块数量和理论爆块数量的比值。若矿工有效算力低于1PiB，则该值存在较大随机性，仅供参考。' }
          ]
        }
      })
    },
    // 获取账户变化折线图走势
    getaddressBalanceStats() {
      const p = { id: this.path }
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
        this.addressBalanceStatsOptions.series[1].data.push(item.availableBalance / Math.pow(10, 18))
        this.addressBalanceStatsOptions.series[2].data.push(item.sectorPledgeBalance / Math.pow(10, 18))
        this.addressBalanceStatsOptions.series[3].data.push(item.vestingFunds / Math.pow(10, 18))
      })
      this.drawLine(this.addressBalanceStatsOptions, 'addressBalanceStats')
    },
    // 获取算力变化折线图走势
    getaddressPowerStats() {
      const p = { id: this.path }
      this.action(addressPowerStats, p, res => {
        res && this.showaddressPowerStatsOptions(res)
      })
    },
    // 显示算力变化数据
    showaddressPowerStatsOptions(res) {
      this.addressPowerStatsOptions.xAxis.data = []
      this.addressPowerStatsOptions.series[0].data = []
      res.map(item => {
        const item_date = formatDate(item.timestamp)
        this.addressPowerStatsOptions.xAxis.data.push(item_date)
        this.addressPowerStatsOptions.series[0].data.push(byteConvert(item.qualityAdjPower, 'TiB', 4))
        this.addressPowerStatsOptions.series[1].data.push(byteConvert(item.qualityAdjPowerDelta, 'TiB', 4))
      })
      this.drawLine(this.addressPowerStatsOptions, 'addressPowerStats')
    },
    // 修改标签
    changeTag() {
      this.$refs.editTag.show()
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
                // item.from = (subStrCenter(item.from) || 'N/A') + (item.toTag ? `(${item.toTag.name} ${item.toTag.signed && 'V'})` : '')
                // item.to = (subStrCenter(item.to) || 'N/A') + ' =>'
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
      console.log(val)
      this.ruleForm.method = val
      this.getaddressMessages()
    },
    // 挖矿排行-切换时间
    durationChange(val, tag) {
      switch (tag) {
        case 'addressMiningStats':
          this.ruleForm.addressMiningStats_duration = val
          this.getaddressMiningStats()
          break
        default:
          break
      }
    },
    // 挖矿排行-切换Tab
    activeTabChange(val) {
      console.log(val)
      this.ruleForm.activeTab = val
      this.getaddressMessages()
    },
    // 换页
    pageChange(item) {
      console.log(item)
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
  line-height: 60rem;

  .name {
    font-size: 22rem;
  }

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

  .changeTag {
    font-size: 15rem;
    color: #5bfdff;
    vertical-align: bottom;
    cursor: pointer;
  }
}

.box-card {
  .card-title {
    border-left: 3px solid #5bfdff;
    padding-left: 16rem;
  }

  .item {
    padding: 25rem 40rem;
    line-height: 39rem;
    background: #041e34;
    border: 1px solid #062437;
    border-radius: 10px;
    overflow: hidden;

    p {
      font-size: 14rem;
    }

    .item-title {
      .el-col:first-child {
        font-size: 30rem;
        color: #5bfdff;
      }
    }
  }
}

.minerStats {
  padding: 25rem 40rem;
  line-height: 39rem;
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

.green {
  color: green;
}

.red {
  color: red;
}

.yellow {
  color: #ff9c00;
}

.bold {
  font-weight: bold;
}
</style>
