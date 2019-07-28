import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: require('@/pages/Login').default
    },

    {
      path: '/home',
      name: 'home',
      component: require('@/pages/Home').default,
      children:[
        {
          path:'/main',
          name:'main',
          component:require('@/pages/MainGroup').default
        },
        {
          path:'/second',
          name:'second',
          component:require('@/pages/SecondGroup').default
        },
        {
          path:'/department',
          name:'department',
          component:require('@/pages/Department').default
        },
        {
          path:'/user',
          name:'user',
          component:require('@/pages/User').default
        },
        {
          path:'/note',
          name:'note',
          component:require('@/pages/Note').default
        },
        {
          path:'/notelist/:type?',
          name:'notelist',
          component:require('@/pages/NoteList').default
        },
      ],
    },

    {
      path: '*',
      redirect: '/'
    }
  ]
})