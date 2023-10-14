import { createStore } from 'vuex'
import loginService from '../services/LoginService'
import router from '@/router'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
export default createStore({
  state: {
    loggedIn: false,
    users: [
      {
        username: 'kitti',
        password: 'kitti'
      },
      {
        username: 'admin',
        password: 'password'
      }
    ],
    currentUser: null,
    username: '',
    password: ''
  },
  actions: {
    login() {
      let result = loginService.login(
        this.state.username,
        this.state.password,
        this.state.users
      )
      if (result) {
        this.commit('loginSuccess')
        router.push('/')
      } else {
        this.commit('loginFail')
        alert('Invalid username or password')
      }
    },
    logout() {
      this.commit('resetState')
      this.commit('save')
      router.push('/login')
    }
  },
  mutations: {
    resetState(state) {
      this.state.loggedIn = false
      state.currentUser = null
      if (router.currentRoute.value.fullPath == '/bookmark') {
        router.go(-1)
      } else {
        router.push('')
      }
    },
    loginSuccess(state) {
      state.loggedIn = true
      state.currentUser = { username: this.state.username, favorites: [] }
      let selectedUser = state.users.find(
        (user) => user.username === state.currentUser.username
      )
      if (selectedUser != null) {
        state.currentUser.favorites = selectedUser.favorites
      }
      state.username = ''
      state.password = ''
    },
    loginFail(state) {
      state.loggedIn = false
      state.username = ''
      state.password = ''
    },
    setUsernameInput(state, input) {
      state.username = input
    },
    setPasswordInput(state, input) {
      state.password = input
    }
  },
  getters: {},
  modules: {},
  plugins: [vuexLocal.plugin]
})
