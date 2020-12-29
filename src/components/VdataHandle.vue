<template>
  <div>
    <h3>个人数据处理</h3>
    <p>
      <!--      柱形图和饼状图-->
      <VmyEcharts></VmyEcharts>
    </p>
    <div class="changeData">
      <p>
        请输入修改的类别
        <input type="text" v-model="itemName">
      </p>
      <p>
        请输入修改的类别实际数量
        <input type="text" v-model="itemNum">
      </p>
      <p>
        请输入修改的类别期望数量
        <input type="text" v-model="itemExpNum">
      </p>
      <p>
        类别的新名字更新为
        <input id="newName" type="text" :value="itemName">
      </p>
      <p>
        <button @click="changeItem">提交</button>
      </p>
    </div>
  </div>
</template>

<script>
  import VmyEcharts from '@/components/VmyEcharts'
  // import $ from 'jquery'

  export default {
    name: "VdataHandle",
    // 注入reload方法
    inject: ['reload'],
    data() {
      return {
        itemName: '',
        itemNum: '',
        itemExpNum: ''
      }
    },
    components: {
      VmyEcharts,
    },
    methods: {
      changeItem() {
        var _this = this;
        $.ajax({
          url: 'http://112.74.79.57:8888/api/data_detail/',
          type: 'post',
          data: {
            username: _this.$store.state.username,
            itemName: _this.itemName,
            itemNum: _this.itemNum,
            itemExpNum: _this.itemExpNum,
            itemNewName: $("#newName").val()
          },
          success: function (ret) {
            if (ret.code === 1000) {
              // 重载页面
              _this.reload()
            } else if (ret.code === 10003) {
              alert(ret.msg)
            } else {
              alert(ret.msg)
            }
          }
        })
      }
    },
  }
</script>

<style scoped>

</style>
