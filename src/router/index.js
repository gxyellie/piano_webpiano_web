import Vue from 'vue'
import Router from 'vue-router'
import Piano from '@/components/Piano'
import function1 from '@/components/function1'
import function2 from '@/components/function2'
import function3 from '@/components/function3'

Vue.use(Router)

export default new Router({
  mode: "hash",
  routes: [
    {
      path: '/',
      redirect: '/piano',
    },
    {
      path: '/piano',
      component: Piano,
    },
    {
      path: '/f1',
      component: function1,
    },
    {
      path: '/f2',
      component: function2,
    },
    {
      path: '/f3',
      component: function3,
    },
  ]
})
