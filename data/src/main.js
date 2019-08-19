import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './plugins/element.js'
import '@/assets/css/index.css'
import router from './router'
import api from './api/index'
Vue.config.productionTip = false;
Vue.prototype.$api = api;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
