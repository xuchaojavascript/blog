<template>
  <div>
    <table class="layui-table" lay-filter="demo">
      <thead>
        <tr>
          <th>文章题目</th>
          <th>分类</th>
          <th>文章作者</th>
          <th>评论数量</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in tableData" :key="i">
          <td><p>{{item.title}}</p></td>
          <td>{{item.tips}}</td>
          <td>{{item.author.username}}</td>
          <td>{{item.commentNum ? item.commentNum : 0}}</td>
          <td>
            <button class="layui-btn" @click="showDetail(item)">查看</button>
            <button class="layui-btn layui-btn-danger" @click="deleteArticle(item._id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        layer: ''
      }
    },
    methods: {
      getArticleList(){
        let userInfo = JSON.parse(window.localStorage.getItem('userData'))
        let data = {
          params: {
            userId: ''
          }
        }
        if(userInfo.role !== 999){
          data.params.userId = userInfo.userId
        }
        this.$axios.get('/article/list', data).then(res => {
          this.tableData = res.data.articleList
        })
      },
      deleteArticle(articleId){
        let that = this
        if (confirm("确认删除本文章以及文章下的评论？")){
          let data = {
            params: {
              articleId
            }
          }
          this.$axios.delete('/article/delete',data).then(res => {
            layui.use('layer', function(){
              var layer = layui.layer;
              layer.msg(res.data.msg)
              that.getArticleList()
            });
          })
        }
      },
      showDetail(data){    
        layer.open({
          area: '500px',
          title: data.title,
          content: data.content
        });
      }
    },
    mounted(){
      this.getArticleList()
    },
    created() {
      let that = this
      layui.use(['table','layer'], function(){
        that.layer = layui.layer
      })
    },
  }
</script>

<style scoped lang="scss">

.layui-table{
  width: 100%;
  color: #666;
  th, td{
    text-align: center;
  }
}
</style>