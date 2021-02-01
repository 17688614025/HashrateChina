<template>
  <!-- 第四部分 排行榜 -->
  <el-row
    :gutter="20"
    class="mt-14">
    <el-col :span="24">
      <el-card class="box-card power">
        <div
          slot="header"
          class="clearfix">
          <span class="card-title">
            <!-- <i class="fa fa-list-ul" aria-hidden="true"></i> -->
            <img src="@/assets/imgs/dig.png" alt="dig">
            挖矿排行榜
          </span>
        </div>
        <div
          slot="header"
          class="clearfix mt-14 power">
          <el-col
            :md="24"
            :lg="12"
            class="power-title">
            <span class="show-more fl">
              <router-link
                v-for="(item, i) in powerLink"
                :to="`/ranks/${item.val}`"
                :key="i"
                :class="activeTab===item.val? 'active-class': ''"
                @click.native="activeTabChange(item.val)">
                {{ item.label }}&nbsp;
              </router-link>
            </span>
          </el-col>
          <el-col
            :lg="12"
            class="isWebShow">
            <div
              v-show="activeTab!=='power'"
              class="fr"
              style="margin-left: 20rem;">
              <el-radio-group
                v-model="ruleForm.duration"
                size="mini"
                @change="durationChange">
                <el-radio-button label="24h">24时</el-radio-button>
                <el-radio-button label="7d">7天</el-radio-button>
                <el-radio-button label="30d">30天</el-radio-button>
                <el-radio-button label="1y">1年</el-radio-button>
              </el-radio-group>
            </div>
            <el-select
              v-model="ruleForm.continent"
              size="mini"
              class="fr"
              placeholder="请选择"
              @change="continentChange">
              <el-option
                v-for="(item, i) in options"
                :key="i"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-col>
        </div>
        <el-row
          :gutter="20"
          class="power-table">
          <el-col :span="24">
            <TableComponent
              :loading="loading.power"
              :size="'mini'"
              :sort="true"
              :table-data="tableData"
              :table-config="tableConfig"
              class="isWebShow"/>
            <PhoneTable :bg="'bg'" :table-data="tableData" :table-config="tableConfig" class="isAppShow"/>
            <template>
              <Pagination
                v-if="total>0"
                :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.pageSize"
                :layout="'prev, pager, next, jumper'"
                @pagination="pageChange" />
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
import { allPowerList, allPowerGrowthList, allBlocksList, powerBrief } from '@/utils/api'
import { byteConvert } from '@/utils/auth'
export default {
  components: {
    TableComponent,
    PhoneTable,
    Pagination
  },
  data: () => ({
    tableData: [],
    powerBriefData: {},
    loading: {
      power: false
    },
    total: 0,
    listQuery: {
      page: 0, // 与后台定义好的分页参数
      pageSize: 50
    },
    ruleForm: {
      continent: null,
      duration: '24h'
    }
  }),
  computed: {
    activeTab: {
      get() {
        return this.$route.name || 'power'
      },
      set() {
      }
    },
    tableConfig: {
      get() {
        return require('@/assets/config/tableConfig/Home/' + this.activeTab).default
      },
      set() {
      }
    },
    options() {
      const arr = []
      const _options = ['全球', '亚洲', '欧洲', '非洲', '北美洲', '南美洲', '大洋洲']
      const _vals = [null, 'AS', 'EU', 'AF', 'NA', 'SA', 'OC']
      _options.map((item, i) => {
        arr.push({ value: _vals[i], label: item })
      })
      return arr
    },
    powerLink() {
      return [
        { val: 'power', label: '有效算力 |' },
        { val: 'blocks', label: '出块数 |' },
        { val: 'power-growth', label: '算力增速' }
      ]
    }
  },
  mounted() {
    this.initData()
  },

  methods: {
    initData() {
      this.getPowerBrief()
      this.activeTabChange(this.activeTab)
    },
    // 全网概览
    getPowerBrief() {
      const p = { count: 20 }
      this.action(powerBrief, p, (res) => {
        this.powerBriefData = res
      })
    },
    // 有效算力排行
    getallPowerList(val = {}) {
      const apiObj = {
        'power': allPowerList,
        'blocks': allBlocksList,
        'power-growth': allPowerGrowthList
      }

      if (val.tab === 'blocks') {
        const duration = {
          '7d': 'one_week',
          '30d': 'one_month',
          '1y': 'one_year'
        }
        val.duration = duration[val.duration] || '24h'
      }
      const p = { ...val, ...this.listQuery }
      this.action(apiObj[val.tab], p, (res) => {
        switch (val.tab) {
          case 'power':
            this.tableData = res.miners
            this.total = res.totalCount
            this.tableData.map(item => {
              if (this.powerBriefData.totalQualityAdjPower && item.qualityAdjPower) {
                item.percent = (item.qualityAdjPower / this.tableData[0].qualityAdjPower) * 100
                item.percentText = (item.qualityAdjPower / this.powerBriefData.totalQualityAdjPower) * 100
                item.ratio = byteConvert(item.qualityAdjPower) + ' / ' + item.percentText.toFixed(2) + '%'
              } else {
                item.percent = 0
                item.ratio = byteConvert(0) + ' / ' + (item.percent / 25).toFixed(2) + '%'
              }
              if (item.rawBytePower) {
                item.efficiency = ((item.totalRewards / Math.pow(10, 18)) / byteConvert(item.rawBytePower, 'TiB')).toFixed(2) + ' FIL/TiB'
              } else {
                item.efficiency = '0.00 FIL/TiB'
              }
              item.rawBytePowerDelta = byteConvert(item.rawBytePowerDelta)
              item.location = item.location ? item.location.countryName : 'N/A'
            })
            break
          case 'blocks':
            this.tableData = res.data.data
            this.total = res.data.pagination.total
            this.tableData.map(item => {
              item.percent = item.blocks_mined / this.tableData[0].blocks_mined * 100
              item.block_reward = item.block_reward + ' FIL'
            })
            break
          default:
            this.tableData = res.miners
            this.total = res.totalCount
            this.tableData.map(item => {
              item.growthPercent = (item.qualityAdjPowerGrowth / this.tableData[0].qualityAdjPowerGrowth) * 100
              item.growth = byteConvert(item.qualityAdjPowerGrowth) + ' / 天'
              item.equivalentMiners = item.equivalentMiners.toFixed(2)
              item.rawBytePowerGrowth = byteConvert(item.rawBytePowerGrowth)
              item.qualityAdjPower = byteConvert(item.qualityAdjPower)
              item.location = item.location ? item.location.countryName : 'N/A'
            })
            break
        }
      }, this.loading.power)
    },
    // 挖矿排行-切换地区
    continentChange(val) {
      this.ruleForm.continent = val
      this.getallPowerList({
        tab: this.activeTab,
        continent: val,
        duration: this.ruleForm.duration
      })
    },
    // 挖矿排行-切换时间
    durationChange(val) {
      this.ruleForm.duration = val
      this.getallPowerList({
        tab: this.activeTab,
        continent: this.ruleForm.continent,
        duration: val
      })
    },
    // 挖矿排行-切换Tab
    activeTabChange(val) {
      this.activeTab = val
      this.getallPowerList({
        tab: val,
        continent: this.ruleForm.continent,
        duration: this.ruleForm.duration
      })
    },
    // 换页
    pageChange(item) {
      this.listQuery = {
        page: item.page,
        pageSize: item.limit
      }
      this.activeTabChange(this.activeTab) // 改变页码，重新渲染页面
    },
    // 请求处理
    action(f, p, cb, loading) {
      loading = true
      f(p).then(res => {
        cb(res)
      }).catch(err => {
        console.log(err)
      }).finally(res => {
        loading = false
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/css/mixin.less";

.power {
  .power-title {
    padding-left: 0 !important;
  }

  .power-table {
    height: auto;
  }
}
</style>
