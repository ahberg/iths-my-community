import moment from 'moment'

import userAuth from '@/API/User/Auth'

const state = {
  isAuthChecked: false,
  user: null,
  authToken: null,
  loginTime: null,
  maxDurationTime: moment.duration(1 * 60 * 60 * 1000).asHours()
}

const getters = {
  isLogin: state => !!state.user,
  isAuthChecked: state => !!state.isAuthChecked,
  isInMaxDurationTime: state => () => {
    return (
      moment.duration(moment().diff(state.loginTime)).asHours() <
      state.maxDurationTime
    )
  },
  userID: state => state.user && state.user.id,
  userAccount: state => state.user && state.user.username,
  userFollowing: state => state.user && state.user.following,
  authToken: state => state.authToken
  
}

const actions = {
  regist: async ({ commit} ,para) => {
    if (!para.name || !para.username || !para.password) {
      return {
        message: 'Empty fields',
        success: false
      }
    }

    let  res  = await userAuth.regist(para)
    return res
  },
  login: async ({ commit }, para) => {
    if (!para.username || !para.password) {
      return {
        message: 'No username or password',
        succcess: false
      }
    }
    let { res, token } = await userAuth.login(para)
   
    if (res.success) {
      commit('setUser', res.user)
      commit('setAuthToken', token)
      commit('setLoginTime', moment())
      window.localStorage.setItem('AuthToken', token)
      console.log('save token' + token)
    }
    return res
  },
  logout: ({ commit }) => {
    window.localStorage.removeItem('AuthToken')
    commit('setUser', null)
    commit('setAuthToken', null)
    commit('setLoginTime', null)
  },
  checkAuth: async ({ commit }) => {
    commit('setIsAuthChecked', true)

    let currentToken = window.localStorage.getItem('AuthToken')
    if (!currentToken) {
      return {
        success: false,
        errMsg: 'No Auth Token'
      }
    }

    let { res, token } = await userAuth.checkAuth(currentToken)
    if (res.success) {
      console.log('valid token')
      window.localStorage.setItem('AuthToken', token)
      commit('setUser', res.user)
      commit('setAuthToken', token)
      commit('setLoginTime', moment())
    } else {
      // window.localStorage.removeItem('AuthToken')
      commit('setUser', null)
      commit('setAuthToken', null)
      commit('setLoginTime', null)
    }

    return res
  }
}

const mutations = {
  setUser: (state, user) => {
    state.user = user
  },
  setIsAuthChecked: (state, boolean) => {
    state.isAuthChecked = boolean
  },
  setAuthToken: (state, token) => {
    state.authToken = token
  },
  setLoginTime: (state, time) => {
    state.loginTime = time
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
