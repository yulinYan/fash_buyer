<template>
    <div class="f-personal">
        <header class="pheader" v-if="userInfo" @click="tochangeinfo">
            <img class="userpic" :src='userInfo.data.head_img'/>
            <span class="user-name">{{userInfo.data.name}}</span>
        </header>
        <div class="f-order">
            <div class="f-order2">
                <img :src="userInfo2.head_img" alt="">
                <p style="display: inline-block; "><span>店铺名</span>：{{userInfo2.name}}</p>
                <p style=""><span>等级</span>：{{userInfo2.level}}</p>
                <p style=""><span>手机号</span>：{{userInfo2.phone}}</p>
                <p style=""><span>地址</span>：{{userInfo2.address}}</p>
                <p style=""><span>注册时间</span>：{{userInfo2.reg_date}}</p>
            </div>
        </div>
        <div class="f-shop-function">
            <h4>经营功能</h4>
            <ul>
                <a href="#">
                    <li>
                        <img src="../../../public/assets/images/personal/1.jpg"/>
                        <p>店铺</p>
                    </li>
                </a>
                <a href="#">
                    <li>
                        <img src="../../../public/assets/images/personal/2.jpg"/>
                        <p>商品</p>
                    </li>
                </a>
                <a href="#">
                    <li>
                        <img src="../../../public/assets/images/personal/3.jpg"/>
                        <p>订单</p>
                    </li>
                </a>
                <a href="#">
                    <li>
                        <img src="../../../public/assets/images/personal/4.jpg"/>
                        <p>权益中心</p>
                    </li>
                </a>
                <a href="#/editor">
                    <li>
                        <img src="../../../public/assets/images/personal/5.jpg"/>
                        <p>发动态</p>
                    </li>
                </a>
                <a href="#">
                    <li>
                        <img src="../../../public/assets/images/personal/6.jpg"/>
                        <p>海外推广</p>
                    </li>
                </a>
                <a href="#">
                    <li>
                        <img src="../../../public/assets/images/personal/7.jpg"/>
                        <p>营销</p>
                    </li>
                </a>
                <a href="#">
                    <li>
                        <img src="../../../public/assets/images/personal/8.jpg"/>
                        <p>功能设置</p>
                    </li>
                </a>
                <a href="#">
                    <li>
                        <img src="../../../public/assets/images/personal/9.jpg"/>
                        <p>店铺诊断</p>
                    </li>
                </a>
                <a href="#">
                    <li>
                        <img src="../../../public/assets/images/personal/10.jpg"/>
                        <p>微动态</p>
                    </li>
                </a>
            </ul>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'vant'
    export default {
        name: "personal",
        data(){
            return{
                userInfo:"",
                userInfo2:"",
                order:{
                    allorder:20,
                    daifukuan:9,
                    daifahuo:83,
                    tuikuanshouhou:59,
                }
            }
        },
        methods:{
            // 初始用户信息
            _initUserInfo() {
                let token = localStorage.getItem("token");
                fetch('http://119.3.190.106:5000/user/business/look_message?token=' + token).then(res => {
                    res.json().then(data => {
                        console.log(data)
                        if(data.error == 1){
                            Toast(data.msg)
                        }else{
                            this.userInfo = data;
                        }
                    })
                })
            },
            //获取店铺信息
            zxs_Shangpuxinxi(){
                let token = localStorage.getItem("token");
                fetch('http://119.3.190.106:5000/user/business/look_message/?token=' + token).then(res => {
                    res.json().then(data => {
                        console.log(data)
                        if(data.error == 1){
                            Toast(data.msg)
                        }else{
                            this.userInfo2 = data.data;
                        }
                    })
                })
            },
            tochangeinfo(){
                this.$router.push('/changeinfo')
            }
        },

        created() {
            this._initUserInfo();
            this.zxs_Shangpuxinxi();
        },
    }
</script>

<style scoped>
    .f-personal{
        /*background-color: white;*/
    }
    .pheader{
        padding:0rem 0.1rem 0rem 0rem;
        border-bottom: 0.05rem solid rgb(238,238,238);
        box-sizing: border-box;
        width: 100%;
        background-color: white;
        text-align: left;
        background: url("../../../public/assets/images/mine/background.jpg");
        background-size: 100% 100%;
    }
    .userpic{
        width:0.8rem;
        height: 0.8rem;
        margin: 0.2rem 0.2rem;
        border-radius: 50%;
    }
    .user-name{
        display: inline-block;
        font-size: 0.2rem;
        margin-top: 0.5rem;
        vertical-align: top;
    }
    .f-order{
        width:96%;
        margin: 0 auto;
        background-color: white;
        border-radius: 10px;
        margin-bottom: 0.1rem;
        text-align: left;
    }
    .f-order2 span{
        display: inline-block;
        width: 56px;
        /*text-align: center;*/
    }
    .f-order2{
        width: 70%;
        /*margin: 0 auto;*/
        margin-left: 20px;
        position: relative;
    }
    .f-order2 img{
        border: 1px solid red;
        display: inline-block;
        width: 0.5rem;
        height: 0.5rem;
        position: absolute;
        top: 0.18rem;
        right: 0;
    }
    .f-order2 p{
        padding: 0.05rem 0;
    }
    .f-shop-function{
        width:94%;
        margin: 0 auto;
        background-color: white;
        border-radius: 10px;
        text-align: left;
    }
    .f-shop-function h4{
        padding-left: 0.2rem;
        box-sizing: border-box;
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
    }
    .f-shop-function img{
        width:0.37rem;
        height:0.37rem;
    }
    .f-shop-function ul{
        display: flex;
        flex-wrap: wrap;
    }
    .f-shop-function a{
        display: inline-block;
        width:20%;
        text-align: center;
        margin-bottom: 0.15rem;
    }
    .f-shop-function span{
        display: inline-block;
        margin-bottom: 0.05rem;
    }
</style>