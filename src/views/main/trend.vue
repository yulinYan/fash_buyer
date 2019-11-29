<template>
    <div class="zxs-chengquan">
        <div class="zxs-chengquan-left" @click="flag=true">已审核</div>
        <div class="zxs-chengquan-right" @click="flag=false">未审核</div>
<!--       已审核 -->
        <div v-if="flag" class="tuijian-max-div">
            <ul v-if="userInfo">
                <li v-for="(item, index) in userInfo" v-show="item.audit == 1" v-bind:key="index">
<!--                    <a href="#/tuijianmjx">-->
                        <img class="tuijian-max-img" :src="item.bg_img" alt="">
                        <h2 class="tuijian-max-h2">{{item.title}}</h2>
                        <p class="tuijian-max-p">{{item.info}}</p>
<!--                    </a>-->
                    <div class="tuijian-max-div1">
                        <span class="tuijian-max-span-left">TIME:{{item.date}}</span>
                    </div>
                </li>
            </ul>
        </div>
<!--        未审核-->
        <div v-else class="tuijian-max-div">
            <ul v-if="userInfo">
                <li v-for="(item, index) in userInfo" v-show="item.audit == 0" v-bind:key="index">
                    <img class="tuijian-max-img" :src="item.bg_img" alt="">
                    <h2 class="tuijian-max-h2">{{item.title}}</h2>
                    <p class="tuijian-max-p">{{item.info}}</p>
                    <div class="tuijian-max-div1">
                        <span class="tuijian-max-span-left">TIME:{{item.date}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "trend",
        data(){
            return{
                flag:true,
                userInfo:""
            }
        },
        methods:{
            haha(){
                let token = localStorage.getItem("token")
                fetch('http://119.3.190.106:5000/shop/commodity/look_circle/?token='+token)
                    .then(res=>{
                        return  res.json();
                    })
                    .then(data=>{
                        // console.log(data);
                        this.userInfo=data.data
                        // console.log(this.userInfo);
                    })
                    .catch(err=>{
                        console.log(err);
                    })
            }
        },
        created() {
            this.haha()
        }
    }
</script>

<style scoped>
    .zxs-chengquan-left,.zxs-chengquan-right{
        display: inline-block;
        width: 49.8%;
        height: 0.3rem;
        line-height: 0.3rem;
        background-color: white;
    }
    .zxs-chengquan-left{
        border-right: 1px solid #999999;
    }
    .zxs-chengquan-right{

    }
/*    */
    .tuijian-max-div{
        background-color: white;
    }
    li{
        border-bottom: 0.01rem solid #999;
    }

    .tuijian-max-img{
        width: 96%;
        margin: 0 auto;
    }
    .tuijian-max-h2{
        width: 96%;
        margin: 0 auto;
        text-align: left;
        padding-left: 4%;
        font-size: 0.16rem;
        font-weight: 600;
        display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
        -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
        -webkit-line-clamp: 1; /** 显示的行数 **/
        overflow: hidden;  /** 隐藏超出的内容 **/
    }
    .tuijian-max-p{
        width: 96%;
        margin: 0 auto;
        text-align: left;
        padding-left: 4%;
        color: #666666;
        display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
        -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
        -webkit-line-clamp: 2; /** 显示的行数 **/
        overflow: hidden;  /** 隐藏超出的内容 **/
    }
    .tuijian-max-div1{
        width: 96%;
        margin: 0 auto;
        text-align: left;
        color: #666666;
        padding: 0.05rem 0 0.1rem 0.1rem;
    }
    .tuijian-max-span-left{

    }
    .tuijian-max-span-right img{
        width: 25%;
    }
</style>