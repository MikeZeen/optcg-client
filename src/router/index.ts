import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DatabaseView from '../views/DatabaseView.vue'
import CardView from '../views/CardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/db/card/:cardId',
      name: 'card',
      component: CardView
    },
    {
      path: '/db',
      name: 'database',
      component: DatabaseView
    }
  ]
})

export default router
