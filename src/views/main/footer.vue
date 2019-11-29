<template>
    <div class="footer">
        <!--        切换图片   利用三目用算-->
        <router-link to="/main/order"><span class="icon iconfont icon-index"><img :src="'/main/order'===$route.path ? Img[0].selected : Img[0].normal"></span>订单管理</router-link>
        <router-link to="/main/product"><span class="icon iconfont icon-index" ><img :src="'/main/product'===$route.path ? Img[1].selected : Img[1].normal"></span>商品管理</router-link>
        <router-link to="/main/trend"><span class="icon iconfont icon-index"><img :src="'/main/trend'===$route.path ? Img[2].selected : Img[2].normal"></span>动态状态</router-link>
        <router-link to="/main/personal"><span class="icon iconfont icon-index"><img :src="'/main/personal'===$route.path ? Img[3].selected : Img[3].normal"></span>个人中心</router-link>
    </div>
</template>

<script>
    export default {
        name: "vfooter",
        data(){
            return{//切换图片   利用三目用算
                Img:[
                    {normal: require('../../assets/images/footer1-f.png'), selected: require('../../assets/images/footer1.png')},
                    {normal: require('../../assets/images/footer2-f.png'), selected: require('../../assets/images/footer2.png')},
                    {normal: require('../../assets/images/footer3-f.png'), selected: require('../../assets/images/footer3.png')},
                    {normal: require('../../assets/images/footer4-f.png'), selected: require('../../assets/images/footer4.png')},

                ]
            }
        }
    }
</script>

<style scoped>
    /*@import "../assets/icfont/iconfont.css";*/
    .footer{
        position: fixed;
        bottom: 0;
        width: 100%;
        display: flex;
        justify-content: space-around;
        text-align: center;
        z-index: 100;
        background-color: #fff;
        padding-top: 0.05rem;
    }
    .footer span{
        display: block;
        width:0.2084rem;
        height: 0.2084rem;
        margin: 0 auto .05rem;
    }
    .footer img{
        display: block;
        width:0.2084rem;
        height: 0.2084rem;

    }

    /*让选中的字变颜色*/
    .footer a.router-link-active{
        color: #F56D02;
    }
</style>