import { getStore, setStore, removeStore } from '../util/util'

export default {
    state: {
        userInfo: {},
        isLogin: false
    },
    mutations: {
        SET_USERINFO (state, data) {
            state.userInfo = data
            setStore('userInfo', data)
        },
        CHANGE_USERINFO (state, data) {
            const { key, val } = data
            state.userInfo[key] = val
            setStore('userInfo', state.userInfo)
        },
        REMOVE_USERINFO (state) {
            state.isLogin = false
            state.userInfo = {}
            removeStore('userInfo')
        }
    },
    actions: {
        GET_USERINFO ({ state, commit }, data) {
            state.isLogin = data
            const user = getStore('userInfo')
            commit('SET_USERINFO', JSON.parse(user))
        }
    }
}
