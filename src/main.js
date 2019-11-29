import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
Vue.config.productionTip = false
Vue.use(VueRouter)

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
    // console.log('需要登录');
    if (localStorage.token) { // 判断当前的token是否存在 ； 登录存入的token
      next({});
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
