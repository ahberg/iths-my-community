import axios from 'axios'

import store from '@/store'

async function follow (userId) {
  let res
  let token = store.getters.authToken

  try {
    res = await axios({
        methods: 'get',
        url: `/API/user/follow/${userId}`,
        headers: {
          'x-auth': token
        }
      })
  } catch (e) {
    return {
      result: false,
      errMsg: '無法連接伺服器'
    }
  }

  return res.data
}

async function deleteFollow (userId) {
  let res
  let token = store.getters.authToken

  try {
    res = await axios({
        method: 'DELETE',
        url: `/API/user/follow/${userId}`,
        headers: {
          'x-auth': token
        }
      })
  } catch (e) {
    return {
      result: false,
      errMsg: '無法連接伺服器'
    }
  }

  return res.data
}

async function updateUser (userId, data) {
  let res

  try {
    res = await axios({
      method: 'PUT',
      url: `/api/users/${userId}`,
      data: data
    })
  } catch (e) {
    return {
      success: false,
      messages: 'User update failed'
    }
  }

  return res.data
}

export default {
  follow,
  deleteFollow,
  updateUser
}
