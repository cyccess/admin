<template>
  <a-modal :title="title" :width="660" :visible="visible" :footer="null" @cancel="handleCancel">
    <a-form :form="form">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="公司名称"
      >
        <a-input
          v-decorator="['name',{rules: [{ required: true, message: '请输入公司名称' }]}]"
          placeholder="请输入公司名称"
        />
      </a-form-item>

      <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
        <a-button type="primary" @click="check" :loading="confirmLoading">确定</a-button>
        <a @click="handleCancel" class="ant-anchor-link">取消</a>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { saveOrgCompany } from '@/api/manage'

const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 20
  }
}
const formTailLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 20,
    offset: 4
  }
}

export default {
  name: 'CompanyModal',
  data () {
    return {
      title: '',
      visible: false,
      confirmLoading: false,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this),
      mdl: null
    }
  },
  methods: {
    add (record) {
      this.edit({ key: 0 })
    },
    edit (record) {
      this.mdl = { ...record }
      this.visible = true
      this.title = record.key === 0 ? '添加公司' : '编辑公司'

      this.$nextTick(() => {
        this.form.resetFields()
        this.form.setFieldsValue({ name: record.title })
      })
    },
    close () {
      this.$emit('close')
      this.visible = false
    },
    handleCancel () {
      this.close()
    },
    check () {
      const _this = this
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('form values', values)

          _this.confirmLoading = true
          const prarms = { name: values.name, id: this.mdl.key }

          saveOrgCompany(prarms)
            .then((res) => {
              if (res.code === 200) {
                _this.$notification.success({ message: '保存成功' })

                const { id, name } = res.data

                _this.$emit('ok', { key: id, title: name })
              } else {
                _this.$notification.warning({ message: res.msg })
              }
            })
            .catch(() => {
              // Do something
            })
            .finally(() => {
              _this.confirmLoading = false
              _this.close()
            })
        }
      })
    }
  }
}
</script>

<style >
</style>
