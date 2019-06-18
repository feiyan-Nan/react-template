import request from '@/plugin/request'

export default {
  login ({username, password}) {
    return request.post('/login', {username, password})
  },
  getUserList (params = {}) {
    return request.get('/user/getUserList', params)
  },
  userDelete (params = {}) {
    return request.delete('/user/delete', params)
  }
}
