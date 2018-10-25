import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }else{
    document.title = "e账柜"
  }
  next()
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
