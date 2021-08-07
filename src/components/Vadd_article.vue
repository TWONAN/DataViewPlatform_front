<template>
  <div class="table">
    <h3>添加文章</h3>
    文章标题:<input type="text" v-model="title">
    <editor id="editor_id" height="500px" width="700px" :content.sync="editorText"
            :afterChange="afterChange()"
            pluginsPath="../../../static/kindeditor/plugins/"
            :loadStyleMode="false"></editor>
    <!--    @on-content-change="onContentChange"-->
    <!--    <div> editorTextCopy: {{ editorTextCopy }}</div>-->
    <button type="button" class="btn btn-success" @click="addArticle">提交</button>

  </div>
</template>

<script>
  export default {
    name: 'table',
    data() {
      return {
        title: "",//文章标题
        editorText: "", // 双向同步的变量
        // editorTextCopy: '',// content-change 事件回掉改变的对象
        usertoken: this.$store.state.token,
        username: this.$store.state.username
      }
    },
    methods: {
      onContentChange(val) {
        // this.editorTextCopy = val;
      },
      afterChange() {
      },
      addArticle() {
        var _this = this;
        $.ajax({
          url: "http://112.74.79.57:8888/api/article/",
          type: 'post',
          data: {
            title: _this.title,
            content: _this.editorText,
            username: _this.username,
            usertoken: _this.usertoken
          },
          success: function (ret) {
            if (ret.code === 1000) {
              alert("又是满满感想的一天啦~");
              _this.$router.push({path: '/source_share'})
            } else {
              alert(ret.msg)
            }
          }
        })
      }
    }
  }
</script>

<style>

</style>
