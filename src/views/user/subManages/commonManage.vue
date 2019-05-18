<template>
  <div>
    <table class="layui-table" lay-filter="demo">
      <thead>
        <tr>
          <th>被评文章</th>
          <th>评论作者</th>
          <th>评论内容</th>
          <th>评论时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in tableData" :key="i">
          <td>{{item.article.title}}</td>
          <td>{{item.author.username}}</td>
          <td>{{item.content}}</td>
          <td>{{item.createTime.toLocaleString()}}</td>
          <td>
            <button class="layui-btn">查看文章详情</button>
            <button class="layui-btn layui-btn-danger" @click="deleteComment(item._id)">删除</button>
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
        tableData: []
      }
    },
    methods: {
      getCommentList(){
        let userInfo = JSON.parse(window.localStorage.getItem('userData'))
        let data = {
          params: {
            userId: ''
          }
        }
        if(userInfo.role !== 999){
          data.params.userId = userInfo.userId
        }
        this.$axios.get('/comment/list', data).then(res => {
          this.tableData = res.data.commentList
          console.log(this.tableData);
        })
      },
      deleteComment(commentId){
        let that = this
        let data = {
          params: {
            commentId
          }
        }
        this.$axios.delete('/comment/delete',data).then(res => {
          layui.use('layer', function(){
            var layer = layui.layer;
            layer.msg(res.data.msg)
            that.getCommentList()
          });
        })
      }
    },
    mounted(){
      this.getCommentList()
    },
    created() {
      layui.use('table', function(){

      })
    },
  }
</script>

<style scoped lang="scss">
.layui-table{
  color: #666;
  th,td{
    text-align: center;
  }
}
</style>