import Vue from 'vue'

import Layout from '@/layout'
import Router from 'vue-router'

Vue.use(Router)


export const currencyRoutes = [{
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    meta: {
      title: '登录页'
    },
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard'),
      meta: {
        title: '首页',
        icon: 'el-icon-s-data'
      }
    }]
  },
  {
    path: '/analyze',
    name: 'Analyze',
    component: Layout,
    redirect: '/analyze/day',
    children: [{
        path: 'day',
        name: 'Day',
        component: () => import('@/views/analyze/day'),
      },
      {
        path: 'month',
        name: 'Month',
        component: () => import('@/views/analyze/month'),
      }
    ]
  },
  {
    path: '/accounting',
    name: 'Accounting',
    component: Layout,
    redirect: '/accounting/eating',
    children: [{
        path: 'eating',
        name: 'Eating',
        component: () => import('@/views/accounting/eating'),
      },
      {
        path: 'playing',
        name: 'Playing',
        component: () => import('@/views/accounting/playing'),
      },
      {
        path: 'living',
        name: 'Living',
        component: () => import('@/views/accounting/living'),
      },
      {
        path: 'other',
        name: 'Other',
        component: () => import('@/views/accounting/other'),
      },
      {
        path: 'income',
        name: 'Income',
        component: () => import('@/views/accounting/income'),
      }
    ]
  },
  {
    path: '/system',
    name: 'System',
    component: Layout,
    redirect: '/system/member',
    children: [{
        path: 'member',
        name: 'Member',
        component: () => import('@/views/system/member'),
      },
      {
        path: 'memberInfo',
        name: 'MemberInfo',
        component: () => import('@/views/system/memberInfo'),
      },
      {
        path: 'setting',
        name: 'Setting',
        component: () => import('@/views/system/setting'),
      }
    ]
  }
]

const createRouter = () => {
  return new Router({
    routes: currencyRoutes
  })
}

const router = createRouter()

export default router
