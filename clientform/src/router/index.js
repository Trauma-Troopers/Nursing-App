import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import CheckList from '@/components/layout/CheckList'
import Admin from '@/components/layout/Admin'
import ReadMe from '@/components/layout/ReadMe'
import CheckDoc from '@/components/layout/CheckDoc'

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
    }, {
      path: '/checklist',
      name: 'CheckList',
      component: CheckList
    }, {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }, {
      path: '/readme',
      name: 'ReadMe',
      component: ReadMe
    }, {
      path: '/checkdoc',
      name: 'CheckDoc',
      component: CheckDoc
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