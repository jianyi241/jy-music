export default function (data) {
    let message = ""
    console.log("dddddd",typeof data)
    if (Object.prototype.toString.call(data) === '[object Object]') {
        let { key, val } = data
        if (key === 'username') {
            if (!val) {
                message = "用户名要填写的哦！"
            } else {
                message = ""
            }
        }
        if (key === 'password') {
            if (!val) {
                message = "密码一定要填写哦！"
            } else {
                message = ""
            }
        }
        if (!message) {
            document.getElementsByClassName(`check-${key}`)[0].innerText = ""
            return true
        } else {
            document.getElementsByClassName(`check-${key}`)[0].innerText = message
            return false
        }
    } else {
        let isEmpty = []
        data.forEach((item, index) => {
            console.log(item)
            if (!item.val) {
                // switch (item.key) {
                //     case 'username':
                //         message = "用户名要填写的哦"
                //         break
                //     case 'password':
                //         message = "密码一定要填写哦！"
                //         break
                // }
                isEmpty.push({key: item.key, name: item.name})
            }
        })
        if (!!isEmpty.length) {
            isEmpty.forEach((item => {
                document.getElementsByClassName(`check-${item.key}`)[0].innerText = `${item.name}一定要填写哦！`
            }))
            return false
        } else {
            return true
        }
    }
}
