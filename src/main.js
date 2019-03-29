// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
// axios
import Axios from 'axios'
Axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$axios = Axios

// 注册全局过滤器
Vue.filter('formatting', function (value) {
  return new Date(value).toLocaleString()
})

Vue.config.productionTip = false
// 配置axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
