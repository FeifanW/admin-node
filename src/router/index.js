import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
]

// 异步组件
export const asyncRoutes = [
  // 把自己定义的views下面book里面的create.vue组件，如果想控制只要管理员才能访问，就需要加载asyncRoutes里面
  {
    path: '/book',
    name: 'book',
    component: Layout,
    // 重定向
    redirect: '/book/create',
    meta: { title: '图书管理', icon: 'documentation', roles: ['admin'] },
    children: [
      {
        name: 'bookCreate',
        path: '/book/create',
        // @在webpack里面有定义
        component: () => import('@/views/book/create'),
        meta: { title: '上传图书', icon: 'edit', roles: ['admin'] }
      },
      {
        name: 'bookList',
        path: '/book/list',
        // @在webpack里面有定义
        component: () => import('@/views/book/create'),
        meta: { title: '图书列表', icon: 'edit', roles: ['editor'] }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
