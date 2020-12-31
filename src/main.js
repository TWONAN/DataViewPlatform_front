// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import echarts from 'echarts'
import $ from 'jquery'
import 'bootstrap3/dist/css/bootstrap.min.css'
import 'bootstrap3/dist/js/bootstrap.min'
import VueKindEditor from './plugin/kindeditor.js'
import '../static/kindeditor/themes/default/default.css'
import '../static/kindeditor/kindeditor-all-min.js'
import '../static/kindeditor/lang/zh-CN.js'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.use(VueKindEditor);
Vue.use(ViewUI);
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.$host = 'http://127.0.0.1:8000/';// 服务器路径常量
new Vue({
  el: '#app',
  router,
  store,
  $,
  components: {App},
  template: '<App/>'
});

router.beforeEach(function (to, from, next) {
  if (to.meta.requireAuth) {
    if (store.state.token) {
      next()
    } else {
      next({
        name: 'auth_login',
        query: {backUrl: to.fullPath}
      })
    }
  } else {
    next()
  }
});
