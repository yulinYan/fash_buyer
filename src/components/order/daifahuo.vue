<template>
    <div class="f-allorder">
        <div class="f-noorder" v-if="flag == true">
            <img src="assets/images/mine/search_result_none.png"/>
            <p>您暂时还没有待发货订单</p>
        </div>
        <div v-else class="f-allorder-info">
            <div class="f-order-list" :key="index" v-for="(order,index) in allorder">
                <div class="f-order-title">
                    <span>订单ID:{{order.order_id}}</span><span class="allorder-type" @click="sendgood(order.order_id)">发货</span>
                </div>
                <div class="f-order-con">
                    <div class="f-order-pic">
                        <img :src="order.goods_img.split('\'')[1]"/>
                    </div>
                    <div class="f-order-info">
                        <p>{{order.goods_name}}</p>
                        <p>数量：{{order.goods_num}}件</p>
                        <p>运费：￥{{order.fre_price}}</p>
                        <p>总计：￥{{order.total_price}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'vant'
    export default {
        name: "daifahuo",
        data(){
            return {
                allorder:"",
                flag:false
            }
        },
        methods:{
            _initAllOrder() {
                let token = localStorage.getItem("token");
                fetch('http://119.3.190.106:5000/order/bus_order/unsend/?token=' + token).then(res => {
                    res.json().then(data => {
                        if(data.error == 0){
                            console.log(data)
                            this.flag = false
                            this.allorder = data.data
                        }else{
                            Toast(data.msg)
                            this.flag = true
                        }
                    })
                })
            },
            sendgood(id){
                let token = localStorage.getItem("token")
                fetch('http://119.3.190.106:5000/order/bus_order/send_goods/',{
                    method:"PUT",
                    mode: "cors",
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({order_id:id, token: token})
                }).then(res=> {
                    return res.json();
                }).then(data=>{
                    Toast(data.msg)
                    console.log(data);
                }).catch(err=>{
                    console.log(err);
                })
            }
        },
        created() {
            this._initAllOrder();
        },
    }
</script>

<style scoped>
    .f-allorder{
        margin-bottom: 0.5rem;
    }
    .f-noorder{
        width:100%;
        text-align: center;
        padding-top:1.33rem;
        box-sizing: border-box;
        color:#999999;
        margin-bottom: 0.1rem;
    }
    .f-order-list{
        background-color: white;
        margin: 0.05rem 0rem;
    }
    .f-order-title{
        display: flex;
        justify-content: space-between;
        padding: 0.1rem 0.1rem;
    }
    .f-order-con{
        display: flex;
        padding: 0.1rem 0.1rem;
    }
    .allorder-type{
        color:red;
    }
    .f-order-pic{
        width:25%;
        display: flex;
        align-items: center;
        padding:0.1rem;
    }
    .f-order-pic img{
        width: 100%;
        height: 100%;
    }
    .f-order-info{
        width:70%;
        text-align: left;
        padding-left: 0.1rem;
    }
    .f-order-info p{
        margin: 0.05rem 0rem;
    }
    .f-order-info p:nth-child(1){
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
</style>