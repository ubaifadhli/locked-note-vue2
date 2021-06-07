import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../views/LoginPage'
import NotesPages from "@/views/NotesPage";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LoginPage
  },
  {
    path: '/notes',
    name: 'Notes',
    component: NotesPages
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
