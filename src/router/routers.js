import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/main'

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/assets',
    name: '_assets',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: '/hosts_page',
        name: 'hosts_page',
        meta: {
          icon: 'md-grid',
          title: '资产信息',
          // beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/assets/hosts.vue')
      }
    ]
  },
  {
    path: '/work_orders',
    name: '_work_orders',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: '/work_orders_page',
        name: 'work_orders_page',
        meta: {
          icon: 'md-grid',
          title: '工单信息',
          // beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/work_orders/work_orders.vue')
      }
    ]
  },
  {
    path: '/alerts',
    name: '_alerts',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: '/alerts_page',
        name: 'alerts_page',
        meta: {
          icon: 'md-grid',
          title: '报警信息',
          // beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/alerts/alerts.vue')
      }
    ]
  },
  {
    path: '/db_info',
    name: '_db_info',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: '/db_info_page',
        name: 'db_info_page',
        meta: {
          icon: 'md-grid',
          title: '数据库信息',
          // beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/db-info/db-info.vue')
      }
    ]
  },
  {
    path: '/utilization',
    name: '_utilization',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: '/utilization_page',
        name: 'utilization_page',
        meta: {
          icon: 'md-grid',
          title: '监控信息',
          // beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/utilization/utilization.vue')
      }
    ]
  },
  {
    path: '/summary',
    name: '_summary',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: '/summary_page',
        name: '_summary_page',
        meta: {
          icon: 'md-grid',
          title: '建议总结',
          // beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/summary/summary.vue')
      },
      {
        path: '/summary_write',
        name: '_summary_write',
        meta: {
          hideInMenu: true,
          title: '填写总结'
        },
        component: () => import('@/view/summary/summary_write.vue')
      }
    ]
  },
  {
    path: '/report',
    name: 'report',
    meta: {
      title: '月报',
      hideInMenu: true
    },
    component: () => import('@/view/report/report.vue')
  },
]
