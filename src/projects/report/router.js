import { BasicLayout, PageView } from '@/layouts'

export default {
  path: '/report',
  name: 'report',
  component: BasicLayout,
  redirect: '/report/index',
  meta: { title: '调查报告', icon: 'project', permission: ['ROLE_OrgAuth_SysRoleManager'] },
  children: [
    {
      path: '/report/index',
      name: 'report-index',
      component: PageView,
      redirect: '/report/page1',
      meta: { title: 'Report 示例', icon: 'setting', permission: ['ROLE_OrgAuth_SysRoleManager'] },
      children: (pre => [
        {
          path: '/report/page1',
          name: `${pre}page1`,
          component: () => import('./views/index'),
          meta: {
            title: '示例首页',
            icon: 'file',
            permission: ['ROLE_OrgAuth_SysRoleManager']
          }
        },
        {
          path: '/report/page2',
          name: `${pre}page2`,
          component: () => import('./views/page'),
          meta: {
            title: 'page2',
            icon: 'file',
            permission: ['ROLE_OrgAuth_SysRoleManager']
          }
        }
      ])('report-')
    }
  ]
}
