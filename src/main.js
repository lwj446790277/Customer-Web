import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false;

import axios from 'axios'
Vue.prototype.$axios=axios;

  axios.defaults.baseURL='http://192.168.0.169:8080/zhita_xiaodai_admin/'

Vue.use(ElementUI);

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
