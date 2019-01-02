import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/chatlobby',
      name: 'chatlobby',
      component: () => import('./views/ChatLobby.vue')
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: () => import('./views/Chat.vue')
    }
  ]
})
