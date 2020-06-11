<template>
    <div class="nav-bar">
        <nav>
            <ul class="nav-ul">
                <li class="nav-item" v-for="(item,index) in navList" :key="item.id" @mouseover="showChileNav(index,item.child.length)" @mouseout="hideChildNav(index)">
                    <router-link :to="item.path">{{item.name}}</router-link>
                    <ul class="nav-child-ul" v-show="!!item.child.length">
                        <li class="child-item" v-for="_item in item.child" :key="_item.id">
                            <router-link :to="_item.path">{{_item.name}}</router-link>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="search">
                <input type="text" class="search-input" placeholder="从这里搜索相关内容哦~"/>
                <button class="search-btn"></button>
            </div>
            <div class="user-info">
                <p class="is-login" v-if="isLogin">
                    <i class="head-por">
                        <img :src="userInfo.headPro" width="40" height="40"/>
                    </i>
                    <router-link to="/">{{userInfo.nickname}}</router-link>&nbsp;|&nbsp;
                    <a href="javascript:void(0)" @click="loginOut">退出</a>
                </p>
                <p class="is-not-login" v-else>
                    <router-link to="/login">登录</router-link>&nbsp;|&nbsp;
                    <router-link to="/login">注册</router-link>
                </p>
            </div>
        </nav>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'nav-bar',
    computed: {
        ...mapState({
            isLogin: state => state.user.isLogin,
            userInfo: state => state.user.userInfo
        })
    },
    data () {
        return {
            navList: [
                {
                    id: 0,
                    name: '主站',
                    path: '/',
                    child: []
                }, {
                    id: 1,
                    name: '音乐',
                    path: '/about',
                    child: [
                        {
                            id: 2,
                            parentId: 1,
                            name: '流行音乐',
                            path: '/'
                        }, {
                        id: 3,
                            parentId: 1,
                            name: '古典音乐',
                            path: '/'
                        }, {
                            id: 4,
                            parentId: 1,
                            name: '轻音乐',
                            path: '/'
                        }, {
                            id: 5,
                            parentId: 1,
                            name: '纯音乐',
                            path: '/'
                        }
                    ]
                }, {
                    id: 6,
                    name: '动漫',
                    path: '/',
                    child: [
                        {
                            id: 7,
                            parentId: 6,
                            name: '一人之下',
                            path: '/'
                        }, {
                            id: 8,
                            parentId: 6,
                            name: '狐妖小红娘',
                            path: '/'
                        }, {
                            id: 9,
                            parentId: 6,
                            name: '最热',
                            path: '/'
                        }, {
                            id: 10,
                            parentId: 6,
                            name: '最新',
                            path: '/'
                        }, {
                            id: 11,
                            parentId: 6,
                            name: '国创',
                            path: '/'
                        }, {
                            id: 12,
                            parentId: 6,
                            name: '日漫',
                            path: '/'
                        }
                    ]
                }, {
                    id: 13,
                    name: '动画',
                    path: '/',
                    child: []
                }, {
                    id: 14,
                    name: '恶搞',
                    path: '/',
                    child: []
                }, {
                    id: 15,
                    name: '舞蹈',
                    path: '/',
                    child: []
                }, {
                    id: 16,
                    name: '摄影',
                    path: '/',
                    child: []
                }, {
                    id: 17,
                    name: '数码',
                    path: '/',
                    child: []
                }, {
                    id: 18,
                    name: '游戏',
                    path: '/',
                    child: []
                }
            ]
        }
    },
    methods: {
        showChileNav (index, count) {
            const node = document.querySelectorAll('.nav-item')[index].childNodes[1]
            node.style.height = count * 36 + 12 + 'px'
        },
        hideChildNav (index) {
            const node = document.querySelectorAll('.nav-item')[index].childNodes[1]
            node.style.height = '0px'
        },
        loginOut() {
            this.$store.commit('REMOVE_USERINFO')
            this.$api.loginOut()
            this.$router.replace({path: '/'})
        }
    }
}
</script>

<style lang="less" scoped>
@100: 100%;
@blue: #23ade5;
@cbg: #EEE;
.nav-bar{
    width: 100%;
    height: 50px;
    background-color: #FFF;
    nav{
        position: relative;
        width: 1300px;
        height: @100;
        margin: 0 auto;
        .nav-ul{
            width: 700px;
            height: @100;
            display: inline-block;
            .nav-item{
                position: relative;
                display: inline-block;
                line-height: 50px;
                font-size: 12px;
                &:hover{
                    >.nav-child-ul{
                        display: block;
                    }
                    >a{
                        background-color: #CCC;
                        color: #FFF;
                    }
                }
                >a{
                    display: block;
                    padding: 0 16px;
                    color: rgb(100, 108, 122);
                    background-color: #FFF;
                    transition: color .2s ease-in-out,background-color .2s ease-in-out;
                }
                >.nav-child-ul{
                    position: absolute;
                    width: 132px;
                    height: 0px;
                    background-color: #FFF;
                    left: 0;
                    top: 50px;
                    /*border-radius: 0 0 8px 8px;*/
                    overflow: hidden;
                    box-shadow: 0 0px 2px #888;
                    transition: height .4s ease-in;
                    z-index: 999;
                    >.child-item:first-child{
                        margin-top: 6px;
                    }
                    >.child-item:last-child{
                        margin-bottom: 6px;
                    }
                    >.child-item{
                        font-size: 12px;
                        height: 36px;
                        line-height: 36px;
                        a{
                            display: block;
                            box-sizing: border-box;
                            padding: 0 16px;
                            color: #A0A0A0;
                            &:hover{
                                color: @blue;
                                background-color: @cbg;
                            }
                        }
                    }
                }
            }
        }
        .search{
            display: inline-block;
            width: 280px;
            height: 32px;
            vertical-align: middle;
            /*border-radius: 4px;*/
            overflow: hidden;
            .search-input{
                width: 234px;
                height: @100;
                border: 0;
                box-sizing: border-box;
                padding: 0 10px;
                outline: none;
                font-size: 12px;
                background-color: rgba(238, 238, 238, .5);
                color: #444;
                &:focus{
                    &::-webkit-input-placeholder{
                        color: transparent;
                    }
                }
            }
            .search-input::-webkit-input-placeholder{
                padding-left: 10px;
                color: #AAA;
            }
            .search-btn{
                display: inline-block;
                width: 46px;
                height: @100;
                border: 0;
                vertical-align: middle;
                background:rgba(208, 208, 208, .5) url("../assets/image/search.svg") no-repeat center center;
                background-size: 40%;
                outline: none;
                cursor: pointer;
                transition: background-image .2s ease-in-out, background-color .2s ease-in-out;
                &:hover{
                    background-image: url("../assets/image/search_hover.svg");
                    background-color: rgba(222, 222, 222, .5)
                }
            }
        }
        .user-info{
            position: absolute;
            display: inline-block;
            width: 150px;
            height: @100;
            top: 0;
            right: 0;
            line-height: 46px;
            font-size: 12px;
            text-align: right;
            .is-login{
                .head-por{
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    vertical-align: middle;
                    border: 1px solid #CCC;
                    overflow: hidden;
                    margin-right: 12px;
                }
                a{
                    color: @blue;
                }
            }
            .is-not-login{
                color: #999;
                a{
                    color: #999;
                }
            }
        }
    }
}
</style>
