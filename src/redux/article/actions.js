import * as constants from '@/redux/constants'

import ArticleService from '@/service/article'


export const getTags = () => {
  return dispatch => {
    ArticleService.getTagsList().then(res => {
      dispatch({ type: constants.TAG_GETLIST, payload: res.data })
    })
  }
}


export const getCategories = () => {
  return dispatch => {
    ArticleService.getCategories().then(res => {
      dispatch({ type: constants.CATEGORY_GETLIST, payload: res.data })
    })
  }
}
