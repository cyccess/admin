<template>
  <a-modal :title="title" :width="660" :visible="visible" :footer="null" @cancel="handleCancel">
    <a-form :form="form">
      <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="部门名称">
        <a-input v-decorator="['name',{rules: [{ required: true, message: '请输入部门名称' }]}]" placeholder="请输入部门名称" />
      </a-form-item>

      <a-form-item v-if="!isModify" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="所属部门">
        <a-tree-select :treeData="treeData" v-decorator="['value',{rules: [{required: true, message: '请选择所属部门' }]}]" placeholder="请选择所属部门">
        </a-tree-select>
      </a-form-item>

      <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
        <a-button type="primary" @click="check" :loading="confirmLoading">确定</a-button>
        <a @click="handleCancel" class="ant-anchor-link">取消</a>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { saveOrgSysDepartment, getOrgSysDepartment } from '@/api/manage'

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
  name: 'DepartmentModal',
  data () {
    return {
      treeData: [],
      title: '添加部门',
      visible: false,
      confirmLoading: false,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this),
      isModify: false,
      mdl: null
    }
  },
  watch: {
    visible (val) {
      if (val && !this.isModify) {
        this.loadData()
      }
    }
  },
  methods: {
    async loadData () {
      const res = await getOrgSysDepartment()
      if (res.code === 200 && res.data) {
        const treeData = [{
          title: '重庆兴农融资担保集团有限公司',
          key: 0,
          value: '0',
          children: res.data
        }]

        this.treeData = treeData.map((org, index) => {
          return this.mapDepartment(org, index)
        })
      }
    },
    mapDepartment (org, index) {
      const haveChildren = Array.isArray(org.children) && org.children.length > 0
      const node = {
        title: org.title,
        value: org.key + '',
        Key: org.key,
        children: haveChildren ? org.children.map(node => this.mapDepartment(node, index + 1)) : []
      }
      return node
    },
    add (record) {
      this.visible = true
      this.form.resetFields()
      this.title = '添加部门'

      this.$nextTick(() => {
        this.form.setFieldsValue({ value: record.key + '' })
      })
    },
    edit (record) {
      this.visible = true
      this.isModify = true
      this.title = '编辑部门'

      this.mdl = { ...record }

      this.$nextTick(() => {
        this.form.setFieldsValue({ name: record.title })
      })
    },
    close () {
      this.$emit('close')
      this.isModify = false
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

          const prarms = { name: values.name }
          if (values.value && values.value !== '0') {
            prarms['parent'] = '/availableSysDepartments/' + values.value
          }

          if (this.isModify) {
            prarms['key'] = this.mdl.key
          }

          saveOrgSysDepartment(prarms)
            .then((res) => {
              if (res.code === 200) {
                _this.$notification.success({ message: '保存成功' })
                _this.$emit('ok', res.data)
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
