<template>
  <div>
    <canvas class="particle"></canvas>
    <div id="box">
      <div id="logo">lei a~ lei a~ 登录啦！</div>
      <div id="info">
        <label for="username">
          <!--          点击后会删除错误信息-->
          <input type="text" class="form-control" id="username" @focus="clear_span()" v-model="name" placeholder="账号:">
        </label>
        <label for="password">
          <!--          点击后会删除错误信息-->
          <input type="password" class="form-control" id="password" @focus="clear_span()" v-model="pwd"
                 placeholder="密码:">
        </label>
        <!--        点击会删除错误信息，并且激活验证码-->
        <button class="btn btn-info" @click="clear_span()" id="login-button">登录</button>
        <div id="popup-captcha"></div>
        <!--				<div id="remember">记住登陆 <input type="checkbox"></div>-->
      </div>
    </div>
  </div>
</template>


<script>
  // import $ from 'jquery'

  export default {
    name: "Vlogin",
    data() {
      return {
        name: '',
        pwd: '',
      }
    },
    methods: {
      clear_span() {
        $(".error").remove()
      }
    },
    mounted() {
      var _this = this;
      var handlerPopup = function (captchaObj) {
        // 成功的回调
        captchaObj.onSuccess(function () {
          var validate = captchaObj.getValidate();
          $.ajax({
            url: "http://112.74.79.57:8888/api/login/", // 进行二次验证
            type: "post",
            dataType: "json",
            data: {
              username: _this.name,
              password: _this.pwd,
              geetest_challenge: validate.geetest_challenge,
              geetest_validate: validate.geetest_validate,
              geetest_seccode: validate.geetest_seccode
            },
            success: function (ret) {
              if (ret.code === 1000) {
                console.log(ret.msg);
                _this.$store.commit('saveCookie', {'username': _this.name, 'token': ret.token});
                var url = _this.$route.query.backUrl;
                if (url) {
                  _this.$router.push({path: url})
                } else {
                  _this.$router.push({name: 'index'})
                }
              }
              // 用户不存在情况
              else if (ret.code === 1002) {
                $("#username").after('<span class="error help-block alert-danger">' + ret.msg + '</span>');
                // alert(ret.msg)
              }
              // 密码错误
              else if (ret.code === 1003) {
                $("#password").after('<span class="error help-block alert-danger">' + ret.msg + '</span>');
                // alert(ret.msg)
              }
              // 未知错误
              else {
                alert(ret.msg)
              }
            }
          });
        });

        // 登录按钮点击事件
        $("#login-button").on("click", function (event) {
          captchaObj.show();
        });
        // input框键盘事件，keydown必须要focus的元素
        $("#username").on("keydown", function (e) {
          if (e.keyCode === 13) {
            captchaObj.show();
          }
        });
        $("#password").on("keydown", function (e) {
          if (e.keyCode === 13) {
            captchaObj.show();
          }
        });

        // 将验证码加到id为captcha的元素里
        captchaObj.appendTo("#popup-captcha");
        // 更多接口参考：http://www.geetest.com/install/sections/idx-client-sdk.html
      };
      $.ajax({
        url: "http://112.74.79.57:8888/api/pc-geetest/register?t=" + (new Date()).getTime(), // 加随机数防止缓存
        type: "get",
        dataType: "json",
        success: function (data) {
          // 使用initGeetest接口
          // 参数1：配置参数
          // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
          initGeetest({
            gt: data.gt,
            challenge: data.challenge,
            product: "popup", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
            offline: !data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
            // 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
          }, handlerPopup);
        }
      });
    }
  }
</script>

<style scoped>
  #box {
    width: 370px;
    height: 400px;
    border: 1px solid #E2E3E5;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -185px;
    margin-top: -200px;
  }

  #logo {
    width: 370px;
    height: 95px;
    font-size: 30px;
    color: #676A6C;
    line-height: 95px;
    margin-left: 40px;
  }

  #username {
    width: 295px;
    height: 50px;
    margin-left: 40px;
  }

  #password {
    width: 295px;
    height: 50px;
    margin-left: 40px;
  }


  #login-button {
    width: 295px;
    height: 50px;
    margin-left: 40px;
    margin-top: 20px;
  }

</style>
