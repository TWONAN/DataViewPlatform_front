<template>
  <div>
    <h3>{{this.t}}</h3>
    <div v-html="this.c"></div>
    <!--    显示评论-->
    <p>评论列表</p>
    <ul class="list-group">
      <li class="list-group-item" v-for="(item,index) in this.comment_tree">
        <div>
          {{index+1}} 楼 &nbsp;{{item.username}} &nbsp;{{item.create_time}}
          <a href="javascript:void(0);" @click="reply(item.user,item.username)">回复</a>
          <div>{{item.content}}</div>
        </div>
        <div v-if="item.parent_comment_id" class="well">
          <p>
            回复{{item.p_username}}：{{item.p_comment}}
          </p>
        </div>
      </li>
    </ul>
    <div v-if="this.$store.state.token" class="div_comment">
      <p>昵称:
        <input type="text" disabled :value="this.$store.state.username">
      </p>
      <p>评论内容:</p>
      <textarea name="" id="comment_detail" cols="60" rows="10" v-model="comm"></textarea>
      <p>
        <button class="btn btn-success" id="comment-btn" @click="send_comment">提交</button>
      </p>
    </div>
    <div v-else class="div_comment comment_foot">
      <router-link to="/auth_login">登录即可回复</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Vsource_detail",
    data() {
      return {
        c: '',
        t: '',
        aid: '',
        pid: '',
        comm: '',
        comment_tree: ''
      }
    },
    mounted() {
      var content = this.$route.params.content;
      var title = this.$route.params.title;
      var aid = this.$route.params.aid;
      this.t = title;
      this.c = content;
      this.aid = aid;
      var _this = this;
      $.ajax({
        url: 'http://127.0.0.1:8000/api/comments?article_id=' + _this.aid,
        type: 'get',
        success: function (ret) {
          _this.comment_tree = ret.data;
        }
      })
    },
    methods: {
      send_comment() {
        if (this.pid) {
          var content = $('#comment_detail').val();
          var index = content.indexOf('\n');
          this.comm = content.slice(index + 1)
        }
        var _this = this;
        $.ajax({
          url: "http://127.0.0.1:8000/api/comments",
          type: "post",
          data: {
            article_id: _this.aid,
            pid: _this.pid,
            comment: _this.comm,
            username: _this.$store.state.username,
            usertoken: _this.$store.state.token
          },
          success: function (ret) {
            // 评论成功
            if (ret.code === 1000) {
              alert(ret.msg);
              // _this.$router.push({path: '/source_detail'});
              $("#comment_detail").val("");
              _this.pid = "";
            }
            // 评论为空
            else if (ret.code === 10004) {
              alert(ret.msg)
            }
            // 其他情况
            else {
              alert(ret.msg);
            }
          }
        })
      },
      reply(pid, p_name) {
        $('#comment_detail').focus();
        $('#comment_detail').val('@' + p_name + '\n');
        this.pid = pid;
      }
    }
  }
</script>

<style scoped>

</style>
