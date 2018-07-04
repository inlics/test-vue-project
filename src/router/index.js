import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const Helloworld = (resolve) => {
  import('@/components/HelloWorld').then((module) => {
    resolve(module)
  })
}

export default new Router({
  mode: 'history',
	routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Helloworld,
      meta: {keepAlive: false}
    }
  ]
})
