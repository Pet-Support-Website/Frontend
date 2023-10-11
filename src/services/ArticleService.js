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
  },
  saveArticle(article) {
    return apiClient.post('/addArticle', article)
  },
  uploadFile(file) {
    let formData = new FormData()
    formData.append('file', file)
    return apiClient.post('/uploadFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  deleteArticle(article) {
    return apiClient.post('/deleteArticle', article)
  }
}
