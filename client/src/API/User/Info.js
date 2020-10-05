import axios from 'axios'

import store from '@/store'

// Get logined user self's basic information
async function getBasicInfo () {
  let res

  try {
    res = await axios({
      method: 'GET',
      url: 'api/user/info'
    })

    return res.data
  } catch (e) {
    return {
      result: false,
      errMsg: 'Failed api/user/info'
    }
  }
}

// Get logined user self's and following's posts
async function getPosts () {
  let res

  try {
    res = await axios({
      method: 'GET',
      url: '/api/user/posts'
    })

    return res.data
  } catch (e) {
    return {
      result: false,
      errMsg: '/api/user/posts falied'
    }
  }
}

export default {
  getBasicInfo,
  getPosts
}
