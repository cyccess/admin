import { BasicLayout, PageView } from '@/layouts'

export default {
  path: '/console',
  name: 'console',
  component: BasicLayout,
  redirect: '/console/index',
  meta: { title: '系统管理', icon: 'setting', permission: ['ROLE_Org_SysUserManager'] },
  children: [
    // role
    {
      path: '/console/index',
      component: PageView,
      redirect: '/console/members',
      name: 'console-index',
      meta: { title: '系统管理', icon: 'setting', permission: ['ROLE_Org_SysUserManager'] },
      children: (pre => [
        {
          path: '/console/role',
          name: `${pre}role`,
          component: () => import('./views/role/RoleList'),
          meta: {
            title: '角色管理',
            icon: 'file',
            hiddenHeaderContent: true,
            permission: ['ROLE_OrgAuth_SysRoleManager']
          }
        },
        {
          path: '/console/members',
          name: `${pre}member`,
          component: () => import('./views/member/Index'),
          meta: {
            title: '用户管理',
            icon: 'file',
            hiddenHeaderContent: true,
            permission: ['ROLE_Org_SysUserManager']
          }
        },
        {
          path: '/console/departments',
          name: `${pre}position`,
          component: () => import('./views/department/Index'),
          meta: {
            title: '组织架构',
            icon: 'file',
            hiddenHeaderContent: true,
            permission: ['ROLE_Org_SysDepartmentManager']
          }
        }
      ])('console-')
    }
  ]
}
