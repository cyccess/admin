import { BasicLayout, PageView } from '@/layouts'

export default {
  path: '/business',
  component: BasicLayout,
  redirect: '/business/index',
  name: 'business',
  meta: { title: '业务管理', icon: 'solution', permission: ['ROLE_OrgAuth_SysRoleManager'] },
  children: [
    {
      path: '/business/index',
      component: PageView,
      name: 'business-index',
      redirect: '/business/page1',
      meta: { title: 'Business 示例', icon: 'solution', permission: ['ROLE_OrgAuth_SysRoleManager'] },
      children: (pre => [
        {
          path: '/business/page1',
          name: `${pre}page1`,
          component: () => import('./views/index'),
          meta: {
            title: '示例首页',
            icon: 'file',
            permission: ['ROLE_OrgAuth_SysRoleManager']
          }
        },
        {
          path: '/business/page2',
          name: `${pre}page2`,
          component: () => import('./views/page'),
          meta: {
            title: 'page2',
            icon: 'file',
            permission: ['ROLE_OrgAuth_SysRoleManager']
          }
        }
      ])('business-')
    }
  ]
}
