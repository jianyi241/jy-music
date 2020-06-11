import axios from './base.js'

export default {
    login (data) {
        return axios.post('/user/login', data)
    },
    loginOut () {
        return axios.post('/user/loginOut')
    },
    getDataByUrl(data) {
        return axios.get('/user/getDataByUrl',{params: data})
    },
    getMusicContent() {
        return axios.get('/user/getHomeMusicContent')
    }
}
