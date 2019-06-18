import * as constants from '@/redux/constants'
import jwtDecode from 'jwt-decode'
import db from '@/plugin/db'

let defaultState = {
  userId: 0,
  username: '',
  auth: 0,
  avatarColor: '#52c41a' // 用户头像颜色
}

let token = db.ls.get('token')
if (!!token && token !== "undefined") {
  const { userId, username, auth } = jwtDecode(token)
  defaultState = Object.assign(defaultState, { userId, username, auth })
}

const userReducer = (state = defaultState, action) => {
  const {type, payload} = action
  switch (type) {
    case constants.USER_LOGIN:
      const {userId, username, auth} = jwtDecode(payload.token)
      return {...state, userId, username, auth}
    case constants.USER_LOGINOUT:
      return state
    default:
      return state
  }
}

export default userReducer
