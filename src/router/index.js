import Vue from 'vue'
import Router from 'vue-router'
import HomeRoute from '../routes/HomeRoute.vue'
import DatabaseRoute from '../routes/DatabaseRoute.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomeRoute',
      component: HomeRoute
    },
    {
      path: '/db',
      name: 'DatabaseRoute',
      component: DatabaseRoute
    }
  ]
})
