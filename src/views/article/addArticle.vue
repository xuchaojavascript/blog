<template>
  <div id="main">
    <div class="layui-container">
      <div class="article-add layui-form">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
          <div id="editing" class="layui-form layui-form-content">
            <div class="layui-tab-item layui-show">
              <form action="/article" method="POST">
                <div class="layui-row layui-col-space15 layui-form-item">
                  <div class="layui-col-md3">
                    <label for="" class="layui-form-label">分类</label>
                    <div class="layui-input-block">
                      <select lay-verify="required" name="tips" lay-filter="column">
                        <option value=""></option>
                        <option value="javascript">javascript</option>
                        <option value="html">html</option>
                        <option value="css">css</option>
                        <option value="nodejs">nodejs</option>
                        <option value="react">react</option>
                        <option value="angular">angular</option>
                        <option value="vue">vue</option>                        
                      </select>
                    </div>
                  </div>
                  <div class="layui-col-md9">
                    <label for="" class="layui-form-label">标题</label>
                    <div class="layui-input-block">
                        <input type="text" id="L_title" class="layui-input" name="title" required="" lay-verify="required" autocomplete="off">
                    </div>
                  </div>
                </div>
                <div class="layui-form-item layui-form-text">
                  <textarea id="article-content"></textarea>
                </div>
              </form>
            </div>
          </div>
          <div class="layui-form-item">
            <button class="layui-btn" lay-filter="send" lay-submit>立即发布</button>
          </div>
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

      }
    },
    created() {
    },
    mounted() {
      let that = this
      layui.use(['form', 'layedit', "element", 'layer'], function() {
        let val = "#{logNot}";
        const form = layui.form;
        const layedit = layui.layedit;
        var layer = layui.layer;
        const $ = layui.$
        const index = layedit.build('article-content', {
          hideTool: [
            'image' //插入图片
          ]
        }); //建立编辑器
        form.on("submit(send)", (res) => {
          const { tips, title } = res.field
          if(layedit.getText(index).trim().length === 0)return layer.alert("请输入内容")
          const data = {
            author: JSON.parse(window.localStorage.getItem('userData')).userId,
            tips,
            title,
            content: layedit.getContent(index)
          }
          that.$axios.post('/article/post', data).then(res=>{
            if(res.status){
              layer.msg(res.data.msg,{time:1000},() => {
                that.$router.push({path: '/'})
              })
            }else{
              layer.msg(`发表失败，失败信息：${msg.msg}`)
            }
          })
        })
        form.render()
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
      padding-top: 7.5px;
    }
  }
  .layui-form .layui-form-label{
    width: 110px;
    padding: 8px 15px;
    height: 38px;
    line-height: 20px;
    border: 1px solid #e6e6e6;
    border-radius: 2px 0 0 2px;
    text-align: center;
    background-color: #FBFBFB;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    box-sizing: border-box;
  }
  .layui-tab-title{
    margin-bottom: 20px;
  }
</style>