<template>
  <div>
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8">
          <div class="content default-box layui-text">
            <h1 class="art-title text-center article-title" data-artid="">{{}}</h1>
            <div class="other-info text-center article-data">
              <span class="article-author"></span>
              <span>&nbsp;&nbsp;发表于：</span>
              <span class="article-time"></span>
              <span>&nbsp;分类：</span>
              <span class="article-tip"></span>
            </div>
            <div class="article-detail article-content" style="padding:10px;"></div>
          </div>
          <div class="comment default-box">
            <fieldset class="text-center">
              <legend>评论</legend>
              
            </fieldset>
            <div class="txt">
                <textarea id="comment-txt" placeholder=""></textarea>
                <button class="layui-btn">回复</button>
            </div>
            <ul class="comment-list">
            </ul>
          </div>
        </div>
        <div class="layui-col-md4">
          <div class="layui-card">
            <div class="layui-card-header"><strong>最新公告</strong></div>
            <div class="layui-card-body announce">
              <p><a href="">刚刚发表了一篇关于js的博客</a></p>
              <p><a href="">今天天气真好，出来钓鱼</a></p>
              <p><a href="">当今IT发展趋势</a></p>
              <p><a href="">关于node的坑</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        aticleDetailData: {},
      }
    },
    methods: {
      getArticleDetail(){
        // console.log(this.$route.query.id)
        this.$axios.get('/article/detail/'+this.$route.query.id).then(res=>{
          console.log(res);
          
        })
      }
    },
    created() {
      
    },
    mounted() {
      this.getArticleDetail()
    },
  }
</script>

<style scoped lang="scss">
  #loading{
    position: absolute; 
    text-align: center; 
    width: 100%; 
    height: 100%; 
    background-color: #000; 
    opacity: .5;
    z-index: 999;
    overflow: hidden;
  }
  #loading i{
    display: block;
    margin-top: 200px;
    font-size: 70px;
    color: #fff;
  }
</style>