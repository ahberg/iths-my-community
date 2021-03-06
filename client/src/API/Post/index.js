import axios from 'axios'

import store from '@/store'

async function SendPost (request) {
  let res

  try {
    res = await axios({
      method: 'POST',
      url: `/api/post/`,
      data: request
    })
  } catch (e) {
    return {
      success: false,
      errMsg: '/api/post error'
    }
  }

  return res.data
}

async function DeletePost (createdAt) {
  let res

  try {
    res = await axios({
      method: 'DELETE',
      url: `/api/post/${createdAt}`
    })
  } catch (e) {
    return {
      success: false,
      errMsg: '/api/post delete error'
    }
  }

  return res.data
}

async function ToggleLike (postId) {
  let res

  try {
    res = await axios({
      method: 'GET',
      url: `/API/post/${postId}/like`,
      headers: {
        'x-auth': store.getters.authToken
      }
    })
  } catch (e) {
    return {
      success: false,
      errMsg: 'get likes error'
    }
  }

  return res.data
}

async function GetDetailPostInfo (postId) {
  let res

  try {
    res = await axios({
      method: 'GET',
      url: `/api/post/${postId}`
    })
  } catch (e) {
    return {
      success: false,
      errMsg: '/api/post/:postId'
    }
  }

  return res.data
}

export default {
  SendPost,
  ToggleLike,
  GetDetailPostInfo,
  DeletePost
}
