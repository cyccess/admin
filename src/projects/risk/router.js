import { BasicLayout, PageView } from '@/layouts'

export default {
  path: '/risk',
  component: BasicLayout,
  redirect: '/risk/index',
  name: 'risk',
  meta: { title: '风控系统', icon: 'solution', permission: ['ROLE_OrgAuth_SysRoleManager'] },
  children: [
    {
      path: '/risk/index',
      component: PageView,
      name: 'risk-index',
      redirect: '/business/page1',
      meta: { title: 'Business 示例', icon: 'solution', permission: ['ROLE_OrgAuth_SysRoleManager'] },
      children: (pre => [
        {
          path: '/risk/page1',
          name: `${pre}page1`,
          component: () => import('./views/index'),
          meta: {
            title: '示例首页',
            icon: 'file',
            permission: ['ROLE_OrgAuth_SysRoleManager']
          }
        },
        {
          path: '/risk/page2',
          name: `${pre}page2`,
          component: () => import('./views/page'),
          meta: {
            title: 'page2',
            icon: 'file',
            permission: ['ROLE_OrgAuth_SysRoleManager']
          }
        }
      ])('risk-')
    }
  ]
}
