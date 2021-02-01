<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      small
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: false
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page + 1
      },
      set(val) {
        this.$emit('update:page', val - 1)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage - 1, limit: val }) // 因为后台接口currentPage是从0开始的
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val - 1, limit: this.pageSize })
    }
  }
}
</script>

<style lang="less" scoped>
.pagination-container {
  text-align: center;
  padding: 32rem 16rem;
  overflow: auto;
}

.pagination-container.hidden {
  display: none;
}

/deep/.el-dialog,
/deep/.el-pager li {
  background: #031321;
  color: #ccc;
  box-sizing: border-box;
}

/deep/.el-pagination .btn-next,
/deep/.el-pagination .btn-prev {
  background: center center no-repeat #031321;
  background-size: 16rem;
  cursor: pointer;
  margin: 0;
  color: #ccc;
}

/deep/.el-pager li.active {
  color: #409eff;
  cursor: default;
}

/deep/.el-pagination__total,
/deep/.el-pagination__jump {
  color: #fff;
}

/deep/.el-pagination.is-background .btn-next,
/deep/.el-pagination.is-background .btn-prev,
/deep/.el-pagination.is-background .el-pager li {
  background: #031321;
  border: 1px solid #ccc;
  color: #ccc;
  -webkit-box-shadow: -1px 0 0 0 #00b6b8;
  box-shadow: -1px 0 0 0 #00b6b8;
}

/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #00b6b8;
  border: 1px solid #ccc;
  color: #ccc;
  -webkit-box-shadow: -1px 0 0 0 #00b6b8;
  box-shadow: -1px 0 0 0 #00b6b8;
}
</style>
