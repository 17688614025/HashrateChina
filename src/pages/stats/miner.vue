<template>
  <div class="main">
    <!-- 第三部分 饼图 折线图 -->
    <el-row :gutter="20">
      <el-col :sm="24" :lg="24" class="mt-14">
        <el-card class="box-card">
          <div slot="header">
            <span class="card-title">矿工有效算力分布</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="24">
              <div ref="pie" :style="{ width: '100%', height: '400rem' }" />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="24" class="mt-14">
        <el-card class="box-card">
          <div slot="header">
            <span class="card-title">挖矿收益变化 (FIL/T)</span>
            <div class="fr">
              <el-radio-group
                v-model="ruleForm.rewardPerByte_duration"
                size="mini"
                class="isWebShow"
                @change="val => durationChange(val, 'rewardPerByte')"
              >
                <el-radio-button label="24h">24时</el-radio-button>
                <el-radio-button label="7d">7天</el-radio-button>
                <el-radio-button label="30d">30天</el-radio-button>
                <el-radio-button label="1y">1年</el-radio-button>
              </el-radio-group>
              <el-select
                v-model="ruleForm.rewardPerByte_duration"
                class="isAppShow mxw-150"
                size="mini"
                @change="val => durationChange(val, 'rewardPerByte')">
                <el-option label="24时" value="24h"/>
                <el-option label="7天" value="7d"/>
                <el-option label="30天" value="30d"/>
                <el-option label="1年" value="1y"/>
              </el-select>
            </div>
          </div>
          <el-row :gutter="20">
            <el-col :span="24">
              <div
                ref="rewardPerByte"
                :style="{ width: '100%', height: '400rem' }"
              />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="24" class="mt-14">
        <el-card class="box-card">
          <div slot="header">
            <span class="card-title">扇区质押量变化 (FIL/32GiB)</span>
            <div class="fr" style="margin-left: 20rem;">
              <el-radio-group
                v-model="ruleForm.sectorInitialPledge_duration"
                class="isWebShow"
                size="mini"
                @change="val => durationChange(val, 'sectorInitialPledge')"
              >
                <el-radio-button label="24h">24时</el-radio-button>
                <el-radio-button label="7d">7天</el-radio-button>
                <el-radio-button label="30d">30天</el-radio-button>
                <el-radio-button label="1y">1年</el-radio-button>
              </el-radio-group>
              <el-select
                v-model="ruleForm.sectorInitialPledge_duration"
                class="isAppShow mxw-150"
                size="mini"
                @change="val => durationChange(val, 'sectorInitialPledge')">
                <el-option label="24时" value="24h"/>
                <el-option label="7天" value="7d"/>
                <el-option label="30天" value="30d"/>
                <el-option label="1年" value="1y"/>
              </el-select>
            </div>
          </div>
          <el-row :gutter="20">
            <el-col :span="24">
              <div
                ref="sectorInitialPledge"
                :style="{ width: '100%', height: '400rem' }"
              />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  powerBrief,
  rewardPerByte,
  sectorInitialPledge
} from '@/utils/api'
import {
  formatDate,
  byteConvert,
  rgb
} from '@/utils/auth'
import { chartMixin } from '@/assets/js/chartMixin'
export default {
  mixins: [chartMixin],
  data: () => ({
    ruleForm: {
      rewardPerByte_duration: '24h',
      sectorInitialPledge_duration: '24h'
    },
    loading: {
      power: false,
      rich: false
    }
  }),
  computed: {
    pieOptions() {
      return require('@/assets/config/echartsConfig/Home/pie').default
    },
    rewardPerByteOptions() {
      return require('@/assets/config/echartsConfig/stats/rewardPerByte')
        .default
    },
    sectorInitialPledgeOptions() {
      return require('@/assets/config/echartsConfig/stats/sectorInitialPledge')
        .default
    }
  },
  mounted() {},
  methods: {
    initData() {
      this.getPowerBrief()
      this.getRewardPerByte()
      this.getSectorInitialPledge()
    },
    getPowerBrief() {
      const p = { count: 20 }
      // 有效算力拼图数据
      this.action(powerBrief, p, res => {
        this.showPieOptions(res)
      })
    },
    // 获取挖矿收益变化-折线图走势
    getRewardPerByte() {
      const p = { duration: this.ruleForm.rewardPerByte_duration, samples: 48 }
      this.action(rewardPerByte, p, res => {
        this.showRewardPerByteOptions(res)
      })
    },
    // 获取扇区质押量变化-折线图走势
    getSectorInitialPledge() {
      const p = {
        duration: this.ruleForm.sectorInitialPledge_duration,
        samples: 48
      }
      this.action(sectorInitialPledge, p, res => {
        this.showSectorInitialPledgeOptions(res)
      })
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
    // 显示挖矿收益变化折线图数据
    showRewardPerByteOptions(res) {
      this.rewardPerByteOptions.xAxis.data = []
      this.rewardPerByteOptions.series[0].data = []
      res.map(item => {
        const item_date = formatDate(item.timestamp)
        this.rewardPerByteOptions.xAxis.data.push(item_date)
        this.rewardPerByteOptions.series[0].data.push(
          byteConvert(item.rewardPerByte / 315.75754656747216, 'B', 4)
        )
      })
      this.drawLine(this.rewardPerByteOptions, 'rewardPerByte')
    },
    // 显示扇区质押量变化折线图数据
    showSectorInitialPledgeOptions(res) {
      this.sectorInitialPledgeOptions.xAxis.data = []
      this.sectorInitialPledgeOptions.series[0].data = []
      res.map(item => {
        const item_date = formatDate(item.timestamp)
        this.sectorInitialPledgeOptions.xAxis.data.push(item_date)
        this.sectorInitialPledgeOptions.series[0].data.push(
          byteConvert(item.initialPledge / 29098483.822067797, 'B', 4)
        )
      })
      this.drawLine(this.sectorInitialPledgeOptions, 'sectorInitialPledge')
    },
    // 挖矿排行-切换时间
    durationChange(val, tag) {
      switch (tag) {
        case 'rewardPerByte':
          this.ruleForm.rewardPerByte_duration = val
          this.getRewardPerByte()
          break
        case 'sectorInitialPledge':
          this.ruleForm.sectorInitialPledge_duration = val
          this.getSectorInitialPledge()
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
