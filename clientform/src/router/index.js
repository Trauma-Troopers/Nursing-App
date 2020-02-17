import Vue from 'vue'
import Router from 'vue-router'
// Imports Signup
import Signup from '@/components/auth/Signup'
//  imports login 
import Login from '@/components/auth/Login'

Vue.use(Router)

const router = new Router({
  // changes those slashed inside of the main URL
  mode: 'history',
  routes: [
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }, {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})

// Creates Routeguard
// fires a function before each route is loaded into the DOM

router.beforeEach((to, from, next) => {
  // checks the routes for Metadata properites
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // check the auth state of the user
    let user = firebase.auth().currentUser
    // check and see if the user exisits
    if (user) {
      // user is signed in, allow proceeding to the route
      next()
    } else {
      // not signed in, redirect to login page
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

// Exports the router object for other components
export default router