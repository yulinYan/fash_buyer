<template>
    <div class="zxs-fwb">
        <header class="f-register-header">
            <div class="f-go-back" @click="toback"><img src="../../../public/assets/images/mine/mm_title_back.png"/></div>
            <div class="f-use-register">发布动态</div>
        </header>
        <div class="tou">
            <input type="text" placeholder="上传一个标题" v-model="title"><br>
            <input type="text" placeholder="上传一个描述" v-model="info"><br>
            <input type="text" placeholder="上传一个背景图" v-model="bg_img">
        </div>
        <div class="shangchuan" style="text-align: center">
            <p style="float: left; display: inline-block">上传图片:</p>
            <van-uploader
                    v-model="fileList"
                    multiple
                    :max-count="1"
                    :after-read="afterRead"
            />
            <input type="text" :placeholder="tip" v-model="tips">
        </div>
        <div ref="editor" class="z-wangeditor" style="text-align:left"></div>
        <button v-on:click="getContent">发布</button>

    </div>
</template>

<script>
    import E from 'wangeditor'
    import { Button,Uploader  } from 'vant';
    export default {
      name: 'editor',
      data () {
        return {
           editorContent: '',
           fileList: [],
            tip:"图片链接",
            tips:"",
            //商家发布橙圈
            title:"",
            info:"",
            bg_img:"",
        }
      },
        components:{
          [Button.name]:Button,
            [Uploader.name]:Uploader,
        },
      methods: {
          toback(){
              this.$router.go(-1);
          },
          //  发布动态全部内容
          getContent: function () {
              // alert(this.editorContent)
              console.log(this.title)
              let token = localStorage.getItem("token")
              fetch('http://119.3.190.106:5000/shop/commodity/release_circle/',{
                  method: "POST",
                  mode: "cors",
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({title:this.title, info:this.info, bg_img:this.bg_img, content:this.editorContent, token:token})
              }).then(res=>{
                  return  res.json();
              }).then(data=>{
                  console.log(data);
                  this.tips = data.data;
                  // alert(data.data);
              }).catch(err=>{
                  console.log(err);
              })
          },
          //  发送给OSS图片
          afterRead(file) {
              console.log(file.content)
              let token = localStorage.getItem("token")
              fetch('http://119.3.190.106:5000/shop/commodity/submit_pic/',{
                  method: "POST",
                  mode: "cors",
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({pics:file.content,token:token})
              }).then(res=>{
                  return  res.json();
              }).then(data=>{
                  console.log(data);
                  this.tips = data.data;
                  // alert(data.data);
              }).catch(err=>{
                  console.log(err);
              })
          },
      },
      mounted() {
        var editor = new E(this.$refs.editor)
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        editor.create()
      }
    }
</script>

<style>
    .z-wangeditor .w-e-toolbar{
        flex-wrap: wrap;
    }
    .zxs-fwb{
        background-color: white;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .f-register-header{
         width:100%;
         height:0.5rem;
         line-height:0.5rem;
         display: flex;
         justify-content: space-around;
         text-align: center;
         position: fixed;
         top:0;
         z-index:1;
         background-color: #FBF8FC;
         border-bottom: 1px solid #DDDDDD;
     }
    .f-use-register{
        width:100%;
        font-size: 0.18rem;

    }
    .f-go-back{
        height:0.5rem;
        position: absolute;
        left: 0;
        width:20%;
        display: flex;
        align-items: center;
    }
    .f-go-back img{
        width:0.28rem;
        height:0.28rem;
        margin-left: 0.1rem;
    }
    .tou{
        text-align: left;
        margin-top: 0.6rem;
    }
    .shangchuan{
        margin: 0;
        padding: 0;
    }
   .z-wangeditor .w-e-toolbar{
        flex-wrap: wrap !important;
    }
    input{
        width: 96%;
        display: block;
        height: 0.3rem;
        margin: 0rem auto;
        border: 1px solid #999999;
        outline: none;
    }
    button{
        width: 1rem;
        height: 0.5rem;
        border-radius: 0.05rem;
    }
</style>
