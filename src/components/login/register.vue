<template>
    <div class="f-register">
        <header class="f-register-header">
            <div class="f-go-back" @click="toback"><img src="../../../public/assets/images/mine/mm_title_back.png"/></div>
            <div class="f-use-register">Fashion 购用户注册</div>
        </header>
        <div class="f-register-box">
            <div class="f-register-user-number">
                <span class="f-register-quhao">+86<img class="f-register-arrow-down" src="../../../public/assets/images/mine/arrow_down.png"/></span>
                <input class="f-register-userNum" type="text" placeholder="请输入手机号码" v-model="username" @blur="codestyle"/>
            </div>
            <div class="f-register-user-password">
                <input class="f-register-userPwd" type="password" placeholder="请输入验证码" v-model="usercode" @blur="mpanduan"/>
                <div class="f-register-code" :class="{fchangestyle:b}" @click="sendCode">获取验证码</div>
            </div>
            <div class="f-register-agreement">
                注册即代表您同意<a href="#">《Fashion 淘用户协议》</a>和<a href="#">《用户隐私协议》</a>
            </div>
            <button class="f-register-submitBtn" @click="fregister" :class="{fchangestyle:a}">注册</button>
            <div class="f-to-login">
                <a href="#/login" class="f-register-login">我已有账号去登录</a>
            </div>
            <div class="f-otherway">
                <h4 class="f-title">其他方式登录</h4>
                <div class="f-third-app">
                    <div class="f-application"><img src="../../../public/assets/images/mine/iconfont_weixin.png"/>微信</div>
                    <div class="f-application"><img src="../../../public/assets/images/mine/iconfont_qq.png"/>QQ</div>
                    <div class="f-application"><img src="../../../public/assets/images/mine/iconfont_weibo.png"/>新浪</div>
                    <div class="f-application"><img src="../../../public/assets/images/mine/iconfont_zhifubao.png"/>支付宝</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name: "register",
        data(){
            return{
                username:"",
                usercode:"",
                a:false,
                b:false,
            }
        },
        methods:{
            toback(){
                this.$router.go(-1);
            },
            codestyle(){
                if(this.username != ""){
                    // console.log(true)
                    this.b = true
                }else{
                    this.b = false
                }
            },
            mpanduan(){
                if(this.username != "" && this.usercode != ""){
                    // console.log(true)
                    this.a = true
                }else{
                    this.a = false
                }
            },
            // 发送验证码
            sendCode(){
                if(!(/^1[34578]\d{9}$/.test(this.username))){
                    Toast.fail('手机号格式错误，请重新输入');
                }else{
                    fetch('http://119.3.190.106:5000/user/business/validate/',{
                        method:"POST",
                        mode: "cors",
                        headers:{
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify({phone:this.username})
                    }).then(res=>{
                            return  res.json();
                        })
                        .then(data=>{
                            console.log(data);
                            Toast.success(data.msg);
                        })
                        .catch(err=>{
                            console.log(err);
                        })
                }
            },
            // 短信验证
            fregister(){
                if(this.username != "" && this.usercode != ""){
                    fetch('http://119.3.190.106:5000/user/business/register/',{
                        method:"POST",
                        mode: "cors",
                        headers:{
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify({phone:this.username, code: this.usercode})
                    }).then(res=> {
                        return res.json();
                    }).then(data=>{
                        console.log(data);
                        if(data.error == 0){
                            Toast.success(data.msg);
                            localStorage.setItem("token",data.data.token)
                            this.$router.push('/certification')
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
    .f-register{
        width:100%;
        height:100%;
        background-color: white;
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
    .f-register-box{
        width:3.55rem;
        margin: 0 auto;
        padding: 0.25rem 0.08rem 0rem;
        box-sizing: border-box;
        margin-top: 0.5rem;
        text-align: left;
    }
    .f-register-user-number,.f-register-user-password{
        width:98%;
        height:0.35rem;
        margin-bottom: 0.25rem;
        border-bottom: 1px solid #dbdbdb;
        position: relative;
    }
    .f-register-quhao{
        display: inline-block;
        width:20%;
        height:0.35rem;
        vertical-align: middle;
        line-height: 0.35rem;
        font-size: 0.16rem;
        position: relative;
    }
    .f-register-arrow-down{
        width:0.14rem;
        height:0.14rem;
        position: absolute;
        right:0.1rem;
        top:0.1rem;
    }
    .f-register-userNum{
        width:78%;
        height:0.35rem;
        border:none;
        outline: none;
    }
    .f-register-userPwd{
        width:100%;
        height:0.35rem;
        border:none;
        outline: none;
    }
    .f-register-submitBtn{
        width:100%;
        height:0.45rem;
        border-radius: 5px;
        color:#fafafa;
        margin-top: 0.8rem;
        font-size: 0.16rem;
    }
    .f-register-code{
        width:1.25rem;
        height:0.3rem;
        line-height:0.3rem;
        border-radius: 5px;
        color:#fdf7f2;
        background-color: rgb(221,221,221);
        text-align: center;
        position: absolute;
        right:0;
        top: 0;
    }
    .f-register-agreement{
        margin:0.2rem 0 0.2rem 0rem;
        font-size: 0.1rem;
    }
    .f-register-agreement a{
        color:#ee7f35;
    }
    .f-to-login{
        margin-top: 0.6rem;
        text-align: center;
    }
    .f-register-login{
        color: #ee7f35;
        text-decoration: underline;
    }
    .tip-cuowu{
        width: 2rem;
        height: 1rem;
        line-height: 1rem;
        border-radius: 5px;
        text-align: center;
    }
    .fchangebtn{
        background-color: #ee7f35!important
    }
    .fchangestyle{
        background-color: #ee7f35!important;
    }
    .f-otherway{
        width:3.25rem;
        margin:0 auto;
        text-align: center;
        padding-top: 0.3rem;
    }
    .f-otherway .f-title{
        margin:1rem 0 0.3rem;
        position: relative;
    }
    .f-otherway .f-title:before{
        width:1.1rem;
        height:0.01rem;
        content:"";
        background-color: #dbdbdb;
        position: absolute;
        left:0;
        top:50%;
    }
    .f-otherway .f-title:after{
        width:1.1rem;
        height:0.01rem;
        content:"";
        background-color: #dbdbdb;
        position: absolute;
        right:0;
        top:50%;
    }
    .f-third-app{
        width:100%;
        display: flex;
        justify-content: space-around;
        padding-bottom: 0.3rem;
    }
    .f-application img{
        width:auto;
        height:0.16rem;
        vertical-align: middle;
        margin-right: 0.07rem;
    }
</style>