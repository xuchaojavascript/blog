<template>
  <div>
    <div>头像上传
      <button id="upload" class="layui-btn layui-btn-danger" type="button" style="margin-left:10px;">
        <i class="layui-icon"></i>上传图片
      </button>
      <div class="layui-inline layui-word-aux"> 图片大小不超过 60KB </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        layer: '',  
      }
    },
    methods: {
      getBase64(url, callback, outputFormat){
        var canvas = document.createElement('CANVAS'),
    　　ctx = canvas.getContext('2d'),
    　　img = new Image;
    　　img.crossOrigin = '*';
    　　img.onload = function(){
      　　canvas.height = img.height;
      　　canvas.width = img.width;
      　　ctx.drawImage(img,0,0);
      　　var dataURL = canvas.toDataURL(outputFormat || 'image/png');
      　　callback.call(this, dataURL);
      　　canvas = null; 
        };
    　　img.src = url;
      },
      init(){
        let that = this
        layui.use(['layer','upload'], () => {
          const $ = layui.$
          const layer = layui.layer
          const upload = layui.upload

          // 设定文件大小限制
          upload.render({
            elem: '#upload',
            url: '/upload',
            size: 1024, //限制文件大小 单位kb
            done(res){
              console.log(res);
              
              // if(res.code === 1){
              //   layer.alert('上传成功')
              // }else{
              //   layer.alert('上传失败')
              // }
            }
          })
        })
      }
    },
    mounted() {
      this.init()
      // let image = 'http://xcjsj106.com:3000/avatar/img1.jpg'
      // image.crossOrigin = "*";
      this.getBase64('http://xcjsj106.com:3000/avatar/img1.jpg',function(base64Img){
        //转化后的base64
        alert(base64Img);
       })
      
    },
  }
</script>

<style scoped lang="scss">
</style>