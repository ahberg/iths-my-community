import axios from 'axios'

async function login (request) {
  let res

  try {
    res = await axios.post('/api/user/login', request)
  } catch (e) {
    return {
      res: {
        success: false,
        errMsg: e
      },
      token: null
    }
  }
  axios.defaults.headers.common['Authorization'] = res.data.token
  return {
    res: res.data,
    token: res.data.token
  }
}

async function regist (request) {
  let res

  try {
    res = await axios.post('/api/user/', request)
  } catch (e) {
    console.log(e.response.data)
    return {
      res: {
        success: false,
        message: e.response.data.message
      },
      token: null
    }
  }

  return {
    res: res.data,
    token: res.headers['x-auth']
  }
}

async function checkAuth (token) {
  let res
  axios.defaults.headers.common['Authorization'] = token
  

  try {
    res = await axios({
      method: 'get',
      url: '/api/user/info'
    })
  } catch (e) {
    return {
      res: {
        success: false,
        errMsg: 'error1'
      },
      token: null
    }
  }
  axios.defaults.headers.common['Authorization'] = res.data.token
  return {
    res: res.data,
    token: res.data.token
  }
}

export default {
  login,
  regist,
  checkAuth
}
