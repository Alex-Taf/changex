import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Finances from '../views/Finances.vue'
import Cards from '../views/Cards.vue'
import Payments from '../views/Payments.vue'
import Disputs from '../views/Disputs.vue'
import Devices from '../views/Devices.vue'
// Use store for get logged in flag to check user is logged in.
// Flag used in router guard
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.auth)

  const userStore = useUserStore()
  const { isLogin } = storeToRefs(userStore)

  if (requireAuth && !isLogin.value) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
