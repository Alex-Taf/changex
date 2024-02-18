import { createRouter, createWebHashHistory } from 'vue-router'
import { getCookie } from '@/utils'
import Login from '../views/Login.vue'
import Finances from '../views/Finances.vue'
import Cards from '../views/Cards.vue'
import Payments from '../views/Payments.vue'
import Disputs from '../views/Disputs.vue'
import Devices from '../views/Devices.vue'
import Notifications from '../views/Notifications.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      meta: { auth: false },
      component: Login
    },
    {
      path: '/finances',
      name: 'finances',
      meta: { auth: true },
      component: Finances
    },
    {
      path: '/cards',
      name: 'cards',
      meta: { auth: true },
      component: Cards
    },
    {
      path: '/payments',
      name: 'payments',
      meta: { auth: true },
      component: Payments
    },
    {
      path: '/disputs',
      name: 'disputs',
      meta: { auth: true },
      component: Disputs
    },
    {
      path: '/devices',
      name: 'devices',
      meta: { auth: true },
      component: Devices
    },
    {
      path: '/notifications',
      name: 'notifications',
      meta: { auth: true },
      component: Notifications
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.auth)

  const isLogin = getCookie('changexlogin')

  if (requireAuth && !isLogin) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
