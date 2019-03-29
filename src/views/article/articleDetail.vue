<template>
  <div>
    <div id="loading" v-show="isShowLoading">
      <i class="layui-icon layui-anim layui-anim-rotate layui-anim-loop layui-icon-loading"></i>
    </div>
    <div class="content default-box layui-text">
      <h1 class="art-title text-center article-title" data-artid="">{{aticleDetailData.title}}</h1>
      <div class="other-info text-center article-data">
        <span class="article-author"></span>
        <span>&nbsp;&nbsp;发表于：</span>
        <span class="article-time">{{aticleDetailData.article.createTime | formatting}}</span>
        <span>&nbsp;分类：</span>
        <span class="article-tip">{{aticleDetailData.article.tips}}</span>
      </div>
      <div class="article-detail article-content" style="padding:10px;">
        {{aticleDetailData.article.content}}
      </div>
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
</template>

<script>
  export default {
    data() {
      return {
        isShowLoading: true,
        aticleDetailData: {},
      }
    },
    methods: {
      getArticleDetail(){
        // console.log(this.$route.query.id)
        this.$axios.get('/article/detail/'+this.$route.query.id).then(res=>{
          this.aticleDetailData = res.data
          console.log(this.aticleDetailData);
          
          this.isShowLoading = false
        })
      },
      initForm(){
        console.log(1);
        
        layui.use(['form', 'layedit', "element"], function() {
          let val = "#{logNot}";
          const form = layui.form;
          const layedit = layui.layedit;
          const $ = layui.$
          const idx = layedit.build('comment-txt', {
              tool: [],
              height: 160
          }); //建立编辑器
          $(".layui-unselect.layui-layedit-tool").hide();
          $(".comment button").click(async () => {
            let content = layedit.getContent(idx).trim()
        
            if(content.length === 0)return layer.msg("评论内容不能为空")

            const data = {
              content,
              article: $(".art-title").data("artid")
            }
            
            $.post("/comment", data, (data) => {
              layer.msg(data.msg, {
                time: 1000,
                end(){
                  if(data.status === 1){
                    window.location.reload()
                  }
                }
              })
            })
          })
          form.render()
        });
      }
    },
    created() {
      this.getArticleDetail()
      
    },
    mounted() {
      this.initForm()
      //  发表评论
      
    }
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
  /* 文章默认盒子padding */
  .default-box{
    padding: 20px;
  }
  /* 文字居中 */
  .text-center{
    text-align: center;
  }
  .layui-col-space15 .layui-col-md8{
    /* 背景回复默认 跟评论区分开来 */
    background: #F2F2F2;
  }

  .content{
    /* height: 100px; */
    margin-bottom: 20px;
  }

  .content, .comment{
    background: #fff;
  }

  .other-info{
    padding: 20px 0;
  }

  fieldset{
    border-color: #eee;
    border-width: 1px 0 0;
    font-size: 20px;
  }

  .comment button{
    margin-top: 20px;
  }

  .txt{
    padding-bottom:20px;
    border-bottom:1px solid;
    border-color:#999;
  }

  .comment-list li{
    position: relative;
    padding-left: 60px;
    border-bottom: 1px solid #bbb;
    padding-top: 15px;
  }
  .comment-list li img{
    position: absolute;
    top: 15px;
    left: 0;
    width: 50px;
    height: 50px;
  }
  .comment-list li p{
    padding: 3px;
  }
  .author{
    color:#01AAED;
    font-size:18px;
  }

  .time{
    color:#bbb;
  }

  .she-said{
    padding: 20px 0;
    margin-left: -60px;
  }
</style>