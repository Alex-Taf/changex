import { createRouter, createWebHistory } from 'vue-router'
import Finances from '../views/Finances.vue'
import Cards from '../views/Cards.vue'
import Payments from '../views/Payments.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/finances',
      name: 'finances',
      component: Finances
    },
    {
      path: '/cards',
      name: 'cards',
      component: Cards
    },
    {
      path: '/payments',
      name: 'payments',
      component: Payments
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
