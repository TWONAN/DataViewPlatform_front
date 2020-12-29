<template>
  <div id="poet_echarts" :style="{width:'500px',height:'300px'}">

  </div>
</template>

<script>
  export default {
    name: "VpoetEcharts",
    data() {
      return {
        top_name: [],
        top_num: [],
      }
    },
    mounted() {
      this.drawLine()
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let poet_echarts = this.$echarts.init(document.getElementById('poet_echarts'));
        //发送ajax请求
        var _this = this;
        $.ajax({
          url: 'http://112.74.79.57:8888/api/poetrating/',
          type: 'get',
          success: function (ret) {
            if (ret.code === 1000) {
              for (var i = 0; i < 6; i++) {
                _this.top_name.push(ret.data[i].author);
                _this.top_num.push(ret.data[i].count)
              }
              poet_echarts.setOption({
                xAxis: {
                  data: _this.top_name
                },
                series: [{
                  data: _this.top_num
                }]
              })
            } else {
              alert(ret.msg)
            }
          }
        });
        // 绘制图表
        poet_echarts.setOption({
          title: {text: '诗人Top6'},
          tooltip: {},
          xAxis: {
            axisLabel: {
              interval: 0
            },
            data: []
          },
          yAxis: {},
          series: [{
            name: '作品数',
            type: 'bar',
            data: []
          }]
        });
      }
    }
  }
</script>

<style scoped>

</style>
