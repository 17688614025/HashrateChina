<template>
  <div>
    <div class="mb-10">
      <label>地区：<input v-model="location"></label>
      <label> 关键词：<input v-model="keyword"></label>
      <label> 经度：<input v-model="markerPo.lat"></label>
      <label> 纬度：<input v-model="markerPo.lng"></label>
    </div>

    <baidu-map
      :scroll-wheel-zoom="true"
      ak="ocjtpCpd3HusX9VUmkfc49P9jxRV5Vch"
      @rightclick="clickBmap"
    >
      <!--地图视图-->

      <bm-view class="map" />

      <!--显示更多-->

      <div class="more_panel">
        <span :class="{ down: isShowPanel }" @click.stop="showPanel">
          <span>{{ isShowPanel ? "隐藏" : "显示" }}</span
          >搜索列表<i class="el-icon-d-arrow-right" />
        </span>
      </div>

      <!--搜索-->

      <bm-local-search
        :keyword="keyword"
        :panel="isShowPanel"
        :auto-viewport="true"
        :location="location"
        @searchcomplete="searchcomplete"
      />

      <!--点标注-->

      <bm-marker
        :position="markerPo"
        :dragging="true"
        :title="storeName"
        :z-index="999999999"
        :icon="{ url: markerIcon, size: { width: 34, height: 34 } }"
        @click="infoWindowOpen"
        @dragend="dragend"
      >
        <bm-info-window
          :show="isShowInfo"
          @close="infoWindowClose"
          @open="infoWindowOpen"
        >{{ address }}
        </bm-info-window>
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'

import BmView from 'vue-baidu-map/components/map/MapView' // 地图视图

import BmLocalSearch from 'vue-baidu-map/components/search/LocalSearch' // 搜索

import BmMarker from 'vue-baidu-map/components/overlays/Marker' // 点标注

import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow' // 标注弹窗

export default {
  components: {
    BaiduMap,

    BmView,

    BmLocalSearch,

    BmMarker,

    BmInfoWindow
  },

  data() {
    return {
      storeName: '',

      center: {
        // 经纬度

        lng: 39.9,
        lat: 116.3
      },

      zoom: 3, // 地图展示级别
      location: '北京',

      keyword: '北京',

      markerPo: {
        lng: 39.9,
        lat: 116.3
      },

      isShowPanel: true,

      isShowInfo: false,

      markerIcon: '', // 标注图片

      address: ''
    }
  },

  methods: {
    clickBmap(val) {
      // 右击鼠标放标注

      this.markerPo = val.point
    },

    showPanel() {
      // 点击标注出现弹框

      this.isShowPanel = !this.isShowPanel
    },

    infoWindowClose() {
      // 弹框关闭

      this.isShowInfo = false
    },

    infoWindowOpen() {
      // 弹框打开

      this.isShowInfo = true
    },

    dragend(val) {
      // 标注拖拽完成获取坐标信息

      this.markerPo = val.point

      const geocoder = new BaiduMap.Geocoder() // 创建地址解析器的实例

      geocoder.getLocation(val.point, rs => {
        this.address = rs.address
      })
    },

    searchcomplete(arr) {
      this.isShowPanel = true
    }
  }
}
</script>

<style lang="less" scoped>
.map {
  width: 100%;
  height: 500rem;
}

.more_panel {
  text-align: center;
  font-size: 12rem;
  color: #2878ff;
  padding-top: 10rem;

  span {
    cursor: pointer;

    i {
      transform: rotate(90deg);
    }
  }

  span.down {
    i {
      transform: rotate(-90deg);
    }
  }
}
</style>
