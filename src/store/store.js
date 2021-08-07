import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'vue-cookies'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: Cookie.get('username'),
    token: Cookie.get('token'),
    avatar: Cookie.get('avatar'),
  },
  mutations: {
    saveCookie(state, data) {
      // 注意在state里赋值数据，这样才能实时在this.$store里更新，Cookie只是设置cookies，state之前获取的还是空的
      state.username = data.username;
      state.token = data.token;
      state.avatar = data.avatar;
      Cookie.set('username', data.username, '60min');
      Cookie.set('token', data.token, '60min');
      Cookie.set('avatar', data.avatar, '60min');

    },
    clearCookie() {
      Cookie.remove('username');
      Cookie.remove('token');
      Cookie.remove('avatar');

    }
  }
})
