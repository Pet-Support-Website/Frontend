import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ArticleService from '@/services/ArticleService.js'
import TagService from '@/services/TagService.js'
import CardLayoutByTagView from '@/views/Pets/CardLayoutByTagView.vue'
import GStore from '@/store'
import NetWorkErrorView from '@/views/NetworkErrorView.vue'
import CardLayoutView from '@/views/Pets/CardLayoutView.vue'
import ArticleDetailsView from '@/views/Pets/ArticleDetailsView.vue'
import DiagnosisView from '@/views/DiagnosisView.vue'
import LocationView from '@/views/LocationView.vue'
import Login from '@/views/LoginView.vue'
import AddArticle from '@/views/AddArticleView.vue'
import AllArticlesView from '@/views/AllArticlesView.vue'
import EditArticleView from '@/views/EditArticleView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/diagnosis-system',
    name: 'diagnosis system',
    component: DiagnosisView
  },
  {
    path: '/location-system',
    name: 'location system',
    component: LocationView
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/all-articles',
    name: 'all-article',
    component: AllArticlesView,
    props: true,
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
    path: '/add-article',
    name: 'AddArticle',
    component: AddArticle,
    beforeEnter: () => {
      return TagService.getTags()
        .then((response) => {
          GStore.tags = response.data
          console.log(GStore.tags)
        })
        .catch(() => {
          GStore.tags = null
          console.log('cannot load tags')
        })
    }
  },
  {
    path: '/edit-article/:id',
    name: 'EditArticleView',
    component: EditArticleView,
    props: true,
    beforeEnter: (to) => {
      return ArticleService.getArticle(to.params.id)
        .then((response) => {
          GStore.article = response.data
          document.title = response.data.title
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
    path: '/:articleFilter',
    name: 'CardLayoutView',
    component: CardLayoutView,
    props: true,
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
    path: '/article/:id',
    name: 'ArticleDetailsView',
    component: ArticleDetailsView,
    props: true,
    beforeEnter: (to) => {
      return ArticleService.getArticle(to.params.id)
        .then((response) => {
          GStore.article = response.data
          document.title = response.data.title
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
    path: '/searchTags/:tagname',
    name: 'CardLayoutByTagView',
    component: CardLayoutByTagView,
    props: true,
    beforeEnter: (to) => {
      return TagService.searchTags(to.params.tagname)
        .then((response) => {
          GStore.searchArticles = response.data[0].articles
          document.title = response.data[0].tagname
        })
        .catch((error) => {
          if (error.response && error.response.start == 404) {
            return {
              name: 'Network Error',
              params: { resource: 'tag' }
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

router.beforeEach((to, from, next) => {
  let documentTitle = `${to.name}`
  if (to.params.articleFilter) {
    documentTitle = `general ${to.params.articleFilter} care`
  } else if (to.params.tagname) {
    documentTitle = `tag ${to.params.tagname}`
  }
  document.title = documentTitle
  next()
})

export default router
