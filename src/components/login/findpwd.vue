<template>
    <div class="f-findpwd">
        <header class="f-findpwd-header">
            <div class="f-findpwd-go-back" @click="toback"><img src="../../../public/assets/images/mine/mm_title_back.png"/></div>
            <div class="f-findpwd-title">找回密码</div>
        </header>
        <div class="f-findpwd-box">
            <div class="f-findpwd-user-number">
                <span class="f-findpwd-quhao">+86<img class="f-findpwd-arrow-down" src="../../../public/assets/images/mine/arrow_down.png"/></span>
                <input class="f-findpwd-userNum" type="text" placeholder="请输入手机号码" v-model="username" @blur="codestyle"/>
            </div>
            <div class="f-findpwd-user-password">
                <input class="f-findpwd-userPwd" type="text" placeholder="请输入验证码" v-model="usercode" @blur="mpanduan"/>
                <div class="f-findpwd-code" :class="{fchangestyle:b}" @click="sendCode">获取验证码</div>
            </div>
            <button class="f-findpwd-submitBtn" @click="fregister" :class="{fchangebtn:a}">确认</button>
        </div>
    </div>

</template>

<script>
    import { Toast } from 'vant';
    export default {
        name: "findpwd",
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
            sendCode(){
                if(!(/^1[34578]\d{9}$/.test(this.username))){
                    Toast.fail('手机号格式错误，请重新输入');
                }else{
                    if(!(/^1[34578]\d{9}$/.test(this.username))){
                        Toast.fail('手机号格式错误，请重新输入');
                    }else{
                        fetch('http://119.3.133.207:5000/user/register?phone='+this.username)
                            .then(res=>{
                                return  res.json();
                            })
                            .then(data=>{
                                console.log(data);
                                Toast.success("验证码发送成功，注意查收");
                            })
                            .catch(err=>{
                                console.log(err);
                            })
                    }
                }
            },
            fregister(){
                if(this.username != "" && this.usercode != ""){
                    fetch('http://119.3.133.207:5000/user/repwd/',{
                        method:"POST",
                        mode: "cors",
                        headers:{
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                            // "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body:JSON.stringify({phone:this.username, code: this.usercode})
                    }).then(res=> {
                        return res.json();
                    }).then(data=>{
                        console.log(data);
                        if(data.code == 0){
                            this.$router.push('/setpwd')
                        }else{
                            Toast.fail('验证码输入错误');
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
    .f-findpwd{
        width:100%;
        height: 6.17rem;
        background-color: white;
    }
    .f-findpwd-header{
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
    .f-findpwd-title{
        width:100%;
        font-size: 0.18rem;
    }
    .f-findpwd-go-back{
        height:0.5rem;
        position: absolute;
        left: 0;
        width:20%;
        display: flex;
        align-items: center;
    }
    .f-findpwd-go-back img{
        width:0.28rem;
        height:0.28rem;
        margin-left: 0.1rem;
    }
    .f-findpwd-box{
        width:3.55rem;
        margin: 0 auto;
        padding: 0.25rem 0.08rem 0rem;
        box-sizing: border-box;
        margin-top: 0.5rem;
        text-align: left;
    }
    .f-findpwd-user-number,.f-findpwd-user-password{
        width:98%;
        height:0.35rem;
        margin-bottom: 0.25rem;
        border-bottom: 1px solid #dbdbdb;
        position: relative;
    }
    .f-findpwd-quhao{
        display: inline-block;
        width:20%;
        height:0.35rem;
        vertical-align: middle;
        line-height: 0.35rem;
        font-size: 0.16rem;
        position: relative;
    }
    .f-findpwd-arrow-down{
        width:0.14rem;
        height:0.14rem;
        position: absolute;
        right:0.1rem;
        top:0.1rem;
    }
    .f-findpwd-userNum{
        width:78%;
        height:0.35rem;
        border:none;
        outline: none;
    }
    .f-findpwd-userPwd{
        width:100%;
        height:0.35rem;
        border:none;
        outline: none;
    }
    .f-findpwd-submitBtn{
        width:100%;
        height:0.45rem;
        border-radius: 5px;
        color:#fafafa;
        margin-top: 0.8rem;
        font-size: 0.16rem;
    }
    .f-findpwd-code{
        width:1.25rem;
        height:0.3rem;
        line-height:0.3rem;
        border-radius: 5px;
        color:#fdf7f2;
        background-color: #DDDDDD;
        text-align: center;
        position: absolute;
        right:0;
        top: 0;
    }
    .fchangebtn{
        background-color: #ee7f35!important;
    }
    .fchangestyle{
        background-color: #ee7f35!important;
    }
</style>