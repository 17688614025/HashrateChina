<template>
  <table :style="styleObject" class="mailTable">
    <tr v-for="index in rowCount" :key="index">
      <td class="rowStyle">
        {{ tableRows[index - 1].key }}
      </td>
      <td v-for="item in dataCount" :key="item" class="DataStyle">
        <h3>{{ tableData[item - 1][tableRows[index - 1].value] }}</h3>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    tableStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    tableRows: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      styleObject: {},
      s_showByRow: true
    }
  },
  computed: {
    rowCount: function() {
      return this.tableRows.length
    },
    dataCount: function() {
      return this.tableData.length
    }
  },

  created() {
    this.styleObject = this.tableStyle
  }
}
</script>

<style lang="less" scoped>
.rowStyle {
  text-align: center;
  width: 100rem;
  background-color: #ebeef5;
  border: 1px solid #f2f6fc;
  font-size: 20rem;
}

.DataStyle {
  border: 1px solid #f2f6fc;
  text-align: center;
  font-size: 16rem;
}

.DataStyle:hover {
  transform: scale(1.2);
  background-color: #fafafa;
}
</style>
