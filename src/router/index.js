import Vue from 'vue'
import Router from 'vue-router'
import linkdump from '@/components/linkdump'
Vue.use(Router)

export default new Router({
  base: '/',
  mode: 'history',
  routes: [
    { path: '/', component: linkdump },
    { path: '/home', redirect: '/' }
  ]
})
