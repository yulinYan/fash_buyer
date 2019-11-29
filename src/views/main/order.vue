<template>
    <div>
        <div class="order-tab">
            <ul>
                <a href="#/main/order/allorder">
                    <li>
                        <p>全部订单</p>
                    </li>
                </a>
                <a href="#/main/order/daifukuan">
                    <li>
                        <p>待付款</p>
                    </li>
                </a>
                <a href="#/main/order/daifahuo">
                    <li>
                        <p>待发货</p>
                    </li>
                </a>
                <a href="#/main/order/tuikuan">
                    <li>
                        <p>退款售后</p>
                    </li>
                </a>
            </ul>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "order",
        data(){
            return{

            }
        }
    }
</script>

<style scoped>
    .order-tab ul{
        display: flex;
        padding:0.15rem 0.075rem;
        background-color: white;
    }
    .order-tab a{
        display: inline-block;
        flex: 1;
        text-align: center;
    }
    .order-tab img{
        width:0.23rem;
        height:0.23rem;
    }
</style>