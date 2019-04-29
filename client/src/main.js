import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
// import Myapp from './myApp.vue';
import swal from 'sweetalert2';
import axios from './api/axios';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.prototype.$axios = axios;
Vue.prototype.$swal = swal;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
