import Vue from 'vue'
import VueRouter from 'vue-router'
import weiwebsocket from "../components/weiwebsocket";
Vue.use(VueRouter)

// eslint-disable-next-line no-unused-vars
let router = new VueRouter({
    routes:[
        // {path:"/",redirect:"/weiwebsocket"},
        {path:'/',redirect:'/main/personal'},
        {
            path:'/main',
            component:()=>import('../views/main'),
            children:[
                {path:'order',redirect:'/main/order/allorder'},
                {
                    path:'order',
                    component:()=>import('../views/main/order'),
                    meta: {
                        requireAuth: true, // 判断是否需要登录
                    },
                    children:[
                        {path:'allorder', component:()=>import('../components/order/allorder')},
                        {path:'daifukuan', component:()=>import('../components/order/daifukuan')},
                        {path:'daifahuo', component:()=>import('../components/order/daifahuo')},
                        {path:'tuikuan', component:()=>import('../components/order/tuikuan')},
                    ]
                },
                {
                    path:'product',
                    component:()=>import('../views/main/product'),
                    meta: {
                        requireAuth: true, // 判断是否需要登录
                    },
                },
                {
                    path: 'trend',
                    component: () => import('../views/main/trend'),
                    meta: {
                        requireAuth: true, // 判断是否需要登录
                    },
                },
                {
                    path:'personal',
                    component:()=>import('../views/main/personal'),
                    meta: {
                        requireAuth: true, // 判断是否需要登录
                    },
                }
            ]
        },
        {path:"/weiwebsocket",component:weiwebsocket},
        {path:'/login', component:()=>import('../components/login/login')},
        {path:'/certification', component:()=>import('../components/login/certification')},
        {path:'/createshop', component:()=>import('../components/login/createshop')},
        {path:'/register', component:()=>import('../components/login/register')},
        {path:'/findpwd', component:()=>import('../components/login/findpwd')},
        {path:'/setpwd',component:()=>import('../components/login/setpwd')},
        {path:'/changeinfo',component:()=>import('../components/personal/changeinfo')},
        {path:'/changeusername',component:()=>import('../components/personal/changeusername')},
        {path:'/editor',component:()=>import('../components/personal/Editor')},
    ]
})
export default router





