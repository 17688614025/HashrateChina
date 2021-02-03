<template>
  <el-dialog :center="true" :visible.sync="dialogFormVisible" width="80%" title="签名验证">
    目前仅对 有效算力 ≥ 32 GiB 的矿工开放自主认证
    <el-form ref="ruleForm" :model="form">
      <el-form-item :label-width="formLabelWidth" required label="Owner地址">
        {{ form.addressToSign }}
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" required label="账户英文全称">
        <el-input
          v-model="form.en"
          size="mini"
          autocomplete="off"
          placeholder="不超过16个字符"
        />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" required label="账户中文全称">
        <el-input
          v-model="form.zh"
          size="mini"
          autocomplete="off"
          placeholder="不超过16个字符"
        />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" required label="联系方式">
        <el-input
          v-model="form.contact"
          size="mini"
          autocomplete="off"
          placeholder="邮箱/手机号"
        />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="信息">
        {{ form.message }}
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="签名代码">
        <el-tooltip placement="top">
          <!-- <i slot="content" class="fa fa-copy" /> -->
          <div slot="content">点击复制</div>
          <span
            :data-clipboard-text="form.command.lotus"
            class="tag-read"
            @click="copy"
          >{{ form.command.lotus }}</span
          >
        </el-tooltip>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" required label="签名">
        <el-input
          v-model="form.signature"
          size="mini"
          autocomplete="off"
          placeholder="请复制上面的代码，在filecoin钱包中进行签名，将签名内容粘贴到此处"
        />
      </el-form-item>
    </el-form>
    <span
      class="red"
    >特别提示：账户名称不得使用敏感词、违禁词、名人姓名等，如有违规将进行删除和禁用签名处理，谢谢配合。</span
    >
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="hidden">取 消</el-button>
      <el-button type="text" @click="submitForm('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 复制粘贴功能
import Clipboard from 'clipboard'
import { addressTagCreateMessage, addressTagCreate } from '@/utils/api'
import { chartMixin } from '@/assets/js/chartMixin'
export default {
  mixins: [chartMixin],
  data: () => ({
    dialogFormVisible: false,
    formLabelWidth: '120rem',
    form: {
      addressToSign: '',
      en: '',
      zh: '',
      command: {
        lotus: ''
      },
      message: ''
    }
  }),
  computed: {
  },
  watch: {
    form: {
      handler(n, o) {
        this.form = n
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
    initData() {
    },
    show() {
      this.getAddressTagCreateMessage()
      this.dialogFormVisible = true
    },
    hidden(formName) {
      this.dialogFormVisible = false
    },
    getAddressTagCreateMessage() {
      const p = { address: this.$route.params.address }
      this.action(addressTagCreateMessage, p, res => {
        this.$set(this, 'form', res.data)
        this.form = res.data
      })
    },
    submitForm(formName) {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      this.action(addressTagCreate, this.form, res => {
        this.$message({
          message: '创建成功（签名代码异常）',
          type: 'success'
        })
      })
      // } else {
      //   console.log('error submit!!')
      //   return false
      // }
      // })
    },
    copy() {
      var clipboard = new Clipboard('.tag-read')
      clipboard.on('success', e => {
        this.$message({
          message: '复制成功',
          type: 'success'
        })
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$message.error('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.red {
  color: red;
}

.tag-read {
  display: block;
  cursor: pointer;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
