<template>
  <div class="layui-body">
    <!-- <table class="layui-table" lay-data="{width: 892, url:'/user/articles', page:true, id:'idTest'}" lay-filter="demo"> -->
    <table class="layui-table" lay-filter="demo">
      <thead>
        <tr>
          <th>文章题目</th>
          <th>文章内容</th>
          <th>分类</th>
          <th>文章作者</th>
          <th>评论数量</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item, i) in tableData" :key="i">
          <td>{{item.title}}</td>
          <td>{{item.content}}</td>
          <td>{{item.tips}}</td>
          <td>{{item.author.username}}</td>
          <td>{{item.commentNum ? item.commentNum : 0}}</td>
          <td>
            <button class="layui-btn">查看文章详情</button>
            <button class="layui-btn layui-btn-danger">删除</button>
          </td>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: []
      }
    },
    methods: {      
      getUserList(){
        let userInfo = JSON.parse(window.localStorage.getItem('userData'))
        let data = {
          params: {
            userId: ''
          }
        }
        console.log(userInfo);
        if(userInfo.role !== 999){
          data.params.userId = userInfo.userId
        }
        this.$axios.get('/article/list', data).then(res => {
          this.tableData = res.data.articleList
          console.log(this.tableData);
        })
      }
    },
    mounted(){
      this.getUserList()
    },
    created() {
      layui.use('table', function(){

      })
    },
  }
</script>

<style scoped lang="scss">
.layui-body{
  background-color: #f0f0f0;
  margin-top: 60px;
  padding: 15px;
  .layui-table{
    color: #666;
    th, td{
      text-align: center;
    }
  }
}
</style>