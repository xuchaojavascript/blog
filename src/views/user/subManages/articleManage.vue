<template>
  <div class="layui-body">
    <!-- <table class="layui-table" lay-data="{width: 892, url:'/user/articles', page:true, id:'idTest'}" lay-filter="demo"> -->
    <table class="layui-table" lay-filter="demo">
      <thead>
        <tr>
          <th>文章</th>
          <th>分类</th>
          <th>评论数量</th>
          <th>操作</th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
  export default {
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
    th{
      text-align: center;
    }
  }
}
</style>