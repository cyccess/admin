import { BasicLayout, RouteView } from '@/layouts'

export default {
  path: '/office',
  component: BasicLayout,
  redirect: '/office/index',
  name: 'office',
  meta: { title: '个人办公', icon: 'desktop', permission: ['ROLE_OrgAuth_SysRoleManager'] },
  children: [
    {
      path: '/office/index',
      component: RouteView,
      name: 'office-index',
      redirect: '/office/page1',
      meta: { title: 'office 示例', icon: 'solution', permission: ['ROLE_OrgAuth_SysRoleManager'] },
      children: (pre => [
        {
          path: '/office/page1',
          name: `${pre}page1`,
          component: () => import('./views/index'),
          meta: {
            title: '示例首页',
            icon: 'file',
            permission: ['ROLE_OrgAuth_SysRoleManager']
          }
        },
        {
          path: '/office/page2',
          name: `${pre}page2`,
          component: () => import('./views/page'),
          meta: {
            title: 'page2',
            icon: 'file',
            permission: ['ROLE_OrgAuth_SysRoleManager']
          }
        }
      ])('office-')
    }
  ]
}
