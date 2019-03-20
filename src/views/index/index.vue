<template>
  <div class="index" v-if="showSwipe">
    <div class="blog-header layui-bg-cyan">
      <div class="layui-container">
        <ul class="layui-nav layui-bg-cyan">
          <li class="layui-nav-item layui-this">
            <router-link :to="{path:'/'}">
            <i class="layui-icon layui-icon-home">
              首页
            </i>
            </router-link>
          </li>
          <li class="layui-nav-item" v-for="(v, i) in menus" :key="i">
            <router-link :to="{path:'/blog',query: {id: v.id}}">{{v.name}}</router-link>
          </li>
        </ul>
        <ul class="layui-nav blog-user layui-bg-cyan" v-if="isAlyLogin">
            <li class="layui-nav-item">
              <router-link :to="{path:'/user'}">个人中心</router-link>
              <!-- <span class="layui-badge-dot"></span> -->
            </li>
            <li class="layui-nav-item">
              <a href="javascript:;">
                <img class="user-avatar layui-nav-img" src="" alt="">
                <span class="user-name">{{userInfo.username}}</span>
                <span class="layui-nav-more"></span>
              </a>
              <dl class="layui-nav-child">
                <dd>
                  <a href="javascript:;" class="user-logout" @click="loginOut">退出登录</a>
                </dd>
              </dl>
            </li>
        </ul>
        <ul class="layui-nav blog-user layui-bg-cyan user-notlog" v-else>
          <li class="layui-nav-item"><router-link :to="{path:'/login'}">登录</router-link></li>
          <li class="layui-nav-item"><router-link :to="{path:'/register'}">注册</router-link></li>
        </ul>
      </div>
	  </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['refer'])
  },
  data() {
    return {
      userInfo: {},
      menus: [
        {
          name: '前端',
          id: '1'
        },
        {
          name: '后端',
          id: '2'
        },
        {
          name: '更多',
          id: '3'
        },
      ],
      isAlyLogin: false,
      showSwipe: true,
    }
  },
  methods: {
    // 跳转登录注册页面
    goto(id){
      if(id == 1){
        this.$router.push({
          path:  `/login`,
          query:{
            id,
          }
        })
      }else{
        this.$router.push({
          path:  `/register`,
          query:{
            id,
          }
        })
      }
    },
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
              window.history.go(0)
            })
          })
        }
      })
    }
  },
  mounted() {
    layui.use('element', function(){
      let element = layui.element;
      element.render()
    });
    let userData = window.localStorage.getItem('userData')
    if(!userData)return
    this.userInfo = JSON.parse(userData)
    if(this.userInfo){
      this.isAlyLogin = true
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
</style>
