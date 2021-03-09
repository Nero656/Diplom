import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import InputMask from 'vue-input-mask';
import 'vue-tel-input/dist/vue-tel-input.css'

Vue.component('input-mask', InputMask)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
