import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import Login from '../views/user/Login'
import getSessionId from '../util/getSessionId'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Index,
        meta: { Auth: false },
        children: [
            {
                path: '/',
                name: 'Home',
                component: Home,
                meta: {
                    Auth: false
                }
            }, {
                path: '/about',
                name: 'About',
                component: () => import('../views/About.vue'),
                meta: {
                    Auth: true
                }
            }
        ]
    }, {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    const isLogin = getSessionId()
    console.log('isLogin', isLogin)
    if (to.meta.Auth) {
        if (!isLogin) {
            console.log("此页面要先登录才能进入哦")
            router.push({ path: '/' })
        } else {
            store.dispatch('GET_USERINFO', isLogin)
            next()
        }
    } else {
        if (isLogin) {
            store.dispatch('GET_USERINFO', isLogin)
        }
        next()
    }
})

export default router
