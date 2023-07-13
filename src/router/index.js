import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ArticleService from '@/services/ArticleService.js'
import GStore from '@/store'
import NetWorkErrorView from '@/views/NetworkErrorView.vue'
import CardLayoutView from '@/views/Pets/CardLayoutView.vue'
import ArticleDetailsView from '@/views/Pets/ArticleDetailsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: () => {
      return ArticleService.getArticles()
        .then((response) => {
          GStore.articles = response.data
          console.log(GStore.article)
        })
        .catch(() => {
          GStore.articles = []
          console.log('cannot load article')
          return { name: 'NetworkError' }
        })
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/:articleFilter',
    name: 'CardLayoutView',
    component: CardLayoutView,
    props: true
  },
  {
    path: '/article/:id',
    name: 'ArticleDetailsView',
    component: ArticleDetailsView,
    props: true,
    beforeEnter: (to) => {
      return ArticleService.getArticle(to.params.id)
        .then((response) => {
          GStore.article = response.data
        })
        .catch((error) => {
          if (error.response && error.response.start == 404) {
            return {
              name: 'Network Error',
              params: { resource: 'article' }
            }
          } else {
            return { name: 'NetworkError' }
          }
        })
    }
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetWorkErrorView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
