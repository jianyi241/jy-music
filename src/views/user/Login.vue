<template>
    <div class="login">
        <div class="login-box">
            <p class="title">
                <span>登</span>
                <span style="margin-left: 30px;">录</span>
            </p>
            <p class="input-group">
                <label for="username">用户名</label>
                <input type="text" autocomplete="off" id="username" v-model="username" @blur="checkInput({key: 'username',val:username})" placeholder="请输入用户名" />
                <span class="check check-username"></span>
            </p>
            <p class="input-group">
                <label for="password">密 码</label>
                <input type="password" id="password" v-model="password" @blur="checkInput({key: 'password',val:password})" placeholder="请输入密码" />
                <span class="check check-password"></span>
            </p>
            <p class="input-group">
                <button class="login-btn btn" @click="login">登录</button>
                <button class="register-btn btn">注册</button>
            </p>
        </div>
    </div>
</template>

<script>

import checkInput from "../../util/checkInput.js"

export default {
    name: 'Login',
    props: {
        msg: String
    },
    data () {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        checkInput,
        login () {
            if (this.checkInput([{key: 'username',val: this.username,name: '用户名'},{key: 'password',val: this.password,name: '密码'}])) {
                this.$api.login({ username: this.username, password: this.password }).then(({ data }) => {
                    if (data.success) {
                        this.$store.commit('SET_USERINFO', data.userInfo)
                        this.$router.replace({ path: '/' })
                    } else {
                        console.log(data.message)
                    }
                    }).catch(err => {
                        console.log(err, '返回错误')
                })
            } else {

            }
        }
    },
    created () {

    }
}
</script>
<style lang="less" scoped>
@blue: #23ade5;
.login{
    position: absolute;
    width: 100%;
    height: 100%;
    background: #FFF url(../../assets/image/login_bg.jpg) no-repeat center center;
    background-size: cover;
    .login-box{
        position: absolute;
        width: 800px;
        height: 500px;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        box-sizing: border-box;
        padding: 90px 16px;
        background-color: rgba(255, 255, 255, .3);
        margin: auto;
        border-radius: 6px;
        text-align: center;
        transition: box-shadow .2s ease-in-out;
        &:hover{
            box-shadow: 0 0 12px rgba(155, 155, 155, .5);
        }
        .title{
            color: #FFF;
            font-size: 32px;
            text-shadow: 0 0 4px @blue;
        }
        .input-group{
            width: 100%;
            height: 36px;
            margin: 32px 0 42px 0;
            label{
                display: inline-block;
                width: 60px;
                text-align: left;
            }
            input{
                height: 100%;
                width: 260px;
                color: #666;
                border-radius: 4px;
                padding: 0 6px;
                border: 1px solid transparent;
                outline: linen;
                transition: box-shadow .2s ease-in;
                &:hover{
                    box-shadow: 0 0 6px @blue;
                }
            }
            .btn{
                padding: 8px 22px;
                border-radius: 4px;
                border: 1px solid transparent;
                color: #FFF;
                cursor: pointer;
                outline: none;
                transition: box-shadow .2s ease-in;
                &:hover{
                    box-shadow: 0 0 6px #FFF;
                }
            }
            .login-btn{
                background-color: @blue;
            }
            .register-btn{
                background-color: #CCC;
                margin-left: 32px;
            }
            .check{
                display: block;
                height: inherit;
                width: 334px;
                color: #f66495;
                font-size: 14px;
                line-height: 38px;
                vertical-align: middle;
                border-radius: 4px;
                text-align: left;
                box-sizing: border-box;
                padding: 0 6px 0 60px;
                margin: 0 auto;
            }
        }
    }
}
</style>
