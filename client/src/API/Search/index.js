import axios from 'axios'

async function listUsers () {
  let res

  try {
    res = await axios({
      method: 'GET',
      url: `/api/users`
    })

    return res.data
  } catch (e) {
    return {
      success: false,
      errMsg: 'Failed /api/users/'
    }
  }
}

export default {
  listUsers
}
