import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Toast } from 'vant';
import axios from 'axios'
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.prototype.$Get = function(url, config, success, fail=function(err){console.log(err);Toast.fail(err)}){
  this.$http.get(url,config).then(function(res){
      if(res.data.msgCode == "40000"){
          success(res)
      }else{
          if(res.data.msg){
              Toast.fail(res.data.msg)
          }else{
              console.error(res)
          }
          fail(res.data.msg)
      }
  }).catch(function(err){
      fail(err)
      console.error(err)
  })
}

Vue.prototype.$Post = function(url, config, success, fail){
  this.$http.post(url,config).then(function(res){
      if(res.data.msgCode == "40000"){
          if(res.data.msg){
            Toast.success(res.data.msg)
          }
          success(res)
      }else{
          fail(res)
          console.warn(res)
      }
  }).catch(function(err){
      fail(err)
    //   Toast.fail(err)
      console.error(err)
  })
}


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
  router,
  store
}).$mount('#app')
