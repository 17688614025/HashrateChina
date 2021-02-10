<template>
  <div class="main">
    <!-- 第一部分 地球 全网概览 -->
    <el-row :gutter="20">
      <el-col :sm="24"
              :lg="12"
              class="mt-14">
        <Earth />
      </el-col>
      <el-col :sm="24"
              :lg="12"
              class="mt-14">
        <el-card class="box-card gaishu">
          <div slot="header">
            <span class="card-title">
              <i class="fa fa-globe"
                 aria-hidden="true" />
              全球概述
            </span>
          </div>
          <el-row :gutter="20"
                  class="innerbox">
            <el-col v-for="(o, i) in baseRecentConfig"
                    :span="8"
                    :key="i">
              <div class="gaishu-item mb-18">
                <p>{{ baseRecentData[o.prop] }}</p>
                <div class="item-label">
                  <span>{{ o.label }}</span>
                  <el-tooltip v-if="o.needTips"
                              placement="bottom">
                    <div slot="content">{{ o.needTips }}</div>
                    <i class="el-icon-info" />
                  </el-tooltip>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!-- 第二部分 柱状图 -->
    <el-row :gutter="20"
            class="mt-14">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header">
            <span class="card-title">
              <img src="@/assets/imgs/recent.png"
                   alt="recent">
              近半小时出块
            </span>
            <span class="show-time">
              最新区块时间：
              <span class="time">
                {{ latestTime }}
              </span>
              之前
            </span>
          </div>
          <el-row :gutter="20">
            <el-col :span="24">
              <div ref="latest"
                   :style="{ width: '100%', height: '350rem' }" />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!-- 第三部分 饼图 折线图 -->
    <el-row :gutter="20">
      <el-col :sm="24"
              :lg="12"
              class="mt-14">
        <el-card class="box-card">
          <div slot="header">
            <span class="card-title">
              <i class="el-icon-pie-chart"
                 aria-hidden="true" />
              有效算力
            </span>
            <router-link to="/stats/miner">
              <span class="show-more">更多</span>
            </router-link>
          </div>
          <el-row :gutter="20">
            <el-col :span="24">
              <div ref="pie"
                   :style="{ width: '100%', height: '400rem' }" />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :sm="24"
              :lg="12"
              class="mt-14">
        <el-card class="box-card">
          <div slot="header">
            <span class="card-title">
              <i class="fa fa-line-chart"
                 aria-hidden="true" />
              24gas走势
            </span>
            <router-link to="/stats/gas">
              <span class="show-more">更多</span>
            </router-link>
          </div>
          <el-row :gutter="20">
            <el-col :span="24">
              <div ref="baseFee"
                   :style="{ width: '100%', height: '400rem' }" />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!-- 第四部分 排行榜 -->
    <el-row :gutter="20"
            class="mt-14">
      <el-col :span="24">
        <el-card class="box-card power">
          <div slot="header"
               class="clearfix">
            <span class="card-title">
              <img src="@/assets/imgs/dig.png"
                   alt="dig">
              挖矿排行榜
            </span>
          </div>
          <div slot="header"
               class="clearfix mt-14 power">
            <el-col :xs="24"
                    :md="12"
                    :lg="12"
                    class="power-title">
              <span class="show-more fl">
                <el-link v-for="(item, i) in powerLink"
                         :underline="false"
                         :key="i"
                         :class="ruleForm.activeTab === item.val ? 'active-class' : ''"
                         @click="activeTabChange(item.val)">
                  <span :class="i ? 'powerTab' : 'noBorder powerTab'">
                    {{ item.label }}
                  </span>
                </el-link>
              </span>
            </el-col>
            <el-col :span="12"
                    class="isWebShow">
              <div v-show="ruleForm.activeTab !== 'power'"
                   class="fr"
                   style="margin-left: 20rem;">
                <el-radio-group v-model="ruleForm.duration"
                                size="mini"
                                @change="durationChange">
                  <el-radio-button label="24h">24时</el-radio-button>
                  <el-radio-button label="7d">7天</el-radio-button>
                  <el-radio-button label="30d">30天</el-radio-button>
                  <el-radio-button label="1y">1年</el-radio-button>
                </el-radio-group>
              </div>
              <el-select v-model="ruleForm.continent"
                         size="mini"
                         class="fr"
                         placeholder="请选择"
                         @change="continentChange">
                <el-option v-for="(item, i) in options"
                           :key="i"
                           :label="item.label"
                           :value="item.value" />
              </el-select>
            </el-col>
          </div>
          <el-row :gutter="20"
                  class="innerbox power-table">
            <el-col :span="24">
              <TableComponent :loading="loading.power"
                              :size="'mini'"
                              :max-h="860"
                              :sort="true"
                              :table-data="tableData"
                              :table-config="tableConfig" />
              <!-- class="isWebShow" -->
              <!-- <PhoneTable :bg="'bg'" :table-data="tableData" :table-config="tableConfig" class="isAppShow"/> -->
              <div class="center">
                <router-link :to="'/ranks/' + ruleForm.activeTab">
                  <span class="show-more">展示全部</span>
                </router-link>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!-- 第五部分 最新区块 富豪榜 -->
    <el-row :gutter="20">
      <el-col :sm="24"
              :lg="12"
              class="mt-14">
        <el-card class="box-card latest">
          <div slot="header"
               class="clearfix">
            <span class="card-title">
              <img src="@/assets/imgs/tipset.png"
                   alt="tipset">
              最新区块
            </span>
            <router-link to="/tipset">
              <span class="show-more">更多</span>
            </router-link>
          </div>
          <el-row :gutter="20"
                  class="innerbox">
            <el-col :span="24">
              <TableComponent :size="'mini'"
                              :table-data="recentListData"
                              :table-config="latestTableConfig" />
              <!-- class="isWebShow" -->
              <!-- <PhoneTable :bg="'bg'" :table-data="recentListData" :table-config="latestTableConfig" class="isAppShow"/> -->
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :sm="24"
              :lg="12"
              class="mt-14">
        <el-card class="box-card">
          <div slot="header">
            <span class="card-title">
              <img src="@/assets/imgs/rich.png"
                   alt="rich">富豪榜
            </span>
            <router-link to="/richList">
              <span class="show-more">更多</span>
            </router-link>
          </div>
          <el-row :gutter="20">
            <el-col :span="24">
              <TableComponent :size="'mini'"
                              :loading="loading.rich"
                              :sort="true"
                              :table-data="richListData"
                              :table-config="richListTableConfig" />
              <!-- class="isWebShow" -->
              <!-- <PhoneTable :bg="'bg'" :table-data="richListData" :table-config="richListTableConfig" class="isAppShow"/> -->
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
import Earth from '@/components/echarts_3D'
// import Earth from '@/components/Earth_3D'
import latestTableConfig from '@/assets/config/tableConfig/Home/latest'
import richListTableConfig from '@/assets/config/tableConfig/Home/richList'
import tableData from '@/assets/config/tableConfig/Home/powerData'
import { chartMixin } from '@/assets/js/chartMixin'
import {
  get_overview,
  get_calculate_info,
  getFil,
  richList,
  recentList,
  powerList,
  powerGrowthList,
  allBlocksList,
  baseFee,
  powerBrief
} from '@/utils/api'
import {
  toThousands,
  timestamp,
  formatDate,
  byteConvert,
  rgb
} from '@/utils/auth'
export default {
  components: {
    TableComponent,
    PhoneTable,
    Earth
  },
  mixins: [chartMixin],
  data: () => ({
    latestTableConfig,
    richListTableConfig,
    tableData, // 挖矿排行榜
    baseRecentData: [],
    baseFeeData: [],
    richListData: [],
    recentListData: [],
    powerBriefData: {},
    overviewData: {},
    getFilData: {},
    ruleForm: {
      activeTab: 'power',
      continent: null,
      duration: '24h'
    },
    loading: {
      power: false,
      rich: false
    },
    latestTime: 0
  }),
  computed: {
    options() {
      const arr = []
      const _options = [
        '全球',
        '亚洲',
        '欧洲',
        '非洲',
        '北美洲',
        '南美洲',
        '大洋洲'
      ]
      const _vals = [null, 'AS', 'EU', 'AF', 'NA', 'SA', 'OC']
      _options.map((item, i) => {
        arr.push({ value: _vals[i], label: item })
      })
      return arr
    },
    powerLink() {
      // 面板地址:http://127.0.0.1:8888/sMYn7H1r
      // 账号:NPdNVGzW
      // 密码:YUivZnIl
      return [
        { val: 'power', label: '有效算力' },
        { val: 'blocks', label: '出块数' },
        { val: 'power-growth', label: '算力增速' }
      ]
    },
    baseRecentConfig: {
      get() {
        return require('@/assets/config/formConfig/Home/baseRecent').default
      },
      set() { }
    },
    tableConfig: {
      get() {
        return require('@/assets/config/tableConfig/Home/' +
          this.ruleForm.activeTab).default
      },
      set() { }
    },
    latestOptions() {
      return require('@/assets/config/echartsConfig/Home/latestStack').default
    },
    pieOptions() {
      return require('@/assets/config/echartsConfig/Home/pie').default
    },
    baseFeeOptions() {
      return require('@/assets/config/echartsConfig/Home/baseFee').default
    }
  },
  watch: {
    // watch就是用来监控数据变化，只有变化了才会调用定时器的变化
    recentListData() {
      // 调用定时器
      this.latestTime = parseFloat(this.latestTime) - 1 + '秒'
      // this.timer()
    }
  },
  mounted() { },
  beforeRouteLeave(to, from, next) {
    // 销毁监听
    clearTimeout(this.timer)
    clearTimeout(this.intervalTimer)
    next()
  },
  methods: {
    initData() {
      // this.intervalTimer()
      this.getPowerBrief()
      this.getBaseFee()
      this.activeTabChange(this.ruleForm.activeTab)
      this.getRecentList()
      this.getRichList()
      this.getOverview()
    },
    // 获取全网概览
    getOverview() {
      this.action(get_calculate_info, {}, calculate_infores => {
        this.calculate_info = calculate_infores.data
        this.action(getFil, {}, getChainOverviewres => {
          this.getFilData = getChainOverviewres
          this.action(get_overview, {}, get_overviewres => {
            // this.overviewData = res.data.statistic
            this.overviewData = get_overviewres.data
            this.showBaseRecentData({
              ...this.recentListData[0],
              ...this.getFilData,
              ...this.calculate_info,
              ...this.overviewData
            })
          })
        })
      })
    },
    // 显示全网概述数据
    showBaseRecentData(res) {
      // console.log(res)
      this.baseRecentData = {
        ...res,
        time: this.latestTime + '前', // 最新区块时间
        height: toThousands(res.height), // 区块高度
        messageCount:
          res['24_h_message_number'] || toThousands(res.messageCount), // 24h消息数
        total_quality_power:
          res['Net_effective_computing_power'] ||
          byteConvert(res.total_quality_power) ||
          '2.001 EiB', // 全网有效算力
        active_miners: res.active_minaer || res.active_miners || '0', // 活跃矿工数
        latest_block_reward:
          ((res.latest_block_reward * 1).toFixed(4) || 18.9812) + ' FIL', // 最新赢票的奖励
        block_reward:
          res['Rewards_per_block'] || res.block_reward || '18.9812 FIL', // 每区块奖励
        total_rewards: toThousands(res.total_rewards, 2) + ' FIL', // 全网出块奖励
        fil_per_tera:
          res['24h_average_mining_income'] ||
          toThousands(res.fil_per_tera, 4) + ' FIL/TiB', // 24h平均挖矿收益
        pledge_collateral:
          res['FIL_pledge_amount'] || (res.pledge_collateral || 0) + ' FIL', // FIL质押量
        total_accounts: toThousands(
          res['General_ledger_number'] || res.total_accounts
        ), // 总账户数
        avg_block_time:
          res['Mean_block_interval'] || res.avg_block_time || 0 + ' 秒', // 平均区块间隔
        avg_blocks_in_tipset_str:
          res['Average_number_of_blocks_per_height'] ||
          res.avg_blocks_in_tipset_str ||
          0, // 平均每高度区块数量
        total_fil:
          res['FIL_total_supply'] ||
          toThousands(res.total_fil || 2000000000) + ' FIL', // FIL总供给量
        payment_1T: toThousands(res.payment_1T || 0, 4) + ' FIL', // 单T质押量
        preGas_1T: toThousands(res.preGas_1T || 0, 4) + ' FIL', // 单T Gas费
        total_1T: toThousands(res.total_1T || 0, 4) + ' FIL', // 每T扇区的总成本
        flow_rate:
          res['Circulating_rate_of_FIL'] ||
          (res.flow_rate || 0 * 100).toFixed(2) + '%', // FIL流通率
        price: res['The_latest_price'] || `$ ${res.price || 0}`, // 最新价格
        total_blocks: toThousands(res.total_blocks) || '1,840,282', // 全网出块数量
        power_ratio: byteConvert(res.power_ratio) || '706.13' + '/H' // 存储速度
        // avg_pledge: `${res.avg_pledge || 0} FIL`,
        // increase_power_per_day_str: `${res.increase_power_per_day_str || 0} TiB / 天` // 全网算力增速
      }
    },
    // 有效算力饼图数据
    getPowerBrief() {
      const p = { count: 20 }
      this.action(powerBrief, p, res => {
        this.powerBriefData = res
        this.showPieOptions(this.powerBriefData)
      })
    },
    // 获取基础费率-24gas折线图走势
    getBaseFee() {
      const p = { duration: '24h', samples: 48 }
      this.action(baseFee, p, res => {
        this.baseFeeData = res
        this.showbaseFeeOptions(this.baseFeeData)
      })
    },
    // 显示latest柱状图数据
    showLatestOptions(res) {
      this.latestOptions.xAxis[0].data = []
      this.latestOptions.series = []
      const seriesData = []
      res.map((item, i) => {
        this.latestOptions.xAxis[0].data.push(item.height)
        seriesData.push(0)
        const copySeriesData = JSON.parse(JSON.stringify(seriesData))
        if (item.blocks) {
          item.blocks.map((block, n) => {
            copySeriesData[i] = 1
            this.latestOptions.series.push({
              name: JSON.stringify({
                ...block,
                timestamp: formatDate(item.timestamp)
              }),
              type: 'bar',
              stack: 1,
              emphasis: {
                focus: 'series'
              },
              data: copySeriesData
            })
          })
        }
      })
      this.drawLine(this.latestOptions, 'latest', 'clickTrue')
    },
    // 显示Pie图数据
    showPieOptions(res) {
      this.pieOptions.legend.data = []
      this.pieOptions.series[0].data = []
      let qualityAdjPower = 0
      res.miners.map(item => {
        this.pieOptions.legend.data.push(item.address)
        qualityAdjPower += item.qualityAdjPower * 1
        this.pieOptions.series[0].data.push({
          value: byteConvert(item.qualityAdjPower, 'TiB'),
          name: item.address + (item.tag && `(${item.tag.name})`),
          itemStyle: { color: rgb() }
        })
      })
      this.pieOptions.series[0].data.push({
        value: byteConvert(res.totalQualityAdjPower - qualityAdjPower, 'TiB'),
        name: 'others',
        itemStyle: { color: '#9CBBFF' }
      })
      this.drawLine(this.pieOptions, 'pie')
    },
    // 显示折线图数据
    showbaseFeeOptions(res) {
      this.baseFeeOptions.xAxis.data = []
      this.baseFeeOptions.series[0].data = []
      res.map(item => {
        const item_date = formatDate(item.timestamp)
        this.baseFeeOptions.xAxis.data.push(item_date)
        this.baseFeeOptions.series[0].data.push(
          toThousands(item.baseFee, 3, 'nanoFIL')
        )
      })
      this.drawLine(this.baseFeeOptions, 'baseFee')
    },
    // 有效算力排行
    getPowerList(val = {}) {
      const apiObj = {
        power: powerList,
        blocks: allBlocksList,
        'power-growth': powerGrowthList
      }
      if (val.tab === 'blocks') {
        const duration = {
          '7d': 'one_week',
          '30d': 'one_month',
          '1y': 'one_year'
        }
        val.duration = duration[val.duration] || '24h'
      }
      const p = { ...val, count: 20, page: 0, pageSize: 20 }
      this.action(
        apiObj[val.tab],
        p,
        res => {
          switch (val.tab) {
            case 'power':
              this.tableData = res.miners
              this.total = res.totalCount
              this.tableData.map(item => {
                if (
                  this.powerBriefData.totalQualityAdjPower &&
                  item.qualityAdjPower
                ) {
                  item.percent =
                    (item.qualityAdjPower / this.tableData[0].qualityAdjPower) *
                    100
                  item.percentText =
                    (item.qualityAdjPower /
                      this.powerBriefData.totalQualityAdjPower) *
                    100
                  item.ratio =
                    byteConvert(item.qualityAdjPower) +
                    ' / ' +
                    item.percentText.toFixed(2) +
                    '%'
                } else {
                  item.percent = 0
                  item.ratio =
                    byteConvert(0) +
                    ' / ' +
                    (item.percent / 25).toFixed(2) +
                    '%'
                }
                if (item.rawBytePower) {
                  item.efficiency =
                    (
                      item.totalRewards /
                      Math.pow(10, 18) /
                      byteConvert(item.rawBytePower, 'TiB')
                    ).toFixed(2) + ' FIL/TiB'
                } else {
                  item.efficiency = '0.00 FIL/TiB'
                }
                item.rawBytePowerDelta = byteConvert(item.rawBytePowerDelta)
                item.location = item.location
                  ? item.location.countryName
                  : 'N/A'
              })
              break
            case 'blocks':
              this.tableData = res.data.data
              this.total = res.data.pagination.total
              this.tableData.map(item => {
                item.percent =
                  (item.blocks_mined / this.tableData[0].blocks_mined) * 100
                item.block_reward = item.block_reward + ' FIL'
              })
              break
            default:
              this.tableData = res.miners
              this.total = res.totalCount
              this.tableData.map(item => {
                item.growthPercent =
                  (item.qualityAdjPowerGrowth /
                    this.tableData[0].qualityAdjPowerGrowth) *
                  100
                item.growth = byteConvert(item.qualityAdjPowerGrowth) + ' / 天'
                item.equivalentMiners = item.equivalentMiners.toFixed(2)
                item.rawBytePowerGrowth = byteConvert(item.rawBytePowerGrowth)
                item.qualityAdjPower = byteConvert(item.qualityAdjPower)
                item.location = item.location
                  ? item.location.countryName
                  : 'N/A'
              })
              break
          }
        },
        this.loading.power
      )
    },
    // 最新区块
    getRecentList() {
      const p = { count: 60 }
      this.action(recentList, p, res => {
        this.recentListData = res.slice(0, 10)
        // 最新区块时间
        this.latestTime = timestamp(this.recentListData[0].timestamp).split(
          '前'
        )[0]
        this.recentListData.map(item => {
          item.height = item.height
          item.time = timestamp(item.timestamp)
        })
        this.showLatestOptions(res)
      })
    },
    // 富豪榜
    getRichList() {
      const p = { pageSize: 10 }
      this.action(
        richList,
        p,
        res => {
          this.richListData = res.richList
          this.richListData.map(item => {
            item.balancePercent =
              (item.availableBalance / item.balance).toFixed(2) + '%'
            item.balance = toThousands(item.balance, 0, 'FIL') + ' FIL'
          })
        },
        this.loading.rich
      )
    },
    // 挖矿排行-切换地区
    continentChange(val) {
      this.ruleForm.continent = val
      this.getPowerList({
        tab: this.ruleForm.activeTab,
        continent: val,
        duration: this.ruleForm.duration
      })
    },
    // 挖矿排行-切换时间
    durationChange(val) {
      this.ruleForm.duration = val
      this.getPowerList({
        tab: this.ruleForm.activeTab,
        continent: this.ruleForm.continent,
        duration: val
      })
    },
    // 挖矿排行-切换Tab
    activeTabChange(val) {
      this.ruleForm.activeTab = val
      this.getPowerList({
        tab: val,
        continent: this.ruleForm.continent,
        duration: this.ruleForm.duration
      })
    },
    // 定时器
    timer() {
      return setTimeout(() => {
        this.getRecentList()
      }, 30000)
    },
    // 定时器
    intervalTimer() {
      return setInterval(() => {
        this.latestTime = timestamp(parseFloat(this.latestTime) + 1).split(
          '前'
        )[0]
        this.showBaseRecentData({
          ...this.recentListData[0],
          ...this.getFilData,
          ...this.calculate_info,
          ...this.overviewData
        })
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
.main {
  @import "../../assets/css/mixin.less";

  .power,
  .latest,
  .gaishu {
    .gaishu-item {
      text-align: center;
      min-height: 80rem;
      background: #041626;
      border: 1px solid #062437;
      border-radius: 10px;
      box-shadow: 0 0 4px #062437;

      &:hover {
        box-shadow: 0 0 4px #888;
        cursor: pointer;
      }

      p {
        font-size: 20rem;
        font-weight: bold;
        color: #5bfdff;
        margin: 15rem 0 5rem;
      }

      .item-label {
        span {
          font-size: 12rem;
          color: #ccc;
        }
      }
    }

    .power-title {
      padding-left: 0 !important;

      .powerTab {
        padding: 0 10rem;
        border-left: 1px solid #ccc;
      }

      .noBorder {
        border: none;
      }
    }

    .power-table {
      height: auto;
      max-height: 860rem;
    }
  }

  .center {
    text-align: center;
    width: 100%;
    height: 30rem;
    margin-top: 30rem;

    .show-more {
      float: none;
    }
  }

  .show-time {
    float: right;
    font-size: 14rem;

    .time {
      font-size: 24rem;
      color: #ff9c00;
    }
  }
}
</style>
