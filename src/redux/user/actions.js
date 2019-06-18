import * as constants from '@/redux/constants'
import UserService from '@/service/user'
import {message} from "antd";
import db from '@/plugin/db'

/**
 * 登录操作本地记录token
 * @param username 用户名
 * @param password 密码
 * @returns {Function} 处理reducer改变store中的数据
 */
export const login = ({username,password}) => {
  return async dispatch =>{
    let result = await UserService.login({username, password})
    if (result.code === 200) {
      db.ls.set('token', result.token)
      dispatch({type: constants.USER_LOGIN, payload: {token:result.token}})
    } else {
      message.error(result.message)
    }
  }
}

export const register = ({username,password}) => {
  return dispatch => {
    UserService.register('/register', {username,password}).then(res => {
      if (res.code === 200) message.success(res.message)
      else message.error(res.message)
    })
  }
}
export const logout = () => {
  db.ls.remove('token')
  return {type: constants.USER_LOGINOUT}
}













