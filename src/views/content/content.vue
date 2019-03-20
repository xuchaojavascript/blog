<template>
  <div class="layui-container main">
		<div class="layui-row layui-col-space15">
			<div class="layui-col-md8">
        <article-list></article-list>
			</div>
			<div class="layui-col-md4">
				<div class="layui-card">
					<div class="layui-card-header"><strong>最新公告</strong></div>
					<div class="layui-card-body announce">
						<p><a href="">刚刚发表了一篇关于js的博客</a></p>
						<p><a href="">今天天气真好，出来钓鱼</a></p>
						<p><a href="">当今IT发展趋势</a></p>
						<p><a href="">关于node的坑</a></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  import articleList from './subChild/articleList.vue'
  import articlePopular from './subChild/articlePopular.vue'
  export default {
    components: {
      articleList,
      articlePopular,
    },
  }
</script>

<style scoped lang="scss">
  .main{
    min-height: 500px;
    .list-face {
      position: absolute;
      top: 15px;
      left: 15px;
    }
  }
</style>