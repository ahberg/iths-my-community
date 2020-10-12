import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'
import HomeRouter from './Home'
import UsersRouter from './Users'
import LoginRouter from './login'
import RegistRouter from './regist'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    ...LoginRouter,
    ...RegistRouter,
    ...UsersRouter,
    ...HomeRouter
  ]
})


router.beforeEach( async (to, from, next) => {
  if (!store.getters.isAuthChecked ||
      (store.getters.isLogin && !store.getters.isInMaxDurationTime())){
    await store.dispatch('checkAuth')
    console.log('Auth Updated')
  }

  if(to.meta.requireNotLogin && store.getters.isLogin)
    return next('/')

  if(to.meta.title)
    document.title = to.meta.title

  next()
})

export default router
