<template>
  <div>
    <div style="overflow:hidden;margin-bottom:20px">
      <span>全部成员，共{{ pagination.total }}人</span>
      <div style="float:right">
        <a-button type="primary">添加人员</a-button>
        <a-button>添加部门</a-button>
        <a-button type="dashed">添加岗位</a-button>
      </div>
    </div>
    <a-table
      :columns="columns"
      :dataSource="data.records"
      :rowKey="record => record.id"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <span slot="action">
        <a href="javascript:;">修改</a>
        <a-divider type="vertical" />
        <a href="javascript:;">删除</a>
        <a-divider type="vertical" />
        <a href="javascript:;" class="ant-dropdown-link">
          更多
          <a-icon type="down" />
        </a>
      </span>
    </a-table>
  </div>
</template>
<script>
import { getOrgUsers } from '@api/manage'

const columns = [{
  title: '编号',
  dataIndex: 'id',
  key: 'id',
  sorter: true
}, {
  title: '名字',
  dataIndex: 'userName',
  key: 'userName'
}, {
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' }
}]

export default {
  name: 'PersonnelList',
  props: {
    company: {
      type: Object,
      default: Object.assign({})
    }
  },
  data () {
    return {
      pagination: {
        showSizeChanger: true
      },
      columns,
      data: [],
      loading: false,
      mdl: this.company
    }
  },
  watch: {
    company: {
      handler (mdl) {
        this.mdl = mdl
        this.loadData({ page: 1, size: 10 })
      },
      deep: true
    }
  },
  created () {
    // this.loadData({ page: 1, size: 10 })
  },
  methods: {
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager

      this.loadData({
        size: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      })
    },
    async loadData (params = {}) {
      this.loading = true

      // 服务端分页page从0开始
      params.page -= 1
      const { mdl } = this.$data
      if (mdl.key) {
        params['jobs.department.company'] = mdl.key
      }

      console.log('params:', params)
      const res = await getOrgUsers(params)
      if (res.code === 200 && res.data) {
        const pagination = { ...this.pagination }
        pagination.total = res.data.total
        this.data = res.data
        this.pagination = pagination
      }
      this.loading = false
    }
  }
}
</script>
