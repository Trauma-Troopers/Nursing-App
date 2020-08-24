import Vue from 'vue'
import Router from 'vue-router'
import VueSession from 'vue-session'
import VueCryptojs from 'vue-cryptojs'
import VueSimpleAlert from "vue-simple-alert";

import Home from '@/components/layout/Home'
import WelcomeRedirect from '@/components/layout/WelcomeRedirect'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import CheckList from '@/components/layout/CheckList'
import Admin from '@/components/layout/Admin'
import ReadMe from '@/components/layout/ReadMe'
import CheckDoc from '@/components/layout/CheckDoc'
import PasswordReset from "@/components/auth/PasswordReset"
import Confirmation from "@/components/auth/Confirmation"
 
Vue.use(VueSimpleAlert);
Vue.use(VueCryptojs)
Vue.use(VueSession)
Vue.use(Router)

export const router = new Router({
  // changes those slashed inside of the main URL
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },{
      path: '/',
      name: 'WelcomeRedirect',
      component: WelcomeRedirect,
    }, {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    }, {
      path: '/login',
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
    }, {
      path: '/passwordreset',
      name: 'PasswordReset',
      component: PasswordReset
    }, {
      path: '/confirmation',
      name: 'Confirmation',
      component: Confirmation
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