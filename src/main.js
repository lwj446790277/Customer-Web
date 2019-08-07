import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import { Message } from 'element-ui';
import 'element-ui/lib/theme-default/index.css'
Vue.prototype.$message = Message;
Vue.config.productionTip = false;

import axios from 'axios'

Vue.prototype.$axios = axios;

axios.defaults.baseURL = 'http://39.98.83.65:8080/zhita_xiaodai_admin/'
axios.defaults.withCredentials = true
axios.interceptors.response.use(function (res) {
    if (res.data == '404') {
        router.push({path: '/'});
        return false;
    } else if (res.data == '500') {
        Message({
            type: 'error',
            message: '没有权限'
        });
        router.push({path: '/'});
        return false;
    } else {
        return res;
    }
})
Vue.use(ElementUI);

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})
