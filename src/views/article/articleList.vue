<template>
  <div>
    <ul class="article-list">
      <li class="article-menu" v-for="(v,i) in articleDatas" :key="i">
        <a href="javascript:;" class="list-face">
          <!-- <img src="${v.author.avatar}" alt="${v.author}"> -->
        </a>
        <h2>
          <a href="javascript:;" class="layui-badge">{{v.tips}}</a>
          <a href="javascript:;" @click="goToDetail(v._id)" class="articlt-title ellipsis">
            {{v.title}}
          </a>
        </h2>
        <div class="list-info">
          <a href="javascript:;">{{v.author.username}}</a>
          <span>{{new Date(v.createTime).toLocaleString()}}</span>
          <span class="list-reply">
            <i title="评论" class="layui-icon layui-icon-dialogue">
              {{v.commentNum}}
            </i>
          </span>
        </div>
      </li>
    </ul>
    <div id="laypage" data-maxNum=maxNum></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        articleDatas: []
      }
    },
    methods: {
      getArticleList(){
        this.$axios.get('/article/getlist').then(res=>{
          this.articleDatas = res.data.artList
        })
      },
      goToDetail(id){
        this.$router.push({
          path: '/blog/index/article_detail',
          query: {
            id
          }
        })
      }
    },
    mounted() {
      this.getArticleList()
    },
  }
</script>

<style scoped lang="scss">
  .article-list{
    background-color: #fff;
    .article-menu {
      position: relative;
      padding: 15px 15px 15px 75px;
      border-bottom: 1px dotted #e2e2e2;
      .list-face {
        position: absolute;
        top: 15px;
        left: 15px;
      }
      .list-info {
        margin-top: 7px;
        * {
          padding-right: 10px;
          color: #999;
        }
        .list-reply {
          float: right;
          margin-top: 3px;
        }
      }
    }
  }
  


</style>