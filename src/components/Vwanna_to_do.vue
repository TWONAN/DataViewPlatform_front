<template>
  <div>
    <div>
      <button data-toggle="modal" data-target="#myModal" type="button" class="btn btn-primary add_thing">添加
        <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
      </button>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">想和她/他做的事</h4>
          </div>
          <div class="modal-body">
            <Form :model="formItem" :label-width="80">
              <FormItem label="天气">
                <Select v-model="formItem.select">
                  <Option value="0">晴天</Option>
                  <Option value="1">多云</Option>
                  <Option value="2">雨天</Option>
                  <Option value="3">大风</Option>
                  <Option value="4">雾天</Option>
                  <Option value="5">雪天</Option>
                </Select>
              </FormItem>
              <FormItem label="做点什么呢？">
                <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                       placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="状态">
                <RadioGroup v-model="formItem.radio">
                  <Radio label="1">完成</Radio>
                  <Radio label="0">未完成</Radio>
                </RadioGroup>
              </FormItem>
            </Form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="add_things">确认</button>
          </div>
        </div>
      </div>
    </div>
    <div class="demo-split">
      <Split v-model="split1">
        <div slot="left" class="demo-split-pane left">
          这是沐沐的
          <div>
            <strong>想和男男做的事</strong>
            <br><br>
            <List border>
              <ListItem v-for="(item,index) in left_list" :key="index">
                内容:{{item.content}}
                天气:{{item.weather}}
                状态:{{item.status}}
                时间:{{item.create_time}}
                <template slot="action">
                  <li>
                    <a href="">编辑</a>
                  </li>
                </template>
              </ListItem>
            </List>
            <Page class="page_left"
                  :total="page_left.total"
                  :current="page_left.index"
                  :page-size="page_left.size"
                  :show-sizer="false"
                  @on-change="pLIndexChange"
                  show-elevator show-total/>
          </div>
        </div>
        <div slot="right" class="demo-split-pane right">
          这是男男的
          <div>
            <strong>想和沐沐做的事</strong>
            <br><br>
            <List border>
              <ListItem v-for="(item, index) in right_list" :key="index">
                内容:{{item.content}}
                天气:{{item.weather}}
                状态:{{item.status}}
                时间:{{item.create_time}}
                <template slot="action">
                  <li>
                    <a href="">编辑</a>
                  </li>
                </template>
              </ListItem>
            </List>
            <Page class="page_right"
                  :total="page_right.total"
                  :current="page_right.index"
                  :page-size="page_right.size"
                  :show-sizer="false"
                  @on-change="pRIndexChange"
                  show-elevator show-total/>
          </div>
        </div>
      </Split>
    </div>
  </div>

</template>
<script>
  export default {
    name: "Vwanna_to_do",
// 注入reload方法
    inject: ['reload'],
    data() {
      return {
        usertoken: this.$store.state.token,
        username: this.$store.state.username,
        split1: 0.5,
        page_left: {
          total: 0,
          index: 1,
          size: 5
        },
        page_right: {
          total: 0,
          index: 1,
          size: 5
        },
        left_list: [],
        right_list: [],
        formItem: {
          select: '0',
          textarea: '',
          radio: '0'
        },
      }
    },
    mounted() {
      var _this = this;
      $.ajax({
        url: 'http://112.74.79.57:8888/api/wanna_to_do/',
        type: 'get',
        data: {
          page_left: _this.page_left.index,
          page_right: _this.page_right.index,

        },
        success: function (ret) {
          if (ret.code === 1000) {
            _this.page_left.total = ret.total_left;
            _this.page_right.total = ret.total_right;

            for (var i = 0; i < ret.left.length; i++) {
              _this.left_list.push(ret.left[i])
            }
            for (var j = 0; j < ret.right.length; j++) {
              _this.right_list.push(ret.right[i])
            }
          } else {
            alert(ret.msg)
          }
        }
      })
    },
    methods: {
      add_things() {
        var _this = this;
        $.ajax({
          url: 'http://112.74.79.57:8888/api/wanna_to_do/',
          type: 'post',
          data: {
            username: _this.username,
            usertoken: _this.usertoken,
            content: _this.formItem.textarea,
            weather: _this.formItem.select,
            status: _this.formItem.radio,
          },
          success: function (ret) {
            if (ret.code === 1000) {
              alert("提交成功");
              _this.$router.push({path: '/wanna_to_do'});
              _this.reload()
            } else {
              alert(ret.msg)
            }
          }
        })

      },
      pLIndexChange(i) {
        var _this = this;
        _this.page_left.index = i;
        $.ajax({
          url: 'http://112.74.79.57:8888/api/wanna_to_do/',
          type: 'get',
          data: {
            page_left: i
          },
          success: function (ret) {
            if (ret.code === 1000) {
              _this.left_list = [];
              for (var i = 0; i < ret.left.length; i++) {
                _this.left_list.push(ret.left[i])
              }
            } else {
              alert(ret.msg)
            }
          }
        })

      },
      pRIndexChange(i) {
        var _this = this;
        _this.page_right.index = i;
        $.ajax({
          url: 'http://112.74.79.57:8888/api/wanna_to_do/',
          type: 'get',
          data: {
            page_right: i
          },
          success: function (ret) {
            if (ret.code === 1000) {
              _this.right_list = [];
              for (var i = 0; i < ret.right.length; i++) {
                _this.right_list.push(ret.right[i])
              }
            } else {
              alert(ret.msg)
            }
          }
        })

      },
    },
  }
</script>
<style>
  .demo-split {
    height: 200px;
    border: 1px solid #dcdee2;
  }

  .demo-split-pane {
    padding: 10px;
  }

  .right {
    background-color: #f8f8f9;
  }

  .left {
    background-color: #f8f8f9;
  }

  .add_thing {
    margin-bottom: 20px;
    margin-left: 46%;
  }
</style>


