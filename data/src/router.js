import Vue from 'vue'
import Router from 'vue-router'
import stu_table from "./components/stu_table";

// import router from "@vue/cli-service/generator/router/template/src/router";

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'stu_table',
      component: stu_table
    },
    {
      path: '/add',
      name: 'stu_add',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/components/stu_add.vue')
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import('@/components/stu_edit.vue')
    },
    {
      path: '/vue',
      redirect: '/'
    },
    {
      path:'*',
      name: 'noFound',
      component: () => import('@/components/noFound.vue'),
      beforeEnter(to, from,next) {
        if(!from.name){
          next()
        }
      }
    }
  ]
})
