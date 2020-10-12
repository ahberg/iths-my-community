import TopNavBar from '@/components/Bar/TopNavBar'
import UsersView from '@/View/Users'

export default [{
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
}]
