import { BasicLayout } from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'

import _office from '@/projects/office/router'
import _report from '@/projects/report/router'
import _business from '@/projects/business/router'
import _console from '@/projects/console/router'
import _risk from '@/projects/risk/router'

/**
 * 动态路由
 */
export const asyncRouterMap = [
  {
    path: '/',
    component: BasicLayout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        meta: { title: '首页' },
        component: () => import(/* webpackChunkName: "index" */ '@/views/index')
      }
    ]
  },
  _office,
  _report,
  _business,
  _console,
  _risk,
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
