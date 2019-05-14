<template>
  <div id="main">
    <div class="layui-container">
      <div class="article-add">
        <div class="article-top">
          <div class="layui-col-md3 article-tip">
            <label>分类：</label>
            <select v-model="theme" @change="changeTheme">
              <option value="font">前端</option>
              <option value="back">后端</option>
              <option value="more">更多</option>
            </select>
            <select v-model="createData.tips">
              <option v-for="(item,i) in tipsArr" :value="item" :label="item" :key="i">{{item}}</option>
            </select>
          </div>
          <div class="layui-col-md9 article-title">
            <label>标题：</label>
            <input type="text" v-model="createData.title">
          </div>
        </div>
        <div>
          <textarea id="article-content"></textarea>
        </div>
        <div class="article-btn">
          <button class="layui-btn" @click="createArticle">立即发布</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        element: '',
        tipsArr: ['HTML','CSS','JavaScript','node.js','Vue.js','其它'],
        theme: 'font',
        createData: {
          tips: 'HTML',
          title: '',
        },
        textEditor: '',
        layedit: ''
      }
    },
    methods: {
      createArticle(){
        let that = this
        this.createData.content = this.layedit.getContent(this.textEditor)
        this.createData.author = JSON.parse(window.localStorage.getItem('userData')).userId
        this.$axios.post('/article/post', this.createData).then(res=>{
          layui.use('layer', function(){
            var layer = layui.layer;
            if(res.status){
              layer.msg(res.data.msg,{time:1000},() => {
                that.$router.push({path: '/'})
              })
            }else{
              layer.msg(`发表失败，失败信息：${msg.msg}`)
            }
          });
        })
      },
      changeTheme(){
        if(this.theme == 'font'){
          this.tipsArr = ['HTML','CSS','JavaScript','node.js','Vue.js','其它']
          this.createData.tips = 'HTML'
        }else if(this.theme == 'back'){
          this.tipsArr = ['Java','Python','C++','PHP','其它']
          this.createData.tips = 'Java'
        }else{
          this.tipsArr = ['运维','测试','设计','其他']
          this.createData.tips = '运维'
        }
      }
    },
    created() {
      console.log(JSON.parse(window.localStorage.getItem('userData')));
      
    },
    mounted() {
      let that = this
      layui.use(['layedit'], function() {
        let val = "#{logNot}";
        that.layedit = layui.layedit;
        const $ = layui.$
        that.textEditor = that.layedit.build('article-content', {
          hideTool: [
            'image' //插入图片
          ]
        });
      });
    },
  }
</script>

<style scoped lang="scss">
  #main .layui-container {
    margin-top: 15px;
    margin-bottom: 15px;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
    border: 1px solid #fff;
    .article-add {
      padding-top: 15px;
      .article-top{
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        color: #666;
        text-indent: 10px;
        .article-tip{
          select{
            width: 100px;
            height: 30px;
          }
        }
        .article-title{
          input{
            width: 90%;
            height: 30px;
          }
        }
      }
      .article-btn{
        margin: 10px;
      }
    }
  }
</style>