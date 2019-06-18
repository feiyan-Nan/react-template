import request from '@/plugin/request'
export default {
  /**
   * 获取关于我的评论内容
   * @param params
   */
  getAboutComments(params = '') {
    return request.post('/index',params)
  },
  /**
   * 获取文章列表
   * @param params
   * @returns {*}
   */
  fetchList (params) {
    return request.get('/article/getList',params)
  },
  articleDelete ({articleId}) {
    return request.delete('/article/delete', {articleId})
  },
  /**
   * 通过文章id获取文章的内容
   * @param articleId
   * @returns {*}
   */
  getArticleById(articleId) {
    return request.get(`/article/get/${articleId}`)
  },
  createArticle (params) {
    return request.post(`/article/create`, params)
  },
  editArticle (params) {
    return request.put(`/article/update`, params)
  },
  /**
   * 获取Tag的链表
   */
  getTagsList () {
    return request.get('/tags/getList')
  },
  getCategories () {
    return request.get('/categories/getList')
  }
}
