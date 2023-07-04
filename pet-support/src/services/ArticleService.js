import apiClient from './AxiosClient.js'

export default {
    getArticles() {
        return apiClient.get('/article')
    }
}