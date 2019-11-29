<template>
    <div class="f-setpwd">
        <header class="f-setpwd-header">
            <div class="f-setpwd-go-back" @click="toback"><img src="../../../public/assets/images/mine/mm_title_back.png"/></div>
            <div class="f-setpwd-title">设置登录密码</div>
        </header>
        <div class="f-setpwd-tip">请设置登录密码，让您的账户更安全。</div>
        <div class="f-setpwd-box">
            <div class="f-user-name">
                <span class="f-setpwd-username">用户名</span>
                <input class="f-username" type="text" placeholder="请输入用户名" v-model="username"/>
            </div>
            <div class="f-user-phone">
                <span class="f-setpwd-usephone">手机号</span>
                <input class="f-userphone" type="text" placeholder="请输入手机号"  v-model="userphone"/>
            </div>
            <div class="f-setpwd-set-box">
                <span class="f-setpwd-set">设置密码</span>
                <input class="f-setpwd-password" type="text" placeholder="不少于8位，包含数字和字母" @change="qianruopanduan" v-model="content"/>
            </div>
            <div class="f-mimapanduan" v-if="flag">
                <span class="f-qiangruo f-ruo" v-if="show===1"></span>
                <span class="f-qiangruo f-zhong" v-else-if="show===2"></span>
                <span class="f-qiangruo f-qiang" v-else-if="show===3"></span>
                <span class="f-panduan-tip">安全建议：8-16位，包含数字、大写字母和小写字母</span>
            </div>
            <div class="f-setpwd-confirm-box">
                <span class="f-setpwd-confirm">确认密码</span>
                <input class="f-confirm-password" type="text" placeholder="请再次输入" v-model="confirm" @change="changebtn"/>
            </div>
            <button class="f-setpwd-submitBtn" @click="setpwdSubmit" :class="{fchangebtn:a}">完成</button>
        </div>
    </div>
</template>

<script>
    import { Notify ,Toast} from 'vant';
    export default {
        name: "setpwd",
        data(){
          return{
              flag:false,
              username:"",
              userphone:"",
              content:"",
              confirm:"",
              show:1,
              a:false
          }
        },
        components:{
            [Notify.name]:Notify
        },
        mounted() {

        },
        methods:{
            toback(){
                this.$router.go(-1);
            },
            qianruopanduan() {
                this.flag = true;
                var regex = new RegExp('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{8,15}');
                // eslint-disable-next-line no-cond-assign,no-constant-condition
                if (this.content.length == 0){
                    this.show = 0
                }else if (this.content.length <8){
                    this.show = 1
                }else{
                    if(regex.test(this.content)){
                        this.show = 3
                    }else{
                        this.show = 2
                    }
                }
            },
            changebtn(){
                if(this.confirm != "" && this.content !=""){
                    this.a = true
                }
            },
            setpwdSubmit(){
                if(this.confirm != this.content){
                    Notify({ type: 'danger', message: '两次密码不一致，请重新输入'});
                }else{
                    fetch('http://119.3.133.207:5000/user/repwd/',{
                        method:"PUT",
                        mode: "cors",
                        headers:{
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                            // "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body:JSON.stringify({phone:this.userphone, password: this.content,re_password:this.confirm,name:this.username})
                    }).then(res=> {
                        return res.json();
                    }).then(data=>{
                        console.log(data);
                        if(data.code == 0){
                            Notify({ type: 'success', message: '设置成功' });
                            this.$router.push('/main/mine')
                        }else{
                            Toast.fail(data.msg);
                        }
                    }).catch(err=>{
                        console.log(err);
                    })

                }
            }
        }
    }
</script>

<style scoped>
    .f-setpwd{
        width:100%;
        height: 6.17rem;
        background-color: white;
        overflow-x: hidden;
    }
    .f-setpwd-header{
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
    .f-setpwd-title{
        width:100%;
        font-size: 0.18rem;
    }
    .f-setpwd-go-back{
        height:0.5rem;
        position: absolute;
        left: 0;
        width:20%;
        display: flex;
        align-items: center;
    }
    .f-setpwd-go-back img{
        width:0.28rem;
        height:0.28rem;
        margin-left: 0.1rem;
    }
    .f-setpwd-tip{
        font-size: 0.1rem;
        text-align: center;
        padding: 0.4rem 0 0.2rem;
    }
    .f-setpwd-box{
        width:3.55rem;
        margin: 0 auto;
        padding: 0.25rem 0.08rem 0rem;
        box-sizing: border-box;
    }
    .f-setpwd-set-box,.f-setpwd-confirm-box,.f-user-phone,.f-user-name{
        width:98%;
        height:0.35rem;
        margin-bottom: 0.3rem;
        border-bottom: 1px solid #dbdbdb;
        display: flex;
        justify-content: space-around;
    }
    .f-setpwd-set-box{
        position: relative;
    }
    .f-setpwd-set,.f-setpwd-confirm,.f-setpwd-usephone,.f-setpwd-username{
        display: inline-block;
        width:20%;
        height:0.35rem;
        vertical-align: middle;
        line-height: 0.35rem;
        font-size: 0.16rem;
    }
   .f-setpwd-password,.f-confirm-password,.f-username,.f-userphone{
        width:75%;
        height:0.35rem;
        border:none;
        outline: none;
    }
    .f-setpwd-submitBtn{
        width:100%;
        height:0.45rem;
        border-radius: 5px;
        color:#fafafa;
        margin-top: 0.8rem;
        font-size: 0.16rem;
    }
    .f-mimapanduan{
        width: 100%;
        height: 0.1rem;
        position: absolute;
        bottom: 3.3rem;
    }
    .f-qiangruo{
        display: inline-block;
        width:1.1rem;
        height:0.1rem;
    }
    .f-ruo{
        background: url("../../../public/assets/images/mine/group_di.png") no-repeat;
        background-size: 100% 100%;
    }
    .f-zhong{
        background: url("../../../public/assets/images/mine/group_zhong.png") no-repeat;
        background-size: 100% 100%;
    }
    .f-qiang{
        background: url("../../../public/assets/images/mine/group_gao.png") no-repeat;
        background-size: 100% 100%;
    }
    .f-panduan-tip{
        width: 4rem;
        display: inline-block;
        font-size: 10px;
        -webkit-transform: scale(0.8);
        transform: scale(0.7);
        position: absolute;
        left: 0.7rem;
    }
    .fchangebtn{
        background-color: #ee7f35!important;
    }
</style>