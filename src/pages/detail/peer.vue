<template>
  <div>
    <!-- 修改签名 部分 -->
    <div class="nav">
      <span class="name">节点详情</span>
    </div>
    <!-- 所有区块 -->
    <el-row :gutter="20" class="mt-14">
      <el-col :span="24">
        <el-card class="box-card">
          <PhoneTable :table-data="tableData" :table-config="tableConfig"/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import PhoneTable from '@/components/PhoneTable'
import { chartMixin } from '@/assets/js/chartMixin'
import {
  getPeerDetail
} from '@/utils/api'
export default {
  components: {
    PhoneTable
  },
  mixins: [chartMixin],
  data: () => ({
    tableData: []
  }),
  computed: {
    query: {
      get() {
        return {
          id: this.$route.params.id
        }
      },
      set() {}
    },
    tableConfig: {
      get() {
        return require('@/assets/config/formConfig/detail/peerDetail').default
      },
      set() {}
    }
  },
  mounted() {
    console.log(this.query.id)
  },
  methods: {
    initData() {
      this.getPeerDetail()
    },
    // 消息
    getPeerDetail() {
      this.action(
        getPeerDetail,
        this.query,
        res => {
          if (res) {
            const _location = res.location
            const _ip = _location && _location.ip.split('.')
            this.tableData = [{
              ...res,
              multiAddresses: res.multiAddresses[0],
              miner: res.miners[0],
              flag: _location.flag,
              location: `${_location.continentName}-${_location.countryName}-${
                _location.regionName}-${_location.city}
              (${_ip[0]}.**.**.${_ip[3]})`
            }]
          }
        }
      )
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
