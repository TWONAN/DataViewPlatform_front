<template>
  <div>
    <h3>诗人诗集数量详情</h3>
    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th>姓名</th>
        <th>诗集上榜数量</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in total_poet_list">
        <td>{{item.author}}</td>
        <td>{{item.count}}</td>
      </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li>
          <a href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li v-for="(item,index) in all_button"><a href="#" :class="{active:item.tips}"
                                                  v-on:click="changePage(item.page)">{{item.page}}</a>
        </li>
        <li>
          <a href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    name: "Vpoet_rating_detail",
    data() {
      return {
        total_poet_list: [],
        all_button: []
      }
    },
    methods: {
      getRating() {
        var _this = this;
        $.ajax({
          url: "http://127.0.0.1:8000/api/poetrating/",
          type: "get",
          success: function (ret) {
            if (ret.code === 1000) {
              for (var i = 0; i < ret.data.length; i++) {
                _this.total_poet_list.push(ret.data[i])
              }
              for (var i = 0; i < ret.button.length; i++) {
                _this.all_button.push(ret.button[i])
              }
              console.log(_this.all_button)
            } else {
              alert(ret.msg)
            }
          }
        })
      },
      changePage(item) {
        var _this = this;
        // 临时列表
        var tmp_poet_list = [];
        var tmp_button = [];
        $.ajax({
          url: "http://127.0.0.1:8000/api/poetrating/?page=" + item,
          type: "get",
          success: function (ret) {
            if (ret.code === 1000) {
              for (var i = 0; i < ret.data.length; i++) {
                tmp_poet_list.push(ret.data[i])
              }
              for (var i = 0; i < ret.button.length; i++) {
                tmp_button.push(ret.button[i])
              }
              _this.total_poet_list = tmp_poet_list;
              _this.all_button = tmp_button
            } else {
              alert(ret.msg)
            }
          }
        })
      }
    },
    mounted() {
      this.getRating();
    },

  }
</script>

<style scoped>

</style>
