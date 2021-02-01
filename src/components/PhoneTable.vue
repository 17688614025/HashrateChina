<template>
  <el-row :gutter="20">
    <div v-for="(item, i) in tableData" :key="i" :class="`mt-14 item ${bg}`">
      <el-col
        v-for="(th, j) in tableConfig"
        :span="span"
        :key="j"
      >
        <span :style="`min-width:${label_width}rem`" class="bold">{{ th.label }}
          <el-tooltip v-if="th.needTips" placement="top">
            <div slot="content" class="mxw-200">{{ th.needTips }}</div>
            <i class="el-icon-info" />
        </el-tooltip>：</span>
        <template :class="val_class">
          <template v-if="th.linkUrl">
            <template v-if="th.type === 'Array'">
              <router-link
                v-for="(id, n) in item[th.prop]"
                :key="n"
                :class="n && `ml-${label_width}`"
                :to="th.linkUrl + id"
              >
                {{ subStrCenter(id) }} <br >
              </router-link>
            </template>
            <router-link v-else :to="th.linkUrl + item[th.prop]">{{
              subStrCenter(item[th.prop])
            }}</router-link>
          </template>
          <span v-else-if="!['tag'].includes(th.prop)" :class="th.tag && 'mr-20'">
            <img v-if="th.flag" :src="item[th.flag]" :alt="th.flag" class="icon">
            {{ th.sub? subStrCenter(item[th.prop]): item[th.prop] }}
          </span>
          <template v-show="th.tag">
            <span v-if="item[th.tag]" class="tag">
              {{ item[th.tag].name }}
              <el-tooltip v-if="item[th.tag].signed" placement="bottom-start">
                <div slot="content" class="mxw-200">加V表示账户已完成所有者的签名验证</div>
                <img src="@/assets/imgs/vip.png" alt="vip" >
              </el-tooltip>
            </span>
          </template>
        </template>
      </el-col>
    </div>
  </el-row>
</template>

<script>
import { subStrCenter } from '@/utils/auth'
export default {
  props: {
    bg: {
      type: String,
      default: ''
    },
    span: {
      type: Number,
      default: 24
    },
    val_class: {
      type: String,
      default: ''
    },
    label_width: {
      type: Number,
      default: 150
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
  methods: {
    subStrCenter
  }
}
</script>

<style lang="less" scoped>
@import "../assets/css/mixin.less";

.mt-14 {
  &:first-child {
    margin-top: 0;
  }
}

.item {
  padding: 25rem 40rem;
  line-height: 39rem;
  overflow: hidden;
}

.tag {
  font-size: 12rem;
  padding: 3rem 14rem;
  border: 1px solid #fff;
  border-radius: 22rem;

  img {
    height: 12rem;
  }
}

.icon {
  height: 12rem;
}

.bold {
  display: inline-block;
  font-weight: bold;
}

.bg {
  background: #041e34;
  border: 1px solid #062437;
  border-radius: 10px;
}
</style>
