import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/auth/Login'
// import SignUp Component
import Signup from '@/components/auth/Signup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ]
})
