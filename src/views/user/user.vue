<template>
  <div>
    <div class="blog-header layui-bg-black">
        <div class="layui-container">
          <ul class="layui-nav">
            <li class="layui-nav-item" id="haha">
              <router-link :to="{path:'/'}">
                <i class="layui-icon layui-icon-home">首页</i>
              </router-link>
            </li>
          </ul>
          <ul class="layui-nav blog-user">
            <li class="layui-nav-item">
              <a href="javascript:;" @click="loginOut">退出登录</a>
            </li>
          </ul>
        </div>
    </div>
    <div class="layui-side layui-bg-black">
      <div class="layui-side-scroll">
        <ul lay-filter="list" class="layui-nav layui-nav-tree">
          <li class="layui-nav-item">
            <router-link :to="{path:'/user/user_manage'}" class="userManageLink layui-this" v-show="userManageMenu">用户管理</router-link>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{path:'/user/article_manage'}" :class="'userManageLink' + (userManageMenu?'':' layui-this')">文章管理</router-link>
          </li>
          
          <li class="layui-nav-item">
            <router-link :to="{path:'/user/common_manage'}" :class="'userManageLink'">评论管理</router-link>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{path:'/user/userface'}" :class="'userManageLink'">头像上传</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="layui-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userInfo: '',
        userManageMenu: true,
        element: '',
      }
    },
    methods: {
      // 退出登录
      loginOut(){
        let that = this
        this.$axios.get('/user/logout').then(res => {
          if(res.data.status){
            layui.use(['layer'], function(){
              let layer = layui.layer;
              let element = layui.element;
              layer.msg(res.data.msg,{time:1000},() => {
                window.localStorage.setItem('userData', ''),
                that.$router.push({path: '/'})
                window.history.go(0)
              })
            })
          }
        })
      }
    },
    created() {
      
    },
    mounted() {
      layui.use('element', function(){
        let element = layui.element;
        element.render()
      });
      this.userInfo = JSON.parse(window.localStorage.getItem('userData'))
      if(this.userInfo.role == 999){
        this.userManageMenu = true
        this.$router.push({path: '/user/user_manage'})
      }else{
        this.userManageMenu = false
        this.$router.push({path: '/user/article_manage'})
      }
    },
  }
</script>

<style scoped lang="scss">
  .blog-header {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #404553;
    border-right: 1px solid #404553;
    border-radius: 0;
    .layui-nav {
      font-size: 16px;
    }
    .blog-user {
      position: absolute;
      top: 0;
      right: 0;
    }
    .layui-nav-bar {
      background-color: #f66;
    }
  }
  .layui-side{
    position: fixed;
    left: 0;
    top: 60px;
    bottom: 0;
    z-index: 999;
    width: 200px;
    overflow-x: hidden;
    .layui-side-scroll{
      .userManageLink{
        font-size:16px; 
        text-align:center;
      }
    }
  }
  .layui-body{
    position: relative;
    width: calc(100% - 200px);
    padding: 15px;
  }
</style>