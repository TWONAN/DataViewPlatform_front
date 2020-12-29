<template>
  <div>
    <h2>诗人排名</h2>
    <VpoetEcharts></VpoetEcharts>
    <p>
      <button @click="updatepoem($event)" type="button" data-loading-text="Loading..." class="btn btn-success">更新
      </button>
    </p>
    <router-link to="/poet_rating_detail"><h3>诗人诗集数量详情查看</h3></router-link>

  </div>
</template>

<script>
  import VpoetEcharts from '@/components/VpoetEcharts'

  export default {
    name: "Vpoet_rating",
    data() {
      return {}
    },
    // 注入reload方法
    inject: ['reload'],
    methods: {
      updatepoem(evnet) {
        var el = evnet.target;
        console.log(el);
        var _this = this;
        var $btn = $(el).button("loading");
        $.ajax({
          url: 'http://112.74.79.57:8888/api/poetrating/',
          type: 'post',
          success: function (ret) {
            if (ret.code === 1000) {
              // 重载页面
              $btn.button("reset");
              _this.reload()
            } else {
              console.log(ret);
              alert(ret.msg)
            }
          }
        })
      },
    },
    components: {
      VpoetEcharts,
    }
  }
</script>

<style scoped>

</style>
