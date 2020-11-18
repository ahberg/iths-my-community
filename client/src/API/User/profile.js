import axios from 'axios'

// Get logined user self's basic information
async function getBasicInfo (username) {
  let res

  try {
    res = await axios({
      method: 'GET',
      url: `/api/profile/${username}`
    })

    return res.data
  } catch (e) {
    return {
      success: false,
      errMsg: 'Failed api/profile'
    }
  }
}


export default {
  getBasicInfo,
}
