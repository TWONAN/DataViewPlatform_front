import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'vue-cookies'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: Cookie.get('username'),
    token: Cookie.get('token')
  },
  mutations: {
    saveCookie(state, data) {
      // 注意在state里赋值数据，这样才能实时在this.$store里更新，Cookie只是设置cookies，state之前获取的还是空的
      state.username = data.username;
      state.token = data.token;
      Cookie.set('username', data.username, '60min');
      Cookie.set('token', data.token, '60min')
    },
    clearCookie() {
      Cookie.remove('username');
      Cookie.remove('token')
    }
  }
})
