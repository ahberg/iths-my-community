import axios from 'axios'

// Get logined user self's basic information
async function getBasicInfo (username) {
  let res

  try {
    res = await axios({
      method: 'GET',
      url: `/api/users/${username}`
    })

    return res.data
  } catch (e) {
    return {
      success: false,
      errMsg: 'Failed api/user/info'
    }
  }
}

// Get logined user self's and following's posts
async function getPosts (username) {
  let res

  try {
    res = await axios({
      method: 'GET',
      url: `/api/users/posts${username}`
    })

    return res.data
  } catch (e) {
    return {
      success: false,
      errMsg: '/api/user/posts falied'
    }
  }
}

export default {
  getBasicInfo,
  getPosts
}
