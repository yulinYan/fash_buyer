<template>
    <div class="f-certification">
        <header class="f-certification-header">
            <div class="f-go-back" @click="toback"><img src="../../../public/assets/images/mine/mm_title_back.png"/></div>
            <div class="f-use-certification">实名认证</div>
        </header>
        <div class="f-certification-tip">请先进行实名认证</div>
        <div class="f-certification-box">
            <div class="f-user-name-box">
                <span>姓名</span>
                <input class="f-certification-username" type="text" placeholder="请输入真实姓名" v-model="username" @change="changebtn"/>
            </div>
            <div class="f-user-ident-box">
                <span>身份证号</span>
                <input class="f-certification-inentification" type="text" placeholder="请输入身份证号" v-model="inentification" @change="changebtn"/>
            </div>
            <div class="f-user-add-box">
                <span>现居地</span>
                <input class="f-certification-address" type="text" placeholder="请输入现居住址" v-model="address" @change="changebtn"/>
            </div>
            <button class="f-certification-submitBtn" @click="identSubmit" :class="{fchangebtn:a}">认证</button>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'vant'
    export default {
        name: "certification",
        data(){
          return {
              inentification:"",
              username:"",
              address:"",
              a:false
          }
        },
        methods:{
            toback(){
                this.$router.go(-1)
            },
            changebtn(){
                if(this.username != "" && this.inentification != "" && this.address !=""){
                    this.a = true
                }
            },
            identSubmit(){
                let token = localStorage.getItem("token")
                if(this.username != "" && this.inentification != "" && this.address !=""){
                    fetch('http://119.3.190.106:5000/user/business/realname/',{
                        method:"POST",
                        mode: "cors",
                        headers:{
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify({token:token,real_name:this.username,card_id: this.inentification,address:this.address})
                    }).then(res=> {
                        return res.json();
                    }).then(data=>{
                        console.log(data);
                        if(data.error == 0){
                            Toast.success(data.msg);
                            this.$router.push('/createshop')
                        }else{
                            Toast.fail(data.msg);
                        }
                    }).catch(err=>{
                        console.log(err);
                    })
                }else{
                    Toast.fail('内容不能为空');
                }
            }
        }
    }
</script>

<style scoped>
    .f-certification{
        width:100%;
        height:6.16rem;
        background-color: white;
    }
    .f-certification-header{
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
    .f-certification-tip{
        font-size: 0.1rem;
        text-align: center;
        padding: 0.4rem 0;
        margin-top:0.5rem;
    }
    .f-certification-box{
        width:3.55rem;
        margin: 0 auto;
        padding: 0.25rem 0.08rem 0rem;
        box-sizing: border-box;
    }
    .f-user-name-box,.f-user-ident-box,.f-user-add-box{
        width:98%;
        height:0.35rem;
        margin-bottom: 0.3rem;
        border-bottom: 1px solid #dbdbdb;
        display: flex;
        justify-content: space-around;
    }
    .f-user-name-box span,.f-user-ident-box span,.f-user-add-box span{
        display: inline-block;
        width:20%;
        height:0.35rem;
        vertical-align: middle;
        line-height: 0.35rem;
        font-size: 0.16rem;
    }
    .f-certification-username,.f-certification-inentification,.f-certification-address{
        width:75%;
        height:0.35rem;
        border:none;
        outline: none;
    }
    .f-certification-submitBtn{
        width:100%;
        height:0.45rem;
        border-radius: 5px;
        color:#fafafa;
        margin-top: 0.8rem;
        font-size: 0.16rem;
    }
    .fchangebtn{
        background-color: #ee7f35!important;
    }
</style>