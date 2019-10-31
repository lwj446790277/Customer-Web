import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import {Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'


Vue.prototype.$message = Message;
Vue.config.productionTip = false;

import axios from 'axios'
Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://192.168.8.104:8080/zhita_xiaodai_admin/'
//axios.defaults.baseURL = 'http://47.102.40.133:8081/zhita_xiaodai_admin/'
//axios.defaults.baseURL = 'https://mdbadm.tcc1688.com/zhita_xiaodai_admin/'
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

Vue.prototype.downloadExcel = function (url, param, fileName) {
    this.$confirm('确认下载', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        var that = this;
        that.axios({
            method: 'post',
            url: url,
            params: param,
            responseType: 'blob', //二进制流
        }).then(function (res) {
            if (!res) {
                return
            }
            var blob = new Blob([res.data])
            var url = window.URL.createObjectURL(blob);
            var aLink = document.createElement("a");
            aLink.style.display = "none";
            aLink.href = url;
            var nowDate = new Date();
            var year = nowDate.getFullYear();
            var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
            var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
            var todayString = year + "-" + month + "-" + day;
            aLink.setAttribute("download", fileName + todayString + ".xls");
            document.body.appendChild(aLink);
            aLink.click();
            document.body.removeChild(aLink);
            window.URL.revokeObjectURL(url);
        }).catch(function (error) {
            console.log(error)
        });
    }).catch(() => {
        this.$message({
            type: 'info',
            message: '已取消下载'
        });
    });

}


Vue.use(ElementUI);

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})
