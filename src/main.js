import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './api'
import '@/assets/css/base.css'

Vue.config.productionTip = false
Vue.prototype.$api = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
