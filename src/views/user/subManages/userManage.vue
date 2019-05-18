<template>
  <div>
    <table class="layui-table" lay-filter="demo">
      <thead>
        <tr>
          <th>用户名</th>
          <th>权限</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in tableData" :key="i" v-show="item.role != 999">
          <td>{{item.username}}</td>
          <td>{{item.role}}</td>
          <td><button class="layui-btn layui-btn-danger" @click="deleteUser(item._id)">删除</button></td>
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
      getUserList(){
        this.$axios.get('/user/list').then(res => {
          this.tableData = res.data.userList
          console.log(this.tableData);
        })
      },
      deleteUser(userId){
        let that = this
        let data = {
          params: {
            userId
          }
        }
        this.$axios.delete('/user/delete',data).then(res => {
          layui.use('layer', function(){
            var layer = layui.layer;
            layer.msg(res.data.msg)
            that.getUserList()
          });
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
.layui-table{
  width: 100%;
  color: #666;
  th, td{
    text-align: center;
  }
}
</style>