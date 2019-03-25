<template>
  <div id="main">
    <div class="layui-container">
      <div class="layui-tab layui-tab-card">
        <ul class="layui-tab-title layui-bg-gray">
          <li :class="isLogin?'user-logreg layui-this':'user-logreg'" @click="isLogin = true">
            <router-link :to="{path:'/login'}">用户登录</router-link>
          </li>
          <li :class="!isLogin?'user-logreg layui-this':'user-logreg'" @click="isLogin = false">
            <router-link :to="{path:'/register'}">用户注册</router-link>
          </li>
        </ul>
        <div class="layui-tab-content">
          <div class="user-logreg-con" v-if="isLogin">
            <div class="layui-form-item">
              <label for="" class="layui-form-label">用户名</label>
              <div class="layui-input-inline">
                <input type="text" class="layui-input login-username" name="username" required lay-verify="required" placeholder="请输入用户名" v-model="loginInfo.username">
              </div>
            </div>
            <div class="layui-form-item">
              <label for="" class="layui-form-label">密码</label>
              <div class="layui-input-inline">
                <input type="password" class="layui-input login-pwd" name="password" required lay-verify="required" placeholder="请输入密码" v-model="loginInfo.password">
              </div>
            </div>
            <div class="layui-form-item">
                <div class="layui-input-block">
                    <button class="layui-btn layui-btn-normal login-submit" @click="submitInfo">立即提交</button>
                    <button class="layui-btn layui-btn-danger login-reset" @click="resetInfo">重置</button>
                </div>
            </div>
          </div>
          <div class="user-logreg-con" v-else>
            <div class="layui-form-item">
                <label for="" class="layui-form-label">用户名</label>
                <div class="layui-input-inline">
                  <input type="text" class="layui-input reg-username" name="username" required lay-verify="required" placeholder="请输入用户名" v-model="registerInfo.username">
                </div>
              </div>
              <div class="layui-form-item">
                <label for="" class="layui-form-label">密码</label>
                <div class="layui-input-inline">
                  <input type="password" class="layui-input reg-pwd" name="password" required lay-verify="required" placeholder="请输入密码" v-model="registerInfo.password">
                </div>
              </div>
              <div class="layui-form-item">
                <label for="" class="layui-form-label">确认密码</label>
                <div class="layui-input-inline">
                    <input type="password" class="layui-input reg-cfmpwd" name="confirmPWD" required lay-verify="required" placeholder="请确认密码" v-model="confirmPwd">
                </div>
              </div>
              <div class="layui-form-item">
                  <div class="layui-input-block">
                      <button class="layui-btn layui-btn-normal reg-submit" @click="submitInfo">立即提交</button>
                      <button class="layui-btn layui-btn-danger reg-reset" @click="resetInfo">重置</button>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      // ...mapState(['refer'])
    },
    data() {
      return {
        isLogin: '',
        loginInfo: {
          username: '',
          password: '',
        },
        registerInfo: {
          username: '',
          password: '',
        },
        confirmPwd: '',        
      }
    },
    methods: {
      submitInfo(){
        var that = this
        if(this.isLogin){
          if(this.verify(this.loginInfo)){
            this.$axios.post('/user/login', this.loginInfo).then(res=>{
              layui.use('layer', function(){
                var layer = layui.layer;
                if(res.data.status){
                  layer.msg(res.data.msg,{time:1000},() => {
                    window.localStorage.setItem('userData', JSON.stringify(res.data.userData))
                    that.$router.push({path: '/'})
                  })
                }else{
                  layer.msg('登录失败,'+res.data.msg);
                }
              });
            })
          }
        }else{
          if(this.verify(this.registerInfo)){
            layui.use('layer', function(){
              var layer = layui.layer;
              if(!this.confirmPwd){
                layer.msg('请输入确认密码');
              }else if(this.registerInfo.password != this.confirmPwd){
                layer.msg('密码不一致');
              }else{
                this.$axios.post('/user/reg', this.registerInfo).then(res=>{
                  if(res.data.status){
                    layer.msg('注册成功，跳转登录页面');
                    this.isLogin = true
                  }else{
                    layer.msg('注册失败,'+res.data.msg);
                  }
                })
              }
            });
          }
        }
      },
      resetInfo(){
        if(this.isLogin){
          this.loginInfo = {
            username: '',
            password: '',
          }
        }else{
          this.registerInfo = {
            username: '',
            password: '',
          }
        }
      },
      verify(obj){
        if(!obj.username){
          layer.msg('请输入用户名');
          return false
        }else if(!obj.password){
          layer.msg('请输入密码');
          return false
        }
        return true
      }
    },
    created() {
      // console.log(this.$route);
      // console.log(this.$route.fullPath)
      if(this.$route.fullPath == '/login'){
        this.isLogin = true
      }else{
        this.isLogin = false
      }
    },
  }
</script>

<style scoped lang="scss">
/* 主要内容区域设置最小高度 */
#main{
  .layui-container{
    min-height: 500px;
    margin-bottom: 15px;
    margin-top: 100px;
    padding: 0;
    border-radius: 2px;
    background-color: #fff;
    .layui-tab-card {
      border-width: 1px;
      border-style: solid;
      border-bottom-width: 0;
      box-shadow: none;
      .layui-tab-title{
        background-color: #e4e1e1 !important;
      }
    }
  }
  .layui-form-item{
    margin-top: 24px;
    .layui-input, .layui-input-block{
      width: 220px;
    }
    .layui-btn~.layui-btn{
      float: right;
    }
  }
}


</style>