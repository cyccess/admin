<template>
  <a-modal :title="title" :width="660" :visible="visible" :footer="null" @cancel="handleCancel">
    <a-form :form="form">
      <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="角色名">
        <a-input v-decorator="['name',{rules: [{ required: true, message: '请输入角色名' }]}]" placeholder="请输入角色名" />
      </a-form-item>
      <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="描述">
        <a-textarea :rows="4" v-decorator="['description']" />
      </a-form-item>

      <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
        <a-button type="primary" @click="check" :loading="confirmLoading">确定</a-button>

        <a @click="handleCancel" class="ant-anchor-link">取消</a>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { createRole } from '@/api/manage'
import pick from 'lodash.pick'

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
  name: 'RoleModal',
  data () {
    return {
      title: '',
      visible: false,
      confirmLoading: false,
      checkNick: false,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this),
      model: {}
    }
  },
  created () { },
  methods: {
    add () {
      this.edit({
        id: 0
      })
    },
    edit (record) {
      this.model = Object.assign({}, record)
      this.visible = true

      this.form.resetFields()
      this.title = this.model.id ? '修改角色' : '新增角色'

      delete this.model.permissionDetails // 必须删除权限明细，否者提交报错（由于restful读写模型不一致）

      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'name', 'description'))
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
          _this.model = Object.assign(_this.model, values)
          createRole(_this.model)
            .then((res) => {
              // Do something
              _this.$notification.success({ message: '保存成功' })
              _this.$emit('ok', res.data)
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
