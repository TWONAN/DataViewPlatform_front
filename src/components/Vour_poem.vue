<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }


</style>
<template>
  <div class="layout">
    <Layout>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu active-name="1-1" theme="light" width="auto" :open-names="['1']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                诗歌分类
              </template>
              <MenuItem name="1-1" @click="get_our_poem">我们的原创</MenuItem>
            </Submenu>
          </Menu>
          <div id="add_poem" class="article-button">
            <router-link :to="{name:'add_poem'}">
              <button type="button" class="btn btn-default">添加
                <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
              </button>
            </router-link>
          </div>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>内容</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <Table border :columns="columns1" :data="poem_list">
              <template slot-scope="{ row }" slot="title">
                <strong>{{ row.title }}</strong>
              </template>
              <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
                <Button type="error" size="small" data-toggle="modal" data-target="#myModal">
                  删除
                </Button>
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
                        <button type="button" @click="remove(row.p_id)" class="btn btn-danger"
                                data-dismiss="modal">确定
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </Table>
            <Page class="page"
                  :total="page.total"
                  :current="page.index"
                  :page-size="page.size"
                  :show-sizer="false"
                  @on-change="pIndexChange"
                  show-elevator show-total/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
  export default {
    name: "Vour_poem",
    // 注入reload方法
    inject: ['reload'],
    data() {
      return {
        poem_list: [],
        text: "hahah",
        columns1: [
          {
            title: '题目',
            slot: 'title'
          },
          {
            title: '创作时间',
            key: 'update_time'
          },
          {
            title: 'Action',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ],
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
        url: 'http://112.74.79.57:8888/api/our_poem/',
        type: 'get',
        data: {
          page: _this.page.index
        },
        success: function (ret) {
          if (ret.code === 1000) {
            _this.page.total = ret.total_page;
            for (var i = 0; i < ret.data.length; i++) {
              _this.poem_list.push(ret.data[i])
            }
          } else {
            alert(ret.msg)
          }
        }
      })
    },
    methods: {
      show(index) {
        this.$Modal.info({
          title: '诗歌详情',
          content: this.poem_list[index].content

        })
      },
      remove(p_id) {
        var _this = this;
        $.ajax({
          url: 'http://112.74.79.57:8888/api/our_poem/',
          type: 'delete',
          data: {
            pid: p_id
          },
          success: function (ret) {
            if (ret.code === 1000) {
              alert(ret.msg);
              _this.reload();
            } else {
              alert(ret.msg);
            }
          }

        });
      },
      pIndexChange(i) {
        var _this = this;
        _this.page.index = i;
        $.ajax({
          url: 'http://112.74.79.57:8888/api/our_poem/',
          type: 'get',
          data: {
            page: i
          },
          success: function (ret) {
            if (ret.code === 1000) {
              _this.poem_list = [];
              for (var i = 0; i < ret.data.length; i++) {
                _this.poem_list.push(ret.data[i])
              }
            } else {
              alert(ret.msg)
            }
          }
        })
      }
    }
  }
</script>
