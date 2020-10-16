import Home from '@/View/Home'
import EditProfile from '@/View/Home/EditProfile'
import TopNavBar from '@/components/Bar/TopNavBar'

import UserHome from '@/View/Home/User'

import store from '@/store'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter (to, from, next) {
      if (store.getters.isLogin) {
        return next({ name: 'UserHome' })
      }

      document.title = 'My community'
      next()
    }
  },
  {
    path: '/',
    name: 'UserHome',
    components: {
      TopNavBar,
      default: UserHome
    },

    beforeEnter (to, from, next) {
      if (!store.getters.isLogin) {
        return next({ name: 'Home' })
      }

      return next()
    }
  },

  {
    path: '/:PersonAccount/edit',
    name: 'EditProfile',
    components: {
      TopNavBar,
      default: EditProfile
    },
    beforeEnter (to, from, next) {
      if (!store.getters.isLogin) {
        return next({ name: 'Home' })
      }

      return next()
    }
  }
]
