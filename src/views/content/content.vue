<template>
  <div class="layui-container main">
		<div class="layui-row layui-col-space15">
			<div class="layui-col-md8">
        <router-view></router-view>
        <!-- <article-list></article-list> -->
			</div>
			<div class="layui-col-md4">
        <div id="echarts" style="width: 100%; height: 400px;"></div>
			</div>
		</div>
	</div>
</template>

<script>
  import articlePopular from './subChild/articlePopular.vue'
  export default {
    components: {
      articlePopular,
    },
    data() {
      return {
        tipY: '',
      }
    },
    methods: {
      getYData(data){
        this.tipY = [0,0,0]
        data.forEach(v => {
          switch (v.tips) {
            case 'HTML':
            case 'CSS':
            case 'JavaScriot':
            case 'node.js':
            case 'vue.js':
              this.tipY[0]++
              break 
            case 'Java':
            case 'Python':
            case 'C++':
            case 'PHP':
              this.tipY[1]++
              break;
            case '运维':
            case '测试':
            case '设计':
              this.tipY[2]++
              break;
          }
        });
        this.eChartsInit()
      },
      eChartsInit(){
        var that = this
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById('echarts'));
        // 绘制图表
        myChart.setOption({
          title: {
            text: '模块文章数量比例'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'right',
            data:['前端','后端','更多']
          },
          series: [
            {
              name:'访问来源',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                   show: false
                }
              },
              data:[
                {value:that.tipY[0], name:'前端'},
                {value:that.tipY[1], name:'后端'},
                {value:that.tipY[2], name:'更多'}
              ]
            }
          ]
        });
      },
      getArticleList(){
        this.$axios.get('/article/getlist', {params:{tip: ''}}).then(res=>{
          this.getYData(res.data.artList)
        })
      }
    },
    mounted() {
      this.getArticleList()
    },
  }
</script>

<style scoped lang="scss">
  .main{
    margin-top: 15px;
    min-height: 500px;
    .layui-card{
      background-color: #fff;
      .announce p{
        margin-top: 16px;
      }
    }
  }
</style>