// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import { getCookie, setCookie, delCookie } from './util/util'
import './assets/theme.scss';
// 没有token就会到login
router.beforeEach((to, from, next) => {
    let token = getCookie('user_cookie');
    if (!token && to.path != '/login') {
        next({ path: '/login' })
    } else {
        next()
    }
   
})
// import 'element-ui/lib/theme-chalk/index.css';
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
