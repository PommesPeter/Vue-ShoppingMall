import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from "axios";
import Global from "./components/Global";

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$global = Global
axios.defaults.baseURL = '/'
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
