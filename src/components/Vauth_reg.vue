<template>

</template>

<script>
  // import $ from 'jquery'

  export default {
    name: "Vreg",
    data() {
      return {
        username: '',
        pwd: '',
      }
    },
    methods: {
      login() {
        var _this = _this;
        $.ajax({
          url: '',
          type: 'post',
          data:{},
          success:function (ret) {
            
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
