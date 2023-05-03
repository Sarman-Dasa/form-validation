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
      path: '*',
      redirect: 'error-404',
    },
  ],
})
export default router