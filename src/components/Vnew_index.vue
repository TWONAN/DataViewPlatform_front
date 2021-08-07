<template>
  <div id="Vnew_index">
    <Collapse v-model="value1">
      <Panel name="1">
        可爱的沐沐宝宝~
        <p slot="content">
          一个让浩男初次相遇就坚定一生的女孩子，以前内心会自己藏着好多事情，让充满好奇的浩男想要一探究竟。
          时而充满欢乐时而又低沉悲伤，总是捉摸不透。不过，总是能在说话中不经意的让浩男感受到莫名的亲切，可能是兴趣爱好的相似，
          或者是一些有趣的经历，也会是当时说的三观并且对一些人事物的看法的认可，也许是浩男想要了解却无从下手的知识，更可能的是
          总好像能看懂浩男的一些内心想法（虽然不多，但是真的走进我的心里去了~）等等。。。太多东西足以让浩男慢慢去悟彻。
          命运总还是将我们拉回在了一起，同时这次是焊地死死的，还是那个沐沐~ 一个多愁善感的沐沐，阴晴不定的沐沐，安排给浩男
          一个守护她一辈子的任务（不像是任务，更像是礼物~），渐渐成熟（还有很多的空间需要去提升，就像那棵小树苗，渐渐成型，但还不够茁壮）的浩男
          更愿意花一生的时间去慢慢了解沐沐的内心世界，给她最温暖的的安心和舒适~
        </p>
      </Panel>
      <Panel name="2">
        浩男男子汉！
        <p slot="content">
          一个比沐沐宝宝大整整129天的男人，却总被嘲讽着说是一个小男孩，总是怀着一颗自卑的心理。当然，以前也是得了便宜还卖乖，
          不懂得及时收敛，自以为是的带着满腔的好奇心去探索，却一头栽倒~
          慢慢懂得收敛的我，也是成长了不少，但是坏毛病还得一步一步的改正过来，至少目前有了新的座右铭（少说多做，为了我们，为了沐沐，把事情给
          好好解决了），必须得时刻提醒自己，尽力的去完善自身，给沐沐更加美好的未来~
        </p>
      </Panel>
    </Collapse>
    <Divider>
      <Button type="error" @click="open_heart">这是一句很重要的话呢</Button>
    </Divider>
    <!--    爱心特效-->
    <canvas id="canvas" width="800" height="500"></canvas>
    <div class="title main-content" v-if="is_open_heart">
      那就从现在起，正式成为我（管理员）的女朋友吧，慢慢的一起携手走向我们更美好的未来！~
    </div>
  </div>
</template>

<script>

  export default {
    name: "Vnew_index",
    data() {
      const s1 = document.createElement("script");
      const s2 = document.createElement("script");
      const s3 = document.createElement("script");
      s1.src = "static/beautiful_heart/js/FastBlur.js";
      s2.src = "static/beautiful_heart/js/index.js";
      s3.src = "static/beautiful_heart/js/jquery.min.js";
      var head = document.getElementsByTagName('HEAD').item(0);
      var style = document.createElement('link');
      style.href = 'https://fonts.googleapis.com/css?family=Lato:100';
      style.rel = 'stylesheet';
      style.type = 'text/css';
      document.body.appendChild(s1);
      document.body.appendChild(s2);
      document.body.appendChild(s3);
      head.appendChild(style);
      return {
        value1: '1',
        is_open_heart: false,
      }
    },
    methods: {
      open_heart() {
        this.is_open_heart = !this.is_open_heart;
      },
    }

  }
</script>

<style scoped>
  .main-content {
    margin-top: 700px;
  }

  body {
    background: #ef6666;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  canvas {
    background: #ef6666;
    position: absolute;
  }

  div.metadata {
    position: absolute;
    bottom: 0;
    width: 100%;

    font-family: Helvetica, Arial;
    font-size: 11px;
    font-weight: bold;
    text-align: center;
    color: rgba(151, 26, 22, 1);
  }

  div.metadata p {
    height: 20px;
  }

  a {
    color: inherit;
    text-decoration: none;
    display: inline-block;
    padding: 0 4px 3px 4px;
    border-bottom: 2px solid rgba(151, 26, 22, 1);
    transition: all .2s;
  }

  a:hover {
    padding: 0 4px 1px 4px;
    border-bottom: 4px solid rgba(254, 121, 68, 0.4);
  }

  div.title {
    position: absolute;
    top: 0;
    width: 100%;
    text-align: center;
    font-family: 'Lato', sans-serif !important;
    font-style: normal;
    font-weight: 100;
    font-size: 70px;
    padding-top: 40px;
    color: rgba(254, 255, 240, 1);
  }
</style>
