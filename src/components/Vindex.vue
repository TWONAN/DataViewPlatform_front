<template>
  <div>
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
      <!-- Indicators -->
      <ol class="carousel-indicators">
        <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
        <li data-target="#carousel-example-generic" data-slide-to="1"></li>
        <li data-target="#carousel-example-generic" data-slide-to="2"></li>
      </ol>

      <!-- Wrapper for slides -->
      <div class="carousel-inner" role="listbox">
        <div class="item active">
          <img src="../assets/red_hat1.png" alt="...">
          <div class="carousel-caption">
          </div>
        </div>
        <div class="item">
          <img src="../assets/red_hat2.png" alt="...">
          <div class="carousel-caption">
          </div>
        </div>

        <div class="item">
          <img src="../assets/red_hat3.png" alt="...">
          <div class="carousel-caption">
          </div>
        </div>
      </div>

      <!-- Controls -->
      <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Vindex",
    // data() {
    //   return {
    //     pro_img1: "/src/assets/red_hat1.png",
    //   }
    // },
    mounted() {
      $(function () {
        // 设置轮播时间
        $('#myCarousel').carousel({
          interval: 3500,
        });
        // 设置点击小圆点切换图片
        $("#myCarousel li").click(function () {
          var index = $(this).attr("data-slide-to");
          $('#myCarousel').carousel(parseInt(index))
        })
      })
    }
  }
</script>

<style scoped>
  .carousel .item {
    height: 400px;
    background-color: #777;
  }

  .carousel-inner > .item > img {
    position: absolute;
    top: 0;
    left: 25%;
    right: 25%;
    width: 50%;
    height: 400px;
  }
</style>
