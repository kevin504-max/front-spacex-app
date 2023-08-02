import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://127.0.0.1:3300/api/'

new Vue({
  render: h => h(App),
}).$mount('#app')
