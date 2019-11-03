import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
// import SignUp Component
import Signup from '@/components/auth/Signup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ]
})
