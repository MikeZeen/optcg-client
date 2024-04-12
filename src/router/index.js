import Vue from 'vue'
import Router from 'vue-router';
import HomeRoute from '../routes/HomeRoute.vue'
import FailedRoute from '../routes/FailedRoute.vue'
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
      path: '/db/:page&:perPage',
      name: 'DatabaseRoute',
      component: DatabaseRoute
    },
    {
      path: '*',
      name: 'FailedRoute',
      component: FailedRoute
    }
  ],
})
