<template>
  <div>
    <div id="myecharts" :style="{width:'500px',height:'300px'}"></div>
    <div id="thunder" style="width: 600px;height: 600px;"></div>
    <div id="main" style="width:100%;height: 500px"></div>
  </div>
</template>

<script>
  // import $ from 'jquery'

  export default {
    name: "VmyEcharts",
    data() {
      return {
        names: [],
        nums: [],
        exp_nums: []
      }
    },
    mounted() {
      this.drawLine();
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myecharts = this.$echarts.init(document.getElementById('myecharts'));
        let myChart = this.$echarts.init(document.getElementById('main'));
        let thunder = this.$echarts.init(document.getElementById('thunder'));
        //发送ajax请求
        var _this = this;
        $.ajax({
          url: 'http://127.0.0.1:8000/api/data_detail/',
          type: 'get',
          data: {
            username: _this.$store.state.username
          },
          success: function (ret) {
            if (ret.code === 1000) {
              for (var i = 0; i < 6; i++) {
                _this.names.push(ret.data[i].title);
                _this.nums.push(ret.data[i].num);
                _this.exp_nums.push(ret.data[i].exp_num);
              }
              // 柱状图设置
              myecharts.setOption({
                xAxis: {
                  data: _this.names
                },
                series: [{
                  data: _this.nums
                }]
              });
              // 饼状图设置
              myChart.setOption({
                legend: {
                  data: _this.names
                },
                series: [{
                  data: (function () {
                    var arr = [];
                    for (var i = 0; i < ret.data.length; i++) {
                      arr.push({value: ret.data[i].num, name: ret.data[i].title})
                    }
                    return arr
                  })()
                }]
              });
              // 雷达图设置
              var indicator = [];
              for (var i = 0; i < ret.data.length; i++) {
                indicator.push({name: ret.data[i].title, max: 100})
              }
              thunder.setOption({
                radar: {
                  indicator: indicator
                },
                series: [{
                  type: 'radar',
                  data: [
                    {
                      value: _this.nums,
                      name: "实际消费",
                      itemStyle: {
                        normal: {
                          color: '#F75325'  //显示颜色与填充颜色对应
                        }
                      },
                      areaStyle: {
                        normal: {
                          color: '#F75325'    //填充的颜色
                        }
                      }
                    },
                    {
                      value: _this.exp_nums,
                      name: "期望消费",
                      itemStyle: {
                        normal: {
                          color: '#7B52CC'
                        }
                      },
                      areaStyle: {
                        normal: {
                          color: '#7B52CC'
                        }
                      }
                    }
                  ],
                }]
              })
            } else {
              alert(ret.msg)
            }
          }
        });
        // 绘制柱状图表
        myecharts.setOption({
          title: {text: '各类别消费情况'},
          tooltip: {},
          xAxis: {
            axisLabel: {
              interval: 0
            },
            data: []
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: []
          }]
        });
        // 绘制雷达图表
        thunder.setOption({
          title: {
            text: '各类别消费雷达图',
            link: '',
            target: 'blank',
            top: '5%',
            left: '3%',
            textStyle: {
              color: '#121E36',
              fontSize: 20,
            }
          },
          tooltip: {
            trigger: 'item',
            position:
              function (p) {    //其中p为当前鼠标的位置
                return [p[0], p[1]];
              },
          },
          legend: {
            show: true,
            orient: 'vertical',
            right: "5%",
            top: "20%",
            textStyle:
              {
                color: '#121E36',
                fontWeight: 'bold'
              },
            data: ['实际消费', '期望消费']
          },
          radar: {
            splitNumber: 2, // 雷达图圈数设置
            center: ['50%', '50%'],
            radius: '65%',
            name:
              {
                textStyle: {
                  color: '#DFE0E5',
                  backgroundColor: '#121E36',
                  borderRadius: 3, //圆角
                  padding: [3, 5] //padding
                }
              },
            splitArea: {
              show: true,
              areaStyle:
                {
                  color: 'rgba(255,0,0,0)', // 图表背景的颜色
                },
            },
            indicator: [
              {name: "未知", max: 100},
              {name: "未知", max: 100},
              {name: "未知", max: 100},
              {name: "未知", max: 100},
              {name: "未知", max: 100},
              {name: "未知", max: 100}
            ]
          },
          series: [{
            name: '测试标题名字',
            type: 'radar',
            data: [
              {
                value: [50, 50, 50, 50, 50, 50],
                name: "实际消费",
                itemStyle: {
                  normal: {
                    color: '#F75325'  //显示颜色与填充颜色对应
                  }
                },
                areaStyle: {
                  normal: {
                    color: '#F75325'    //填充的颜色
                  }
                }
              },
              {
                value: [50, 50, 50, 50, 50, 50],
                name: "期望消费",
                itemStyle: {
                  normal: {
                    color: '#7B52CC'
                  }
                },
                areaStyle: {
                  normal: {
                    color: '#7B52CC'
                  }
                }
              }
            ]
          }],
        });
        // 绘制饼状图表
        myChart.setOption({
          title: {
            text: '各类别消费情况',//主标题
            subtext: '测试用',//副标题
            x: 'center',//x轴方向对齐方式
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            bottom: 'bottom',
            data: []
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
      },
    },

  }
</script>

<style scoped>

</style>
