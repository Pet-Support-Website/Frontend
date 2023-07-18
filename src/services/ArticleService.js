import apiClient from './AxiosClient.js'

export default {
  getArticles() {
    return apiClient.get('/article?_limit=200')
  },
  getArticle(id) {
    return apiClient.get('/article/' + id)
  },
  getArticlesByTag(tag) {
    return apiClient.get('/article/' + tag)
  }
}
