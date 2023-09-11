import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  diagnosisSearch(query) {
    return apiClient.get('/search_solr?query=' + query)
  }
}
