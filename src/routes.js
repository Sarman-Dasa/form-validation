import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      name: 'Home',
      path: '/',
      component: () => import('@/components/Home.vue')
    },
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/components/Login.vue')
    },
    {
      name: 'Registration',
      path: '/registration',
      component: () => import('@/components/UserForm.vue')
    },
    {
      name: 'TodoList',
      path: '/todo',
      component: () => import('@/components/Todo.vue')
    },
    {
      name: 'FileUpload',
      path: '/file-upload',
      component: () => import('@/components/FileUpload.vue')
    },
    {
      name: 'UserList',
      path: '/user-list',
      component: () => import('@/components/UserList.vue')
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})
export default router