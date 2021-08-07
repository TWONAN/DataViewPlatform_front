<template>
  <div id="app" @click="createLoves($event)" v-on:mouseup="removeSmallHert">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--    <img src="./assets/RedDeadRedemption.jpg">-->
    <!--    ***************************************-->
    <div class="daohang">
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
              <li>
                <router-link to="/new_start">新开始</router-link>
              </li>
            </ul>

            <ul v-if="this.$store.state.token" class="nav navbar-nav navbar-right">
              <li v-if="this.$store.state.username == 'admin'">
                <Button type="primary" class="add_notice" data-toggle="modal" data-target="#noticeModel">添加提示</Button>
              </li>
              <li>
                <Button type="success" class="daily-sign" @click="sign_success('success')">每日签到
                </Button>
              </li>
              <li>
                <Button class="notice_daily" type="primary" @click="time">每日提醒</Button>
              </li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                   aria-expanded="false">{{this.$store.state.username}}<span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <li>
                    <router-link to="/private_index">个人中心</router-link>
                  </li>
                  <li role="separator" class="divider"></li>
                  <li><a href="http://112.74.79.57" @click="logout">注销</a></li>
                </ul>
              </li>
              <!--            显示头像-->
              <li>
                <div class="demo-avatar-badge">
                  <Badge :count="0">
                    <Avatar :src="$host + this.$store.state.avatar"/>
                  </Badge>
                </div>
              </li>
              <!--            显示签到数-->
              <li class="sign">
                {{this.sign_num}}
                <Icon type="md-heart"/>
              </li>
            </ul>
            <ul v-else class="nav navbar-nav navbar-right">
              <li>
                <router-link to="/auth_login">登录</router-link>
              </li>
              <!--            <li><a href="http://112.74.79.57:8888/api/reg/">注册</a></li>-->
            </ul>
          </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
      </nav>
      <!-- Modal -->
      <div class="modal fade" id="noticeModel" tabindex="-1" role="dialog" aria-labelledby="noticeModelLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="noticeModelLabel">添加每日提示</h4>
            </div>
            <div class="modal-body">
              <Input v-model="value" placeholder="Enter something..." style="width: 300px"/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="add_notice">提交</button>
            </div>
          </div>
        </div>
      </div>
      <div class="weather" id="weather-v2-plugin-standard"></div>
    </div>
    <transition :name="SkipSwitchName">
      <router-view v-if="isRouterAlive"></router-view>
    </transition>
    <background ref="background"></background>
  </div>
</template>

<script>
  import background from './components/background.vue'

  export default {
    name: 'App',
    data() {
      return {
        isRouterAlive: true,
        value: '',
        sign_num: 0,
        SkipSwitchName: ""
      }
    },
    // 一个重载当前页面的方法
    provide() {
      return {
        reload: this.reload
      }
    },
    mounted() {
      // 加载天气组件
      window.WIDGET = {
        CONFIG: {
          "layout": 1,
          "width": 1550,
          "height": 150,
          "background": 1,
          "dataColor": "FFFFFF",
          "borderRadius": 5,
          "key": "6s6kLGEga0"
        }
      };
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = "https://apip.weatherdt.com/standard/static/js/weather-standard-common.js?v=2.0";
      document.getElementsByTagName('head')[0].appendChild(script);
      // 如果用户登录获取签到数
      if (this.$store.state.username) {
        var _this = this;
        $.ajax({
          url: 'http://112.74.79.57:8888/api/daily_sign/',
          type: 'get',
          data: {
            username: _this.$store.state.username,
            usertoken: _this.$store.state.token
          },
          success: function (ret) {
            if (ret.code === 1000) {
              _this.sign_num = ret.data.sign_num
            } else {
              alert(ret.msg)
            }
          }
        })
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
      },
      // 通知消息
      time() {
        this.get_notice();
      },
      // 添加提示
      add_notice() {
        var _this = this;
        $.ajax({
          url: 'http://112.74.79.57:8888/api/daily_notice/',
          type: 'post',
          data: {
            usertoken: this.$store.state.token,
            username: this.$store.state.username,
            content: _this.value
          },
          success: function (ret) {
            if (ret.code === 1000) {
              alert(ret.msg)
            } else {
              alert(ret.msg)
            }
          }
        })
      },
      // 获取每日小提示
      get_notice() {
        var _this = this;
        $.ajax({
          url: 'http://112.74.79.57:8888/api/daily_notice/',
          type: 'get',
          success: function (ret) {
            if (ret.code === 1000) {
              _this.$Notice.open({
                title: '每日小贴士',
                desc: ret.data.content,
                duration: 0
              });
            } else {
              alert(ret.msg)
            }
          }

        })
      },
      // 每日签到
      sign_success(type) {
        var nowdate = this.getToday();   //获取到今天日期
        var _this = this;
        $.ajax({
          url: 'http://112.74.79.57:8888/api/daily_sign/',
          type: 'post',
          data: {
            currentDate: nowdate,
            usertoken: this.$store.state.token,
            username: this.$store.state.username,
          },
          success: function (ret) {
            if (ret.code === 1000) {
              _this.$Message['success']({
                background: true,
                content: '每日点一下，❤+1哦~'
              });
            } else {
              _this.$Message['warning']({
                background: true,
                content: '今日已经点过了哦~'
              });
            }
          }
        });
      },
      // 获取日期
      getToday() {
        var date = new Date;
        var Year = date.getFullYear();
        var month = date.getMonth() + 1 <
        10 ? "0" + String(date.getMonth() + 1) : date.getMonth() + 1;
        var strDate = date.getDate() < 10 ? "0" + String(date.getDate()) : date.getDate();
        var setDate = Year + "-" + String(month) + "-" + String(strDate);
        console.log(setDate);
        return setDate
      },
      // 生成爱心
      createLoves() {
        this.$refs.background.createLoves(event);
        setTimeout(() => {
          this.removeSmallHert();
        }, 400);
      },
      // 消除爱心
      removeSmallHert() {
        this.$refs.background.removeSmallHert()
      },
    },
    watch: {
      $route(to, from) {
        if (to.meta.index > from.meta.index) {
          this.SkipSwitchName = "Skright";
        } else {
          this.SkipSwitchName = "Skleft";
        }
      },
    },
    created() {
      setTimeout(() => {
        window.L2Dwidget.init({
          pluginRootPath: "static/live2dw/",
          pluginJsPath: "lib/",
          pluginModelPath: "live2d-widget-model-shizuku/assets/",
          tagMode: false,
          debug: false,
          model: {
            jsonPath:
              "static/live2dw/live2d-widget-model-shizuku/assets/shizuku.model.json"
          },
          display: {position: "right", width: 200, height: 300},
          mobile: {show: true},
          log: false
        });
      }, 1000);
    },
    components: {background},
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
  html, body, #app {
    height: 100%;
  }

  .notice_daily {
    margin-top: 10px;
  }

  .daily-sign {
    margin-top: 10px;
    margin-right: 10px;
  }

  .add_notice {
    margin-top: 10px;
    margin-right: 10px;
  }

  .demo-avatar-badge {
    padding-top: 10px;
  }

  .sign {
    padding-left: 10px;
    padding-top: 15px;
  }

  .Skright-enter-active,
  .Skright-leave-active,
  .Skleft-enter-active,
  .Sklef-leave-active {
    transition: all 1s;
  }

  /*先给 所要用的上下层级跳转写一个过渡时间*/
  /*然后你就可以发挥自己的想象力来写自己动画了 下面是一个例子*/
  .Skright-enter {
    transform: translate3d(-100%, 0, 0);
  }

  .Skright-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  .Skleft-enter {
    transform: translate3d(100%, 0, 0);
  }

  .Skleft-leave-to {
    transform: translate3d(-100%, 0, 0);
  }
</style>
