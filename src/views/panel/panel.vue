<template>
<div>
  <div class="blog-panel">
    <div class="layui-container">
      <ul class="layui-clear">
        <li class="panel-cart" v-for="(v,i) in menus" :key="i">
          <a href="javascript:;" @click="goList(v.name)">{{v.name}}</a>
        </li>
        <!-- <li><a href="javascript:;">HTML</a></li>
        <li><a href="javascript:;">CSS</a></li>
        <li><a href="javascript:;">JavaScript</a></li>
        <li><a href="javascript:;">node.js</a></li>
        <li><a href="javascript:;">vue.js</a></li> -->
      </ul>
      <div class="blog-column-right">
        <a href="javascriot:;" @click="addArticle" class="layui-btn layui-bg-blue">添加文章</a>
      </div>
    </div>
	</div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        menus:[]
      }
    },
    methods: {
      getMenus(id){
        if(!id || id == '1'){
          this.menus = [
            {name: 'HTML',id: 1},
            {name: 'CSS',id: 2},
            {name: 'JavaScript',id: 3},
            {name: 'node.js',id: 4},
            {name: 'vue.js',id: 5},
            {name: '其他',id: 6},
          ]
        }else if(id == '2'){
          this.menus = [
            {name: 'Java',id: 1},
            {name: 'Python',id: 2},
            {name: 'C++',id: 3},
            {name: 'PHP',id: 4},
            {name: '其他',id: 5},
          ]
        }else if(id == '3'){
          this.menus = [
            {name: '运维',id: 1},
            {name: '测试',id: 2},
            {name: '设计',id: 3},
            {name: '其他',id: 4},
          ]
        }
      },
      addArticle(){
        let userInfo = window.localStorage.getItem('userData')
        if(userInfo){
          this.$router.push({
            path: '/addArticle'
          })
        }else{
          layui.use(['layer'], function(){
            let layer = layui.layer;
            layer.msg('请先登录')
          })
        }
      },
      goList(tip){
        this.$router.push({
          path: '/blog/index/article_list',
          query: {
            tip
          }
        })
      }
    },
    mounted() {

      this.getMenus(1)
      // this.getArticleList()
    },
    watch: {
      $route(newVal,oldVal){
        this.getMenus(newVal.query.id)
      }
    },
  }
</script>

<style scoped lang="scss">
.blog-panel .layui-container{
  padding: 0;
  position: relative;
  vertical-align: middle;
  
}
.blog-panel {
  height: 50px;  
  margin-bottom: 15px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
  .layui-clear{
    line-height: 50px;
  }
  .blog-column-right{
    line-height: 50px;
  }
}

.blog-panel ul li {
  position: relative;
  display: inline-block;
  height: 50px;
}

.blog-panel ul li.layui-this a {
  color: #5FB878;
}

.blog-panel ul li a {
  padding: 0 20px;
}

.blog-panel .layui-container {
  position: relative;
  vertical-align: middle;
}
.blog-column-right {
  position: absolute;
  top: 0;
  right: 0;
}
</style>