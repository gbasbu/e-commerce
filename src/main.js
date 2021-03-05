import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
// ENG: Setting up default vue's http modules for api calls & TR: Http modülü axios olarak atandı
Vue.prototype.$http = axios;
// ENG: Load the token from the localStorage & TR: Token yüklendi
const token = localStorage.getItem('token');
// ENG: Is there is any token then we will simply append default axios authorization headers & TR: Token varsa doğrulama atandı
if(token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
