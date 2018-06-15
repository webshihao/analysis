// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import { getCookie, setCookie, delCookie } from './util/util'
import './assets/theme.scss';
// 必须让用户从登陆页开始进 前端模拟token验证
router.beforeEach((to, from, next) => {
    let token = getCookie('user_cookie');
    if (!token && to.path != '/login') {
        next({ path: '/login' })
    } else {
        next()
    }
   
})
import VueDND from 'awe-dnd'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueDND)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
