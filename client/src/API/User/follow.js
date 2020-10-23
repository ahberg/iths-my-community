import axios from 'axios'


async function follow (userId) {
  let res

  try {
    res = await axios({
      method: 'POST',
      url: `/api/follow/${userId}`,
    })
  } catch (e) {
    return {
      success: false,
      messages: 'User follow failed'
    }
  }

  return res.data
}

async function unFollow (userId) {
  let res

  try {
    res = await axios({
      method: 'DELETE',
      url: `/api/follow/${userId}`,
    })
  } catch (e) {
    return {
      success: false,
      messages: 'User unfollow failed'
    }
  }

  return res.data
}

export default {
  follow,
  unFollow
}
