<template>
  <div id="app">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--    <img src="./assets/RedDeadRedemption.jpg">-->
    <!--    ***************************************-->
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">你好，想你</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li>
              <router-link to="/">首页</router-link>
            </li>
            <li>
              <router-link to="/wanna_to_do">我们想做的事情</router-link>
            </li>
            <li>
              <router-link to="/source_share">我们的文章</router-link>
            </li>
            <li>
              <router-link to="/our_poem">我们的诗歌</router-link>
            </li>
            <li>
              <router-link to="/dataHandle">数据处理</router-link>
            </li>
            <li>
              <router-link to="/poet_rating">其他数据</router-link>
            </li>
          </ul>

          <ul v-if="this.$store.state.token" class="nav navbar-nav navbar-right">
            <li><a href="#">{{this.$store.state.username}}</a></li>
            <li><a href="http://112.74.79.57" @click="logout">注销</a></li>
          </ul>
          <ul v-else class="nav navbar-nav navbar-right">
            <li>
              <router-link to="/auth_login">登录</router-link>
            </li>
            <li><a href="http://112.74.79.57:8888/api/reg/">注册</a></li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>

  export default {
    name: 'App',
    data() {
      return {
        isRouterAlive: true
      }
    },
    // 一个重载当前页面的方法
    provide() {
      return {
        reload: this.reload
      }
    },
    methods: {
      logout() {
        this.$store.commit('clearCookie');
      },
      // 实现重载页面的方法,还需要再需要重载数据的组件设置
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      }
    }
  }
</script>

<style>
  /*#app {*/
  /*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*  -webkit-font-smoothing: antialiased;*/
  /*  -moz-osx-font-smoothing: grayscale;*/
  /*  text-align: center;*/
  /*  color: #2c3e50;*/
  /*  margin-top: 60px;*/
  /*}*/
</style>
