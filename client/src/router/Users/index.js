import TopNavBar from '@/components/Bar/TopNavBar'

import UserProfileView from '@/View/Users/UserProfile'
import UsersView from '@/View/Users/'

export default [
  {
    path: '/users',
    name: 'Users',
    props: {
      TopNavBar: false,
      default: true
    },
    components: {
      TopNavBar,
      default: UsersView
    },
    meta: {
      title: `Users`
    }
  },
  {
    path: '/profile/:Username',
    name: 'UserProfile',
    props: {
      TopNavBar: false,
      default: true
    },
    components: {
      TopNavBar,
      default: UserProfileView
    },
    meta: {
      title: ``
    }
  }
]
