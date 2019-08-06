<template>
  <div>
    <div class="role-area">
      <div class="role-tree-area">
        <div class="role-tree-area-action">
          <a @click="$refs.modal.add()" class="role-btn">
            <a-icon type="team"></a-icon>新增角色
          </a>
        </div>

        <div class="role-tree-area-wrap">
          <a-menu
            @click="onRoleChange"
            mode="inline"
            :defaultOpenKeys="openKeys"
            v-model="selectedKeys"
            :class="['role-tree-menu']"
          >
            <a-sub-menu key="sub1" :disabled="true">
              <span slot="title">
                <a-icon type="team" />默认
              </span>
              <a-menu-item v-for="item in roles" :key="item.id" :style="{paddingLeft:0}">
                <a class="title" href="javascript:;">
                  <a-icon type="team" />
                  <span>{{ item.name }}</span>
                  <span
                    v-if="item.id>2"
                    @click.stop.prevent="popActionOpen(item)"
                    class="title-action"
                  >
                    <a-icon type="ellipsis" style="font-size:16px;" />
                  </span>
                </a>
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </div>
      </div>
      <div class="role-list-area">
        <a-spin :spinning="spinning">
          <div class="role-title-area">
            <div class="title">
              <a @click.stop.prevent="popActionOpen()" href="javascript:;">
                <span class="title-text">{{ mdl.name }}</span>
                <a-icon type="down" />
              </a>
              <span class="title-desc">{{ mdl.description }}</span>
            </div>
          </div>

          <div class="role-tabs-con">
            <div class="permission-wrap">
              <div class="permission-desc">设置角色对应的功能操作权限</div>

              <div class="permisson-setting">
                <a-row v-for="item in permissions" :key="item.id">
                  <a-col :span="4">
                    <a-checkbox
                      :indeterminate="item.indeterminate"
                      @change="onCheckAllChange(item,arguments)"
                      :checked="item.checkedAll"
                    >
                      <span>{{ item.name }}</span>
                    </a-checkbox>
                  </a-col>
                  <a-col :span="20">
                    <a-checkbox-group @change="onChange(item)" v-model="item.checkedList">
                      <a-checkbox
                        v-for="action in item.details"
                        :checked="action.defaultCheck"
                        :value="action.id"
                        :key="action.id"
                      >{{ action.name }}</a-checkbox>
                    </a-checkbox-group>
                  </a-col>
                </a-row>
              </div>

              <a-form-item>
                <a-button @click="save" :loading="confirmLoading" type="primary">保存</a-button>
              </a-form-item>
            </div>
          </div>
        </a-spin>
      </div>
    </div>

    <role-modal ref="modal" @ok="handleOk"></role-modal>
  </div>
</template>

<script>
import { getRoleList, getPermissions, deleteRole, savePermissions } from '@/api/manage'
import RoleModal from './modules/RoleModal'
import PopAction from '@/components/PopAction'
import TreeMenu from '@/components/TreeMenu'

export default {
  name: 'RoleList',
  components: { RoleModal, TreeMenu },
  data () {
    return {
      mdl: {},
      roles: [],
      permissions: [],
      openKeys: ['sub1'],
      selectedKeys: [1],
      spinning: false,
      confirmLoading: false
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      this.spinning = true
      await this.loadRoles()

      const res = await getPermissions()
      const permissions = res.data.records

      this.loadPermissions(permissions)

      this.selectedRole()
      this.spinning = false
    },
    popActionOpen (role) {
      const self = this
      role = role || self.mdl

      const actions = [
        {
          name: '新增角色',
          divider: true,
          onClick: () => {
            self.$refs.modal.add()
          }
        },
        {
          name: '修改角色',
          onClick: () => {
            self.$refs.modal.edit(role)
          }
        },
        {
          name: '删除角色',
          onClick: () => {
            self.deleteRole(role)
          }
        }
      ]

      PopAction.open({ actions })
    },
    deleteRole (role) {
      const self = this
      this.$confirm({
        title: '删除角色',
        // JSX support
        content: (
          <div>
            确定要删除角色 <span class="role-delete-text">{role.name}</span>？
          </div>
        ),
        closable: true,
        okText: '确定删除',
        okType: 'danger',
        onOk (close) {
          return deleteRole({ id: role.id })
            .then(() => {
              self.$notification.success({ message: '删除成功' })
              self.loadRoles().then(() => {
                self.selectedRole()
              })
            })
            .catch(() => {
              // Do something
            })
        }
      })
    },
    onChange (permission) {
      permission.indeterminate =
        !!permission.checkedList.length && permission.checkedList.length < permission.details.length
      permission.checkedAll = permission.checkedList.length === permission.details.length
    },
    onCheckAllChange (permission, e) {
      const checked = e[0].target.checked
      permission.details.forEach(action => {
        action.defaultCheck = checked
      })
      permission.checkedAll = checked
      permission.indeterminate = false
      permission.checkedList = checked ? permission.details.map(a => a.id) : []
    },
    onRoleChange ({ key }) {
      this.spinning = true
      setTimeout(() => {
        this.selectedRole(key)
        this.spinning = false
      }, 100)
    },
    handleOk (role) {
      // 重新加载角色
      this.loadRoles().then(() => {
        this.selectedRole(role.id)
      })
    },
    async loadRoles () {
      const res = await getRoleList({ projection: 'withPermission' })
      this.roles = res.data.records
    },
    loadPermissions (records) {
      this.permissions = records.map(permission => {
        permission.checkedAll = false
        permission.checkedList = []
        permission.indeterminate = false
        permission.details.forEach(option => {
          option.defaultCheck = false
        })
        return permission
      })
      this.checkPermissions()
    },
    checkPermissions () {
      this.permissions.forEach(role => {
        // 过滤用户权限
        const actionsOptions = role.details.filter(permission => {
          const permissionDetails = this.mdl.permissionDetails // 当前角色的权限
          if (permissionDetails) {
            const actions = this.mdl.permissionDetails.map(a => a.id)
            const isExists = actions.includes(permission.id)
            permission.defaultCheck = isExists
            return isExists
          }

          return false
        })

        role.checkedList = actionsOptions.map(a => a.id)
        role.checkedAll = !!role.details.length && role.checkedList.length === role.details.length
        role.indeterminate = !!role.checkedList.length && role.checkedList.length < role.details.length
      })
    },
    selectedRole (key = 1) {
      this.selectedKeys = [key]
      // const role = this.roles.find((r) => r.id === key)
      // this.mdl = Object.assign({}, role)

      this.mdl = this.roles.find(r => r.id === key)
    },
    async save () {
      this.confirmLoading = true
      const permissionDetails = []
      this.permissions.forEach(p => {
        p.details.filter(d => d.defaultCheck).forEach(p => permissionDetails.push(p))
      })

      this.mdl.permissionDetails = permissionDetails

      const params = { ...this.mdl }
      params.permissionDetails = params.permissionDetails.map(p => {
        return '/permissionDetails/' + p.id
      })

      const res = await savePermissions(params)

      if (res.code === 200) {
        this.$notification.success({
          message: '修改成功'
        })
      } else {
        this.$notification.error({
          message: '修改失败'
        })
      }
      this.confirmLoading = false
    }
  },
  watch: {
    mdl () {
      this.checkPermissions()
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

    .role-tree-menu {
      border-right: none;
    }

    .ant-menu-item .anticon,
    .ant-menu-submenu-title .anticon {
      margin-right: 5px;
    }

    .ant-menu-sub {
      .ant-menu-item {
        margin: 0;
        padding-right: 0;
        overflow: initial;
        text-overflow: initial;

        .title {
          position: relative;
          padding-left: 48px;
          padding-right: 10px;

          &-action {
            float: right;
            opacity: 0.5;
            visibility: hidden;
            color: #333;
          }

          &-action:hover {
            opacity: 0.9;
          }
        }

        .title:hover {
          box-shadow: 0 0 8px 2px #eee;
        }

        .title:hover .title-action {
          visibility: visible;
        }
      }
    }
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
