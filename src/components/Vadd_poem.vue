<template>
  <div class="table">
    <h3>添加我们的诗</h3>
    题目:<input type="text" v-model="title">
    <editor id="editor_id" height="500px" width="700px" :content.sync="editorText"
            :afterChange="afterChange()"
            pluginsPath="../../../static/kindeditor/plugins/"
            :loadStyleMode="false"
            @on-content-change="onContentChange"></editor>
    <button type="button" class="btn btn-success" @click="addArticle">提交</button>

  </div>
</template>

<script>
  export default {
    name: 'add_poem',
    data() {
      return {
        title: "",//诗歌标题
        usertoken: this.$store.state.token,
        username: this.$store.state.username
      }
    },
    methods: {
      afterChange() {
      },
      addArticle() {
        var _this = this;
        $.ajax({
          url: "http://112.74.79.57:8888/api/our_poem/",
          type: 'post',
          data: {
            title: _this.title,
            content: _this.editorText,
            username: _this.username,
            usertoken: _this.usertoken
          },
          success: function (ret) {
            if (ret.code === 1000) {
              alert("提交成功");
              _this.$router.push({path: '/our_poem'})
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
