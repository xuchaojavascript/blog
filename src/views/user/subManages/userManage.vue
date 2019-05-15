<template>
  <div class="layui-body">
    <table class="layui-table" lay-filter="demo">
      <thead>
        <tr>
          <th>用户名</th>
          <th>权限</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item, i) in tableData" :key="i">
          <td>{{item.username}}</td>
          <td>{{item.role}}</td>
          <td><button class="layui-btn layui-btn-danger">删除</button></td>
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
        this.$axios.get('/user/list').then(res => {
          this.tableData = res.data.userList
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