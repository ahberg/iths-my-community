import axios from 'axios'

async function login (request) {
  let res;

  try {
    res = await axios.post('http://172.17.0.1:3009/api/users/login', request)
  } catch(e) {
    return {
      res: {
        result: false,
        errMsg: e
      },
      token: null
    }
  }

  return {
    res: res.data,
    token: res.headers['x-auth']
  }
}

async function regist (request) {
  let res;

  try {
    res = await axios.post('/API/user/', request)
  } catch (e) {
    return {
      res: {
        result: false,
        errMsg: '無法連接伺服器'
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
  let res;

  try {
    res = await axios({
        method: 'get',
        url: '/API/user/',
        headers: {
          'x-auth': token
        }
      })
  } catch (e) {
    return {
      res: {
        result: false,
        errMsg: '無法連接伺服器'
      },
      token: null
    }
  }

  return {
    res: res.data,
    token: res.headers['x-auth']
  }
}

export default {
  login,
  regist,
  checkAuth,
}
