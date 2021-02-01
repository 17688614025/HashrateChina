<template>
  <el-table
    v-loading="loading"
    :size="size"
    :data="tableData"
    :max-height="maxH"
    :header-cell-style="headerCellStyle"
    :row-style="cellStyle"
    :cell-style="cellStyle"
    style="width: 100%;"
  >
    <el-table-column v-if="sort" type="index" label="排名" width="50">
      <template slot-scope="scope">
        <el-image
          v-if="scope.$index < 3"
          :src="src[scope.$index]"
          class="img"
        />
        <span v-else>{{ scope.$index + 1 }}</span>
      </template>
    </el-table-column>
    <el-table-column
      v-for="(item, i) in tableConfig"
      :key="i"
      :min-width="item.width"
      :width="item.w"
    >
      <template slot="header">
        <span>{{ item.label }}</span>
        <el-tooltip v-if="item.needTips" placement="top">
          <div slot="content">{{ item.needTips }}</div>
          <i class="el-icon-info" />
        </el-tooltip>
      </template>
      <template slot-scope="scope">
        <router-link
          v-if="item.linkUrl && item.type!=='Array'"
          :to="item.linkUrl + scope.row[item.prop]"
          class="link"
        >
          {{ subStrCenter(scope.row[item.prop]) }}
        </router-link>
        <div v-else-if="item.progress" class="progress">
          <el-progress
            :show-text="false"
            :percentage="scope.row[item.progress]"
            :color="customColor"
            :format="format"
            :stroke-width="5"
          />
          <span>{{ scope.row[item.prop] }}</span>
        </div>
        <!-- 主页 高度 -->
        <div v-else-if="['time'].includes(item.linkType)">
          <router-link :to="item.linkUrl + scope.row[item.prop]" class="link">
            {{ scope.row[item.prop] }}</router-link
            >
          <div>{{ scope.row[item.linkType] }}</div>
        </div>
        <!-- 转账 发送方 -->
        <div v-else-if="['fromTag'].includes(item.linkType)">
          <router-link :to="item.linkUrl + scope.row[item.prop]" class="link">
            {{ subStrCenter(scope.row[item.prop] || 'N/A') }}</router-link
            >
          <span v-if="scope.row[item.linkType]" class="fromTag">
            {{ scope.row[item.linkType].name }}
          </span>
          <img src="@/assets/imgs/from.png" alt="from" class="vipImg">
        </div>
        <!-- 转账 接收方 -->
        <div v-else-if="['toTag'].includes(item.linkType)">
          <router-link :to="item.linkUrl + scope.row[item.prop]" class="link">
            {{ subStrCenter(scope.row[item.prop] || 'N/A') }}</router-link
            >
          <span v-if="scope.row[item.linkType]" class="toTag">
            {{ scope.row[item.linkType].name }}
            <el-tooltip v-if="scope.row[item.linkType].signed" placement="bottom-start">
              <div slot="content">加V表示账户已完成所有者的签名验证</div>
              <img src="@/assets/imgs/vip.png" alt="vip" class="vipImg">
            </el-tooltip>
          </span>
        </div>
        <div v-else-if="['tag'].includes(item.tag)">
          <div v-if="scope.row[item.tag]">
            {{ subStrCenter(scope.row[item.tag].name) }}
            <el-tooltip
              v-show="scope.row[item.tag].signed"
              placement="bottom-start"
            >
              <div slot="content">加V表示账户已完成所有者的签名验证</div>
              <img src="@/assets/imgs/vip.png" alt="vip" class="vipImg">
              <!-- <i class="fa fa-vimeo lable-v" /> -->
            </el-tooltip>
          </div>
          <div v-else>--</div>
        </div>
        <div v-else-if="['totalRewards'].includes(item.linkType)">
          {{ toThousands(scope.row[item.linkType], 2, "FIL") }} FIL
        </div>
        <!-- 区块id -->
        <div
          v-else-if="
            ['cid', 'miner', 'minerTag', 'messageCount', 'reward'].includes(
              item.linkType
            )
          "
        >
          <div v-for="(b, i) in scope.row[item.prop]" :key="i">
            <div v-if="b[item.linkType]">
              <router-link
                v-if="['cid', 'miner'].includes(item.linkType)"
                :to="item.linkUrl + b[item.linkType]"
                class="link"
              >
                {{ subStrCenter(b[item.linkType]) }}
              </router-link>
              <span v-else-if="['minerTag'].includes(item.linkType)">
                {{ subStrCenter(b[item.linkType].name) }}
                <el-tooltip
                  v-show="b[item.linkType].signed"
                  placement="bottom-start"
                >
                  <div slot="content">加V表示账户已完成所有者的签名验证</div>
                  <img src="@/assets/imgs/vip.png" alt="vip" class="vipImg">
                  <!-- <i class="fa fa-vimeo-square lable-v" /> -->
                </el-tooltip>
              </span>
              <span v-else-if="['reward'].includes(item.linkType)">
                {{ toThousands(b[item.linkType], 2, "FIL") }} FIL
              </span>
              <span v-else>
                {{ subStrCenter(b[item.linkType]) }}
              </span>
            </div>
            <div v-else>
              <span>{{
                ["minerTag"].includes(item.linkType) ? "--" : "N/A"
              }}</span>
            </div>
          </div>
        </div>
        <span v-else>{{ scope.row[item.prop] }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { subStrCenter, toThousands } from '@/utils/auth'
export default {
  filters: {
    rounding(value) {
      return value.toFixed(2)
    }
  },
  props: {
    size: {
      type: String,
      default: 'mini'
    },
    maxH: {
      type: Number,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    sort: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    tableConfig: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data: () => ({
    customColor: '#5BFDFF',
    src: [
      require('@/assets/imgs/first.png'),
      require('@/assets/imgs/second.png'),
      require('@/assets/imgs/third.png')
    ]
  }),
  computed: {
    headerCellStyle() {
      return {
        background: '#031321',
        color: '#ccc',
        'text-align': 'center',
        'border-bottom': '1px solid #1F2F3D'
      }
    },
    cellStyle() {
      return { 'font-size': '12rem', ...this.headerCellStyle }
    }
  },
  mounted() {},
  methods: {
    subStrCenter,
    toThousands,
    format(percentage) {
      return percentage === 100 ? '满' : `71.11PiB/${percentage}%`
    }
  }
}
</script>

<style lang="less" scoped>
/* 滚动条的宽度 */
/deep/ .el-table__body-wrapper::-webkit-scrollbar {
  /* 横向滚动条 */
  width: 6rem;
  // 纵向滚动条 必写
  height: 6rem;
  border-radius: 10rem;
  box-shadow: inset 0 0 5px #354450;
  background-color: #031321;
  opacity: 0.6;
}

/* 滚动条的滑块 */
/deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 5px #354450;
  border-radius: 10rem;
  background-color: #354450;
  opacity: 0.3;
}

/deep/.el-table__empty-block {
  background-color: #031321;
  color: #ccc;
}

/deep/.el-table--border::after,
.el-table--group::after,
.el-table::before {
  content: "";
  position: absolute;
  background-color: #1f2f3d;
  z-index: 1;
}

.progress {
  text-align: left;

  span {
    margin-left: 15rem;
  }
}

/deep/.el-progress {
  width: 140rem;
  float: left;
  margin-top: 8rem;
  margin-left: 15%;
}

/deep/.el-progress-bar__outer {
  background-color: #354450;
}

/deep/.el-table .cell {
  white-space: pre;
}

.link {
  &:hover {
    color: #fff;
  }
}

.lable-v {
  font-size: 18rem;
  color: #5bfdff;
}

.vipImg {
  height: 14rem;
}

.img {
  width: 20rem;
  height: 27rem;
  vertical-align: middle;
}

.fromTag {
  border: 1px solid #ccc;
  border-radius: 22rem;
  padding: 2rem 5rem;
  margin: 0 14rem;
}

.fromImg {
  margin-left: 20rem;
  // margin-top: 20rem;
  vertical-align: middle;
  width: 16rem;
  height: 16rem;
}

.toTag {
  font-size: 12rem;
  padding: 2rem 5rem;
  margin: 0 20rem;
  border: 1px solid #fff;
  border-radius: 22rem;

  img {
    height: 12rem;
  }
}

</style>
