import apiClient from './AxiosClient.js'

export default {
  getArticles() {
    return apiClient.get('/article')
  },
  getArticle(id) {
    return apiClient.get('/article/' + id)
  },
  getArticlesByTag(tag) {
    return apiClient.get('/article/' + tag)
  }
}
