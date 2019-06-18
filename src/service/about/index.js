import request from '@/plugin/request'
export default {
  /**
   * 获取关于我的评论内容
   * @param params
   */
  getAboutComments() {
    return request.get('/comment/getAboutComments')
  }
}
