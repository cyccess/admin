<template>
  <div>
    <a-table :columns="columns" :dataSource="data">
      <a slot="name" slot-scope="text" href="javascript:;">{{ text }}</a>
      <span slot="tags" slot-scope="tags">
        <a-tag v-for="tag in tags" color="blue" :key="tag">{{ tag }}</a-tag>
      </span>
      <span slot="action">
        <a @click="$refs.modal.add()" href="javascript:;">修改</a>
        <a-divider type="vertical" />
        <a href="javascript:;">删除</a>
        <a-divider type="vertical" />
        <a href="javascript:;" class="ant-dropdown-link">
          更多
          <a-icon type="down" />
        </a>
      </span>
    </a-table>

    <user-modal ref="modal" @ok="handleOk"></user-modal>
  </div>
</template>
<script>
import UserModal from './modules/UserModal'
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: '邮箱',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' }
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    phone: 18580760010,
    mail: 'abc@163.com',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    phone: 18580760011,
    mail: 'abc@163.com',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    phone: 18580760012,
    mail: 'abc@163.com',
    tags: ['cool', 'teacher']
  }
]

export default {
  components: {
    UserModal
  },
  data () {
    return {
      description: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
      data,
      columns
    }
  },
  methods: {
    handleOk () {}
  }
}
</script>
