<template>
  <div>
    <h3>文章分享</h3>
    <div id="add_article" class="article-button">
      <router-link :to="{name:'add_article'}">
        <button type="button" class="btn btn-primary">添加
          <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
        </button>
      </router-link>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <div class="menu">

          </div>

        </div>
        <div class="col-md-9">
          <div class="main-content" v-for="(item, index) in article_list">
            <div class="media">
              <div class="media-left">
                <a href="#">
                  <img id="user-img" class="media-object" :src="$host + item.avatar" alt="...">
                </a>
              </div>
              <div class="media-body">
                <h4 class="media-heading">
                  <router-link :to="{name:'source_detail',params:{content:item.content,title:item.title,aid:item.aid}}">
                    {{item.title}}
                  </router-link>
                </h4>
                {{item.desc}}
              </div>
            </div>
            <div class="media-footer">
              <span>{{item.username}}</span>
              <span>{{item.create_time}}</span>
              <span><button class="btn btn-warning" data-toggle="modal" data-target="#myModal">删除</button></span>
            </div>
            <!-- Modal -->
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                      aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">防止帕金森</h4>
                  </div>
                  <div class="modal-body">
                    是否确定就是它啦？
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" @click="delete_article(item.aid)" class="btn btn-danger" data-dismiss="modal">
                      确定
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--          每页5条-->
          <Page class="page"
                :total="page.total"
                :current="page.index"
                :page-size="page.size"
                :show-sizer="false"
                @on-change="pIndexChange"
                show-elevator show-total/>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Vsource_share",
    // 注入reload方法
    inject: ['reload'],
    data() {
      return {
        article_list: [],
        page: {
          total: 0,
          index: 1,
          size: 5
        },
      }
    },
    mounted() {
      var _this = this;
      $.ajax({
        url: 'http://112.74.79.57:8888/api/article/',
        type: 'get',
        data: {
          page: _this.page.index
        },
        success: function (ret) {
          if (ret.code === 1000) {
            // console.log(ret);
            _this.page.total = ret.total_page;
            for (var i = 0; i < ret.data.length; i++) {
              _this.article_list.push(ret.data[i])
            }
          } else {
            alert(ret.msg)
          }
        }
      });
      // console.log(this.article_list)
    },
    methods: {
      delete_article(aid) {
        var _this = this;
        $.ajax({
          url: 'http://112.74.79.57:8888/api/article/',
          type: 'delete',
          data: {
            aid: aid,
          },
          success: function (ret) {
            alert(ret.msg);
            _this.reload()
          }
        })
      },
      pIndexChange(i) {
        var _this = this;
        _this.page.index = i;
        $.ajax({
          url: 'http://112.74.79.57:8888/api/article/',
          type: 'get',
          data: {
            page: i
          },
          success: function (ret) {
            if (ret.code === 1000) {
              _this.article_list = [];
              for (var i = 0; i < ret.data.length; i++) {
                _this.article_list.push(ret.data[i])
              }
            } else {
              alert(ret.msg)
            }
          }
        })
      },
    }

  }
</script>

<style scoped>
  #user-img {
    height: 80px;
    width: 80px;
  }

  .media-footer span {
    margin-right: 20px;
  }

  .main-content {
    margin-top: 20px;
  }

  #add_article {
    height: 1px;
    width: 1px;
  }

  .page {
    margin-top: 30px;

  }
</style>
