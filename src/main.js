import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://127.0.0.1:3300/api/'

new Vue({
  render: h => h(App),
}).$mount('#app')
