<template>
  <div>
    <div class="role-area">
      <div class="role-tree-area">
        <div class="role-tree-area-action">
          <a class="role-btn">
            <a-icon type="team"></a-icon>新增公司
          </a>
        </div>

        <div class="role-tree-area-wrap">
          <tree-menu
            :nodes="companies"
            :selectedKeys.sync="selectedKeys"
            :openKeys.sync="openKeys"
            @select="onSelect"
            @rightClick="rightClick"
          ></tree-menu>
        </div>
      </div>
      <div class="role-list-area">
        <div class="role-title-area">
          <div class="title">
            <a @click="rightClick(null,mdl)" href="javascript:;">
              <span class="title-text">{{ mdl.title }}</span>
              <a-icon type="down" />
            </a>
            <span class="title-desc"></span>
          </div>
        </div>

        <div class="role-tabs-con">
          <a-tabs :activeKey="activeKey" :animated="false" @change="onTabsChange">
            <a-tab-pane tab="人员管理" key="1">
              <personnel-list :company="mdl"></personnel-list>
            </a-tab-pane>
            <a-tab-pane v-if="mdl.key!==0" tab="部门管理" key="2" forceRender>
              <department-list v-if="activeKey==='2'" :company="mdl"></department-list>
            </a-tab-pane>
            <a-tab-pane v-if="mdl.key!==0" tab="岗位管理" key="3">
              <job-list v-if="activeKey==='3'" :company="mdl"></job-list>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>

    <company-modal ref="modal" @ok="handleOk"></company-modal>
  </div>
</template>

<script>
import { getOrgCompanies, deleteOrgCompany } from '@api/manage'
import PopAction from '@/components/PopAction'
import TreeMenu from '@/components/TreeMenu'
import PersonnelList from './modules/PersonnelList'
import DepartmentList from './modules/DepartmentList'
import JobList from './modules/JobList'
import CompanyModal from './modules/CompanyModal'

export default {
  components: { 'tree-menu': TreeMenu, CompanyModal, PersonnelList, DepartmentList, JobList },
  data () {
    return {
      selectedKeys: [0],
      openKeys: [0],
      mdl: {},
      spinning: false,
      confirmLoading: false,
      companies: [
        {
          title: '重庆兴农融资担保集团有限公司',
          key: 0,
          value: '0',
          children: []
        }
      ],
      activeKey: '1'
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData (mdl = this.companies[0]) {
      this.spinning = true
      await this.getOrgCompanies()
      this.mdl = mdl
      this.spinning = false
    },
    async handleOk (item) {
      await this.loadData(item)
      this.selectedKeys = [item.key]
    },
    onSelect ({ treeNode }) {
      this.mdl = treeNode.treeNode
      this.activeKey = '1'
    },
    onTabsChange (activeKey) {
      this.activeKey = activeKey
    },
    rightClick (e, item) {
      const self = this
      const node = item.$props ? item.$props.treeNode : item
      const actions = [
        {
          name: '添加公司',
          onClick: () => {
            self.$refs.modal.add(node)
          }
        },
        {
          name: '编辑公司',
          divider: true,
          onClick: () => {
            self.$refs.modal.edit(node)
          }
        },
        {
          name: '删除公司',
          onClick: () => this.deleteOrgCompany(node)
        }
      ]

      if (node.key === 0) {
        actions.splice(1, 4)
      }

      PopAction.open({ actions })
    },
    async getOrgCompanies () {
      const res = await getOrgCompanies()
      if (res.code === 200 && res.data.records) {
        this.companies[0].children = res.data.records.map(item => {
          return {
            key: item.id,
            title: item.name
          }
        })
      }
    },
    deleteOrgCompany (node) {
      const self = this
      this.$confirm({
        title: '删除公司',
        content: (  // JSX support
          <div>
            确定要删除公司 <span class="role-delete-text">{node.title}</span>？
          </div>
        ),
        closable: true,
        okText: '确定删除',
        okType: 'danger',
        onOk (close) {
          return deleteOrgCompany({ id: node.key })
            .then(() => {
              self.loadData()
              self.$notification.success({ message: '删除成功' })
            })
            .catch(() => {
              // Do something
            })
        }
      })
    }
  }
}
</script>

<style lang="less">
.role-area {
  display: flex;
  flex-direction: row;
}

.role-tree-area {
  width: 260px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e8e8e8;

  .role-tree-area-action {
    padding-left: 14px;

    .role-btn {
      margin: 10px;
      display: inline-block;
      cursor: pointer;
    }
  }

  .role-tree-area-wrap {
    flex: 1;
    padding-right: 10px;
  }
}

.role-list-area {
  flex: 1;
  padding-left: 10px;
  padding-right: 30px;
}

.role-title-area {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  padding-bottom: 10px;

  .title {
    flex: 1;
    display: flex;
    margin-left: 10px;
    white-space: inherit;
    overflow: hidden;
    text-overflow: ellipsis;

    a {
      font-size: 18px;
      color: #6f8092;
      text-decoration: none;

      .title-text {
        max-width: inherit;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: middle;
        padding-right: 8px;
      }

      .anticon {
        font-size: 14px;
      }
    }

    &-desc {
      display: inline-block;
      margin-left: 5px;
      padding-top: 5px;
      vertical-align: middle;
      font-size: 14px;
      color: #aaa;
    }
  }
}

.role-tabs-con {
  margin-left: 10px;
}

.permission-wrap {
  padding-left: 30px;

  .permission-desc {
    margin: 20px 0 10px;
    font-size: 14px;
    color: #aaa;
  }

  .permisson-setting {
    margin-top: 15px;
    margin-bottom: 30px;
    .ant-row {
      line-height: 30px;
      margin-bottom: 15px;
    }
  }
}

.role-delete-text {
  font-size: 16px;
  color: #f5222d;
}
</style>
