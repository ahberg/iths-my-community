import axios from 'axios'
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
  updateUser
}
