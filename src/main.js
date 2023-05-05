import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import router from './routes';
import {store} from './store/store';

Vue.config.productionTip = false
Vue.use(bootstrap);
Vue.use(Vuelidate);


Vue.prototype.$http = axios;

new Vue({
  store,
  render: h => h(App),
  router,
}).$mount('#app')
