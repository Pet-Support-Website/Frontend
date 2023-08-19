import apiClient from './AxiosClient.js'

export default {
  getTags() {
    return apiClient.get('/tags')
  },
  searchTags(tagname) {
    return apiClient.get('/searchTags?_tagname=' + tagname)
  }
}
