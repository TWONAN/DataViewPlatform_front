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
        <div class="modal-content" style="width: 800px">
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
                <!--                <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}"-->
                <!--                       placeholder="Enter something..."></Input>-->
                <editor id="editor_id" height="50px" width="500px" :content.sync="editorText"
                        :afterChange="afterChange()"
                        pluginsPath="../../../static/kindeditor/plugins/"
                        :loadStyleMode="false">
                  <!--                  @on-content-change="onContentChange"-->

                </editor>
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
    <!-- changeModal -->
    <div class="modal fade" id="changeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="changeModalLabel">修改完成状态</h4>
          </div>
          <div class="modal-body">
            <RadioGroup v-model="changestatus">
              <Radio label="1">
                <Icon type="logo-apple"></Icon>
                <span>完成</span>
              </Radio>
              <Radio label="0">
                <Icon type="logo-android"></Icon>
                <span>未完成</span>
              </Radio>
            </RadioGroup>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="changeStatus">确认</button>
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
            <List item-layout="vertical">
              <ListItem v-for="item in left_list" :key="item.title">
                <ListItemMeta :avatar="item.avatar" :title="item.title" :description="item.description"/>
                <{{item.serial_number}}>
                <div v-html="item.content"></div>
                <template slot="action">
                  <li>
                    天气：
                    {{item.weather}}
                  </li>
                  <li data-toggle="modal" data-target="#changeModal" @click="getWid(item.w_id)">
                    完成状态：
                    {{item.status}}
                  </li>
                  <li>
                    时间：
                    {{item.create_time}}
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
            <List item-layout="vertical">
              <ListItem v-for="item in right_list" :key="item.title">
                <ListItemMeta :avatar="item.avatar" :title="item.title" :description="item.description"/>
                <{{item.serial_number}}>
                <div v-html="item.content"></div>
                <template slot="action">
                  <li>
                    天气：
                    {{item.weather}}
                  </li>
                  <li data-toggle="modal" data-target="#changeModal" @click="getWid(item.w_id)">
                    完成状态：
                    {{item.status}}
                  </li>
                  <li>
                    时间：
                    {{item.create_time}}
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
        editorText: '',
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
        changestatus: "0",
        wid: ""
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
              _this.right_list.push(ret.right[j])
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
            content: _this.editorText,
            weather: _this.formItem.select,
            status: _this.formItem.radio,
          },
          success: function (ret) {
            if (ret.code === 1000) {
              alert("又多一件想做的事啦~");
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
      afterChange() {
      },
      changeStatus() {
        var _this = this;
        $.ajax({
          url: 'http://112.74.79.57:8888/api/wanna_to_do/',
          type: 'post',
          data: {
            username: _this.username,
            usertoken: _this.usertoken,
            wid: _this.wid,
            changeStatus: _this.changestatus
          },
          success: function (ret) {
            if (ret.code === 1000) {
              alert("修改成功啦~");
              _this.$router.push({path: '/wanna_to_do'});
              _this.reload()
            } else {
              alert(ret.msg)
            }
          }
        })
      },
      getWid(wid) {
        this.wid = wid;
      }
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
    background-color: #AED6F1;
  }

  .left {
    background-color: #FDCABF;

  }

  .add_thing {
    margin-bottom: 20px;
    margin-left: 46%;
  }
</style>


