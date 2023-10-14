import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { config } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import GStore from './store/index.js'
// import store from './store/store.js'

library.add(faUserSecret)
config.styleDefault = 'solid'

createApp(App)
  .provide('GStore', GStore)
  .use(router)
  // .use(store)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
