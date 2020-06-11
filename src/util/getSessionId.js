import { getStore } from './util'

export default () => {
    const cookArray = []
    const cookies = document.cookie
    cookies.split(';').forEach((item, index) => {
        cookArray[index] = item.split('=')
    })

    const userCookie = cookArray.filter(item => {
        return item[0] = 'user'
    })

    if (!!userCookie) {
        const userid = String(userCookie).split('2048')[0].split(',')[1]
        if (!!getStore('userInfo')) {
            console.log(userid, '---------', JSON.parse(getStore('userInfo')).id)
            if (Number(userid) === JSON.parse(getStore('userInfo')).id) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    } else {
        return false
    }
}
