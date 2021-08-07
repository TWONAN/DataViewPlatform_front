<template>
  <div class="layout">
    <Layout :style="{minHeight: '100vh'}">
      <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu :theme="theme3" active-name="1" width="auto" :class="menuitemClasses">
          <MenuGroup title="内容管理">
            <MenuItem name="1" @click.native="my_article_main($event)">
              <Icon type="md-document"/>
              文章管理
            </MenuItem>
            <MenuItem name="2" @click.native="my_comment_main($event)">
              <Icon type="md-chatbubbles"/>
              我的回复
            </MenuItem>
            <MenuItem name="3" @click.native="reply($event)">
              <Icon type="md-chatbubbles"/>
              回复我的
            </MenuItem>
          </MenuGroup>
          <!--          <MenuGroup title="暂定">-->
          <!--            <MenuItem name="4">-->
          <!--              <Icon type="md-heart"/>-->
          <!--              暂定-->
          <!--            </MenuItem>-->
          <!--          </MenuGroup>-->
          <p class="model-change check-appearance">切换模式</p>
          <RadioGroup v-model="theme3">
            <Radio label="light" class="model-change" @click.native="change_model('light')">日间模式</Radio>
            <Radio label="dark" class="model-change" @click.native="change_model('dark')">夜间模式</Radio>
          </RadioGroup>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>

        <!--        我的文章-->
        <Content v-if="this.select === 'article'" :style="{padding: '0 16px 16px'}">
          <Breadcrumb :style="{margin: '16px 0'}">

          </Breadcrumb>
          <Card>
            <div style="height: 700px">
              <List item-layout="vertical">
                <ListItem v-for="(item, index) in article_list" :key="index">
                  <ListItemMeta :title="'文章标题：'+item.title" :description="'概论：'+item.desc"/>
                  <template slot="action">
                    <li>
                      时间：{{item.create_time}}
                    </li>
                  </template>
                  <template slot="action">
                    <li>
                      <router-link
                        :to="{name:'source_detail',params:{content:item.content,title:item.title,aid:item.aid}}">
                        查看
                      </router-link>
                    </li>
                    <li>
                      <a href="javascript:void(0);" data-toggle="modal" data-target="#my_delete_article_Modal">删除</a>
                    </li>
                  </template>
                  <!-- Modal -->
                  <div class="modal fade" id="my_delete_article_Modal" tabindex="-1" role="dialog"
                       aria-labelledby="my_delete_articleModalLabel">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                          <h4 class="modal-title" id="my_articleModalLabel">防止帕金森</h4>
                        </div>
                        <div class="modal-body">
                          是否确定就是它啦？
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                          <button type="button" @click="delete_my_article(item.aid)" class="btn btn-danger"
                                  data-dismiss="modal">
                            确定
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </ListItem>

              </List>
            </div>
          </Card>
          <!--          每页5条-->
          <Page class="page"
                :total="article_page.total"
                :current="article_page.index"
                :page-size="article_page.size"
                :show-sizer="false"
                @on-change="my_article_turn"
                show-elevator show-total/>
        </Content>

        <!--        我的回复-->
        <Content v-else-if="this.select === 'comment'" :style="{padding: '0 16px 16px'}">
          <Breadcrumb :style="{margin: '16px 0'}"></Breadcrumb>
          <Card>
            <div style="height: 700px">
              <List item-layout="vertical">
                <ListItem v-for="(item, index) in comment_list" :key="index">
                  <ListItemMeta :title="'文章标题：'+item.article__title" :description="'评论内容：'+item.content"/>
                  <template slot="action">
                    <li>
                      时间：{{item.create_time}}
                    </li>
                    <li>
                      <router-link
                        :to="{name:'source_detail',params:{content:item.article__articledetail__content,title:item.article__title,aid:item.article__aid}}">
                        查看
                      </router-link>
                    </li>
                    <li>
                      <a href="javascript:void(0);" data-toggle="modal" data-target="#my_delete_comment_Modal">删除</a>
                    </li>
                  </template>
                  <!-- Modal -->
                  <div class="modal fade" id="my_delete_comment_Modal" tabindex="-1" role="dialog"
                       aria-labelledby="my_delete_commentModalLabel">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                          <h4 class="modal-title" id="my_commentModalLabel">防止帕金森</h4>
                        </div>
                        <div class="modal-body">
                          是否确定就是它啦？
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                          <button type="button" @click="delete_my_comment(item.pk)" class="btn btn-danger"
                                  data-dismiss="modal">
                            确定
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </ListItem>
              </List>
            </div>
          </Card>
          <!--          每页5条-->
          <Page class="page"
                :total="comment_page.total"
                :current="comment_page.index"
                :page-size="comment_page.size"
                :show-sizer="false"
                @on-change="my_comment_turn"
                show-elevator show-total/>
        </Content>

        <!--        回复我的-->
        <Content v-else-if="this.select === 'reply'" :style="{padding: '0 16px 16px'}">
          <Breadcrumb :style="{margin: '16px 0'}"></Breadcrumb>
          <Card>
            <div style="height: 700px">
              <List item-layout="vertical">
                <ListItem v-for="(item, index) in reply_list" :key="index">
                  <ListItemMeta :title="'文章标题：'+item.article__title" :description="'评论内容：'+item.content"/>
                  <template slot="action">
                    <li>
                      时间：{{item.create_time}}
                    </li>
                    <li>
                      <router-link
                        :to="{name:'source_detail',params:{content:item.article__articledetail__content,title:item.article__title,aid:item.article__aid}}">
                        查看
                      </router-link>
                    </li>
                  </template>
                </ListItem>
              </List>
            </div>
          </Card>
          <!--          每页5条-->
          <Page class="page"
                :total="reply_page.total"
                :current="reply_page.index"
                :page-size="reply_page.size"
                :show-sizer="false"
                @on-change="reply_turn"
                show-elevator show-total/>
        </Content>

      </Layout>
    </Layout>
  </div>
</template>

<script>
  export default {
    name: "Vprivate_index",
    // 注入reload方法
    inject: ['reload'],
    data() {
      return {
        theme3: 'light',
        isCollapsed: false,
        article_list: [],
        comment_list: [],
        reply_list: [],
        article_page: {
          total: 0,
          index: 1,
          size: 5
        },
        comment_page: {
          total: 0,
          index: 1,
          size: 5
        },
        reply_page: {
          total: 0,
          index: 1,
          size: 5
        },
        select: "article"
      }
    },
    mounted() {
      var _this = this;
      $.ajax({
        url: 'http://112.74.79.57:8888/api/article/',
        type: 'get',
        data: {
          usertoken: this.$store.state.token,
          username: this.$store.state.username,
          page: 1
        },
        success: function (ret) {
          if (ret.code === 1000) {
            _this.article_page.total = ret.total_page;
            for (var i = 0; i < ret.data.length; i++) {
              _this.article_list.push(ret.data[i])
            }
          } else {
            alert(ret.msg)
          }
        }
      });
    },
    methods: {
      change_model(type) {
        if (type === 'dark') {
          $(".model-change").css("color", "white");
        } else {
          $(".model-change").css("color", "black");

        }
      },
      my_article_main(e) {
        var _this = this;
        var el = e.target;
        this.select = "article";
        if ($(el).hasClass("ivu-menu-item-selected")) {
          $(el).removeClass("ivu-menu-item-selected");
          $.ajax({
            url: 'http://112.74.79.57:8888/api/article/',
            type: 'get',
            data: {
              usertoken: this.$store.state.token,
              username: this.$store.state.username,
              page: 1
            },
            success: function (ret) {
              if (ret.code === 1000) {
                _this.article_list = [];
                _this.article_page.total = ret.total_page;
                for (var i = 0; i < ret.data.length; i++) {
                  _this.article_list.push(ret.data[i])
                }
              } else {
                alert(ret.msg)
              }
            }
          });
        } else {

        }

      },
      my_article_turn(i) {
        var _this = this;
        this.select = "article";
        this.article_page.index = i;
        $.ajax({
          url: 'http://112.74.79.57:8888/api/article/',
          type: 'get',
          data: {
            usertoken: this.$store.state.token,
            username: this.$store.state.username,
            page: i
          },
          success: function (ret) {
            if (ret.code === 1000) {
              _this.article_list = [];
              _this.article_page.total = ret.total_page;
              for (var i = 0; i < ret.data.length; i++) {
                _this.article_list.push(ret.data[i])
              }
            } else {
              alert(ret.msg)
            }
          }
        });

      },
      my_comment_main(e) {
        var el = e.target;
        this.select = "comment";
        var _this = this;
        if ($(el).hasClass("ivu-menu-item-selected")) {
          $(el).removeClass("ivu-menu-item-selected");
          $.ajax({
            url: 'http://112.74.79.57:8888/api/my_comment/',
            type: 'get',
            data: {
              usertoken: _this.$store.state.token,
              username: _this.$store.state.username,
              page: 1
            },
            success: function (ret) {
              if (ret.code === 1000) {
                _this.comment_list = [];
                _this.comment_page.total = ret.total_page;
                for (var i = 0; i < ret.data.length; i++) {
                  _this.comment_list.push(ret.data[i])
                }
              } else {
                alert(ret.msg)
              }
            }

          })
        } else {
        }

      },
      my_comment_turn(i) {
        var _this = this;
        this.select = "comment";
        this.article_page.index = i;
        $.ajax({
          url: 'http://112.74.79.57:8888/api/my_comment/',
          type: 'get',
          data: {
            usertoken: this.$store.state.token,
            username: this.$store.state.username,
            page: i
          },
          success: function (ret) {
            if (ret.code === 1000) {
              _this.comment_list = [];
              _this.comment_page.total = ret.total_page;
              for (var i = 0; i < ret.data.length; i++) {
                _this.comment_list.push(ret.data[i])
              }
            } else {
              alert(ret.msg)
            }
          }
        });
      },
      reply(e) {
        var el = e.target;
        this.select = "reply";
        var _this = this;
        if ($(el).hasClass("ivu-menu-item-selected")) {
          $(el).removeClass("ivu-menu-item-selected");
          $.ajax({
            url: 'http://112.74.79.57:8888/api/reply/',
            type: 'get',
            data: {
              usertoken: _this.$store.state.token,
              username: _this.$store.state.username,
              page: 1
            },
            success: function (ret) {
              if (ret.code === 1000) {
                _this.reply_list = [];
                _this.reply_page.total = ret.total_page;
                for (var i = 0; i < ret.data.length; i++) {
                  _this.reply_list.push(ret.data[i])
                }
              } else {
                alert(ret.msg)
              }
            }

          })
        } else {
        }
      },
      reply_turn(i) {
        var _this = this;
        this.select = "reply";
        this.reply_page.index = i;
        $.ajax({
          url: 'http://112.74.79.57:8888/api/reply/',
          type: 'get',
          data: {
            usertoken: this.$store.state.token,
            username: this.$store.state.username,
            page: i
          },
          success: function (ret) {
            if (ret.code === 1000) {
              _this.reply_list = [];
              _this.reply_page.total = ret.total_page;
              for (var i = 0; i < ret.data.length; i++) {
                _this.reply_list.push(ret.data[i])
              }
            } else {
              alert(ret.msg)
            }
          }
        });
      },
      delete_my_article(a_id) {
        var _this = this;
        $.ajax({
          url: 'http://112.74.79.57:8888/api/article/',
          type: 'delete',
          data: {
            aid: a_id
          },
          success: function (ret) {
            alert(ret.msg);
            _this.reload()
          }
        })
      },
      delete_my_comment(pk) {
        var _this = this;
        $.ajax({
          url: 'http://112.74.79.57:8888/api/my_comment/',
          type: 'delete',
          data: {
            cid: pk
          },
          success: function (ret) {
            alert(ret.msg);
            _this.reload()
          }
        })
      },
    },
    computed: {
      menuitemClasses: function () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      }
    },
  }
</script>

<style scoped>
  .check-appearance {
    padding-left: 60px;
    padding-top: 30px;
    padding-bottom: 10px;
  }


  .layout-con {
    height: 100%;
    width: 100%;
  }

  .menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }

  .menu-item i {
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }

  .collapsed-menu span {
    width: 0px;
    transition: width .2s ease;
  }

  .collapsed-menu i {
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
</style>
