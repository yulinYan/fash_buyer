<template>
    <div class="login">
        <header class="login-header">
            <div class="login-setting">设置</div>
            <div class="use-login">商家登录</div>
            <div class="login-close">关闭</div>
        </header>
        <div class="methods">
            <div @click="changeTrue" class="login-pwd" id="f-login" :class="{pwdActive: isActiveP, 'text-danger': hasError}">密码登录</div>
            <div @click="changeFalse" class="login-msg" id="f-phone" :class="{msgActive: isActiveM, 'text-danger': hasError}">短信登录</div>
        </div>
        <div class="login-con">
            <div class="login-box" v-if="flag">
                <div class="user-number">
                    <input class="userNum" type="text" placeholder="请输入用户名" v-model="username" @blur="panduan" style="width:100%"/>
                </div>
                <div class="user-password">
                    <input class="userPwd" type="password" placeholder="请输入密码" v-model="password" @blur="panduan"/>
                </div>
                <button class="submitBtn" @click="floginSubmit" :class="{fchangebtn:a}">登录</button>
            </div>
            <div class="login-box" v-else>
                <div class="user-number">
                    <span class="quhao">+86<img class="arrow-down" src="../../../public/assets/images/mine/arrow_down.png"/></span>
                    <input class="userNum" type="text" placeholder="请输入手机号码" v-model="username" @blur="codestyle"/>
                </div>
                <div class="user-password">
                    <input class="userPwd" type="text" placeholder="请输入验证码" v-model="usercode" @blur="mpanduan"/>
                    <div class="code" :class="{fchangestyle:b}" @click="sendCode">获取验证码</div>
                </div>
                <button class="submitBtn" @click="floginmsg" :class="{fchangestyle:a}">登录</button>
            </div>
        </div>
        <div class="agreement">
            登录即代表您同意<a href="#">《Fashion 淘用户协议》</a>和<a href="#">《用户隐私协议》</a>
        </div>
        <div class="userlink">
            <a href="#/findpwd" class="forgetPwd" v-show="flag">忘记密码</a>
            <a href="#/register" class="register">免费注册</a>
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
        <van-popup class="tip-cuowu" v-model="show">
            <p class="tip-content">{{msg}}</p>
        </van-popup>
    </div>
</template>

<script>
    import { Popup,Toast} from 'vant';
    export default {
        name: "login",
        data(){
            return {
                isActiveP:true,
                isActiveM:false,
                hasError: false,
                flag:true,
                show:false,
                username:"",
                password:"",
                usercode:"",
                msg:"",
                a:false,
                b:false
            }
        },
        components:{
            [Popup.name]:Popup
        },
        methods:{
            changeTrue(){
                this.flag = true,
                this.isActiveP = true,
                this.isActiveM = false,
                this.username="",
                this.password = "",
                this.usercode = ""
            },
            changeFalse(){
                this.flag = false,
                this.isActiveP = false,
                this.isActiveM = true,
                this.username="",
                this.password = "",
                this.usercode = ""
            },
            // 密码登录判断为空
            panduan(){
                if(this.username != "" && this.password != ""){
                    this.a = true
                }else{
                    this.a = false
                }
            },
            // 密码登录
            floginSubmit(){
                if(this.username != "" && this.password != ""){
                    fetch('http://119.3.190.106:5000/user/business/login/',{
                        method:"POST",
                        mode: "cors",
                        headers:{
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify({name:this.username, pwd: this.password})
                    }).then(res=> {
                        return res.json();
                    }).then(data=>{
                        console.log(data);
                        if(data.error == 0){
                            console.log(data)
                            localStorage.setItem("token",data.data.token)
                            // 表示登录成功，跳转路由
                            if(this.$route.query.redirect){
                                let redirect = this.$route.query.redirect
                                this.$router.push(redirect)
                            }
                        }else{
                            Toast.fail(data.msg);
                        }
                    }).catch(err=>{
                        console.log(err);
                    })
                }else{
                    this.msg = "内容不能为空"
                    this.show = true
                }
            },
            // 失去焦点判断button颜色更改
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
            //短信验证码登录
            sendCode(){
                if(!(/^1[34578]\d{9}$/.test(this.username))){
                    this.msg = "手机号格式错误，请重新输入"
                    this.show = true
                    // console.log("手机号格式错误，请重新输入")
                }else{
                    fetch('http://119.3.190.106:5000/user/business/log_validate/',{
                        method: "POST",
                        mode: "cors",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({phone: this.username})
                    }).then(res=>{
                            return  res.json();
                    }).then(data=>{
                            console.log(data);
                            Toast.success(data.msg);
                    }).catch(err=>{
                            console.log(err);
                        })
                }
            },
            floginmsg(){
                if(this.username != "" && this.usercode != ""){
                        fetch('http://119.3.190.106:5000/user/business/login2/', {
                            method: "POST",
                            mode: "cors",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({phone: this.username, code: this.usercode})
                        }).then(res => {
                            return res.json();
                        }).then(data => {
                            console.log(data);
                            if (data.error == 0) {
                                localStorage.setItem("token", data.data.token)
                                // 表示登录成功，跳转路由
                                if (this.$route.query.redirect) {
                                    let redirect = this.$route.query.redirect
                                    this.$router.push(redirect)
                                } else {
                                    // this.$router.push({name:'mine'})
                                }
                            } else{
                                Toast.fail(data.msg);
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                    }else{
                        this.msg = "验证码或者手机号有误"
                        this.show = true
                        // console.log("手机号格式错误，请重新输入")
                    }
            }
        }
    }
</script>

<style>
    .login-header{
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
    .login-header .use-login{
        width:60%;
        font-size: 0.18rem;
    }
    .login{
        width:100%;
        background-color: white;
    }
    .login .methods{
        width:100%;
        height:1rem;
        display: flex;
        padding-top:0.5rem;
        box-sizing: border-box;
        margin-top:0.5rem;
    }
    .login .methods div{
        width:50%;
        text-align: center;
        position: relative;
    }
    .pwdActive{
        color:#ee7f35;
    }
    .msgActive{
        color:#ee7f35;
    }
    .pwdActive:before{
        content: " ";
        position: absolute;
        top: 70%;
        left: 0.8rem;;
        width: 0;
        height: 0;
        border-left: 15px solid transparent;
        border-bottom: 15px solid #ededed;
        border-right: 15px solid transparent;
    }
    .pwdActive:after{
        content: " ";
        position: absolute;
        top: 74%;
        left:0.81rem;;
        width: 0;
        height: 0;
        border-left: 14px solid transparent;
        border-bottom: 14px solid #fff;
        border-right: 14px solid transparent;
    }
    .msgActive:before{
        content: " ";
        position: absolute;
        top: 70%;
        left: 0.8rem;;
        width: 0;
        height: 0;
        border-left: 15px solid transparent;
        border-bottom: 15px solid #ededed;
        border-right: 15px solid transparent;
    }
    .msgActive:after{
        content: " ";
        position: absolute;
        top: 74%;
        left:0.81rem;;
        width: 0;
        height: 0;
        border-left: 14px solid transparent;
        border-bottom: 14px solid #fff;
        border-right: 14px solid transparent;
    }
    .login-box{
        width:3.55rem;
        height:2.3rem;
        margin: 0 auto;
        border:1px solid #ededed;
        border-radius: 10px;
        padding:0.25rem 0.08rem;
        box-sizing: border-box;
    }
    .user-number,.user-password{
        width:98%;
        height:0.35rem;
        margin-bottom: 0.25rem;
        border-bottom: 1px solid #dbdbdb;
        position: relative;
    }
    .quhao{
        display: inline-block;
        width:20%;
        height:0.35rem;
        vertical-align: middle;
        line-height: 0.35rem;
        font-size: 0.16rem;
        position: relative;
        text-align: left;
    }
    .arrow-down{
        width:0.14rem;
        height:0.14rem;
        position: absolute;
        right:0.1rem;
        top:0.1rem;
    }
    .userNum{
        width:78%;
        height:0.35rem;
        border:none;
        outline: none;
    }
    .userPwd{
        width:100%;
        height:0.35rem;
        border:none;
        outline: none;
    }
    .login-box .submitBtn{
        width:100%;
        height:0.45rem;
        border-radius: 5px;
        color:#fafafa;
    }
    .login-box .code{
        width:1.25rem;
        height:0.3rem;
        line-height:0.3rem;
        border-radius: 5px;
        color:#fdf7f2;
        /*background-color: #ee7f35;*/
        background-color: rgb(221,221,221);
        text-align: center;
        position: absolute;
        right:0;
        top: 0;
    }
    .agreement{
        margin:0.2rem 0 0.2rem 0.2rem;
        font-size: 0.1rem;
    }
    .agreement a{
        color:#ee7f35;
    }
    .userlink{
        margin: 0.13rem 0.25rem;
    }
    .userlink a{
        text-decoration: underline;
    }
    .forgetPwd{
        float:left;
    }
    .register{
        float: right;
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
    .van-overlay{
        background-color: rgba(0,0,0,0.3)!important;
    }
    .tip-cuowu{
        width: 2rem;
        height: 1rem;
        line-height: 1rem;
        border-radius: 5px;
        text-align: center;
        /*padding:0.2rem 0.5rem;*/
        /*box-sizing: border-box;*/
    }
    /*.tip-title{*/
    /*    padding:0.1rem 0;*/
    /*}*/
    /*.tip-con{*/
    /*    display: flex;*/
    /*    justify-content: space-between;*/
    /*    margin-top: 0.2rem;*/
    /*}*/
    /*.ok,.findPwd{*/
    /*    display: inline-block;*/
    /*    width:44%;*/
    /*    height:0.34rem;*/
    /*    line-height: 0.34rem;*/
    /*    text-align: center;*/
    /*    border-radius: 5px;*/
    /*}*/
    /*.ok{*/
    /*    color:#666666;*/
    /*    border:1px solid #666666;*/
    /*}*/
    /*.findPwd{*/
    /*    background-color: #ee7f35;*/
    /*    color:white;*/
    /*}*/
    .fchangebtn{
        background-color: #ee7f35!important;
    }
    .fchangestyle{
        background-color: #ee7f35!important;
    }
</style>