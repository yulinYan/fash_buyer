<template>
    <div class="f-createshop">
        <header class="f-createshop-header">
            <div class="f-go-back" @click="toback"><img src="../../../public/assets/images/mine/mm_title_back.png"/></div>
            <div class="f-createshop-title">Fashion 购 开店</div>
        </header>
        <div class="f-createshop-content">
            <h2>基本信息</h2>
            <ul class="f-createshop-con">
                <li>
                    <span>上传商铺logo</span>
                    <van-uploader :after-read="afterRead" v-model="fileList" @blur="mpanduan"/>
                </li>
                <li>
                    <span>商铺名称</span>
                    <input type="text" placeholder="请输入用户名称" v-model="shopname" @blur="mpanduan"/>
                </li>
                <li>
                    <span>商铺介绍</span>
                    <textarea rows="5" clos="4" v-model="shopdes" @blur="mpanduan"></textarea>
                </li>
            </ul>
            <h2>经营信息</h2>
            <ul class="jingying-info">
                <li>
                    <span>商家地址</span>
                    <input type="text" placeholder="请输入地址" v-model="shopaddress" @blur="mpanduan"/>
                </li>
                <li>
                    <span>保证金</span>
                    <input type="text" placeholder="请输入保证金金额" v-model="bond" @blur="mpanduan"/>
                </li>
            </ul>
            <button class="confirm-shop" :class="{fchangebtn:a}" @click="confirm">确认开店</button>
        </div>
    </div>
</template>

<script>
    import { Uploader , Toast} from 'vant'
    export default {
        name: "createshop",
        data() {
            return {
                shopname:"",
                shopdes:"",
                shopaddress:"",
                bond:"",
                fileList:[],
                img:"",
                a:false
            }
        },
        components:{
            [Uploader.name]:Uploader
        },
        methods:{
            toback(){
                this.$router.go(-1)
            },
            afterRead(file) {
                console.log(typeof (file.content))
                this.img = file.content
            },
            mpanduan(){
                if(this.shopname != "" && this.shopdes != "" && this.shopaddress != "" && this.bond != "" && this.fileList != []){
                    this.a = true
                }else{
                    this.a = false
                }
            },
            confirm(){
                let token = localStorage.getItem("token")
                if(this.shopname != "" && this.shopdes != "" && this.shopaddress != "" && this.bond != "" && this.img != ""){
                    fetch('http://119.3.190.106:5000/shop/commodity/open_shop/',{
                        method:"POST",
                        mode: "cors",
                        headers:{
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify({
                            token:token,
                            name:this.shopname,
                            introduce: this.shopdes,
                            logo: this.img,
                            bond: this.bond,
                            address: this.shopaddress
                        })
                    }).then(res=> {
                        return res.json();
                    }).then(data=>{
                        console.log(data);
                        if(data.error == 0){
                            Toast.success(data.msg);
                            // this.$router.push('/main/personal')
                        }else{
                            Toast.fail(data.msg);
                        }
                    }).catch(err=>{
                        console.log(err);
                    })
                }else{
                    Toast.fail("内容不能为空")
                }
            }
        }
    }
</script>

<style scoped>
    .f-createshop{
        width:100%;
        height:6.67rem;
        background-color: white;
        overflow: hidden;
    }
    .f-createshop-header{
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
    .f-createshop-content{
        width:80%;
        margin: 0 auto;
        padding-top: 0.8rem;
        text-align: left;
        /*box-sizing: border-box;*/
    }
    .f-createshop-con{
        margin-top: 0.2rem;
    }
    .f-createshop-con span{
        display: inline-block;
        width:1rem;
        vertical-align: top;
        font-size: 0.16rem;
    }
    .f-createshop-con li{
        margin-bottom: 0.1rem;
    }
    .f-createshop-con li:nth-child(2) input{
        width:1.7rem;
        height:0.3rem;
        outline: none;
        border:none;
        border-bottom: 1px solid #999999;
    }
    .f-createshop-con li:nth-child(3) textarea{
        width:1.7rem;
        height:0.6rem;
        outline: none;
        border:1px solid #999999;
    }
    .jingying-info{
        margin-top: 0.2rem;
    }
    .jingying-info span{
        display: inline-block;
        width:1rem;
        vertical-align: top;
        font-size: 0.16rem;
    }
    .jingying-info li input{
        width:1.7rem;
        height:0.3rem;
        outline: none;
        border:none;
        border-bottom: 1px solid #999999;
    }
    .confirm-shop{
        width:3rem;
        height:0.44rem;
        margin: 0.2rem auto;
        border-radius: 10px;
        font-size: 0.16rem;
        color: white;
    }
    .fchangebtn{
        background-color: #ee7f35!important;
    }
</style>