<template>
  <a-modal :title="title" :width="650" :visible="visible" :footer="null" @cancel="handleCancel">
    <a-form :form="form">
      <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="姓名">
        <a-input v-decorator="['realName', { rules: [{ required: true, message: '请输入姓名' }] }]" placeholder="请输入姓名" />
      </a-form-item>
      <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="登录用户名">
        <a-input v-decorator="['username', { rules: [{ required: true, message: '请输入登录用户名' }] }]" placeholder="请输入登录用户名" />
      </a-form-item>
      <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="手机号">
        <a-input v-decorator="['phone', { rules: [{ required: true, message: '请输入手机号' }] }]" placeholder="请输入手机号" />
      </a-form-item>
      <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="邮箱">
        <a-input v-decorator="['emial', { rules: [{ required: true, message: '请输入邮箱' }] }]" placeholder="请输入邮箱" />
      </a-form-item>
      <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="默认密码">
        <a-input v-decorator="['password', { rules: [{ required: true, message: '请输入默认密码' }] }]" type="password" placeholder="请输入默认密码" />
      </a-form-item>

      <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="所属部门">
        <a-tree-select @change="onChange" :treeData="treeData" allowClear treeCheckable placeholder="请选择所属部门" />
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

const treeData = [
  {
    title: '机构',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0'
      }
    ]
  },
  {
    title: '部门',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: '部门1',
        value: '0-1-0',
        key: '0-1-0'
      },
      {
        title: '部门1',
        value: '0-1-1',
        key: '0-1-1'
      },
      {
        title: '部门2',
        value: '0-1-2',
        key: '0-1-2'
      },
      {
        title: '部门3',
        value: '0-1-3',
        key: '0-1-3'
      },
      {
        title: '部门4',
        value: '0-1-4',
        key: '0-1-4'
      },
      {
        title: '部门5',
        value: '0-1-5',
        key: '0-1-5'
      },
      {
        title: '部门6',
        value: '0-1-6',
        key: '0-1-6'
      },
      {
        title: '部门7',
        value: '0-1-7',
        key: '0-1-7'
      },
      {
        title: '部门8',
        value: '0-1-8',
        key: '0-1-8'
      }
    ]
  }
]

const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 19
  }
}
const formTailLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 19,
    offset: 5
  }
}
export default {
  name: 'RoleModal',
  data () {
    return {
      treeData,
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
      this.title = this.model.id ? '修改角色' : '添加成员'

      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'name'))
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
            .then(res => {
              // Do something
              _this.$message.success('保存成功')
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
    },
    onChange (value) {
      console.log('onChange ', value)
      this.value = value
    }
  }
}
</script>

<style >
</style>
