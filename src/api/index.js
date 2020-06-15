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
    },
    getNewSongList(type) {
        let url = ''
        if (type === 1) {   //内地
            url = 'https://u.y.qq.com/cgi-bin/musics.fcg?-=recom5221882830103146&g_tk=5381&sign=zza40mrkmn60ddc78a477f842033aa636da25d520ab67&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22new_song%22%3A%7B%22module%22%3A%22newsong.NewSongServer%22%2C%22method%22%3A%22get_new_song_info%22%2C%22param%22%3A%7B%22type%22%3A1%7D%7D%7D'
        } else if (type === 6) {    //港台
            url = 'https://u.y.qq.com/cgi-bin/musics.fcg?-=recom22587572293006897&g_tk=5381&sign=zzantdul49tp3kno7970d31e6e0d326e29342cc9403cbb03c&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22new_song%22%3A%7B%22module%22%3A%22newsong.NewSongServer%22%2C%22method%22%3A%22get_new_song_info%22%2C%22param%22%3A%7B%22type%22%3A6%7D%7D%7D'
        } else if (type === 2) {    //欧美
            url = 'https://u.y.qq.com/cgi-bin/musics.fcg?-=recom2011294758354496&g_tk=5381&sign=zza4hbix1l0kqylhadad878d3da9f8c4a40b206041d88da9&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22new_song%22%3A%7B%22module%22%3A%22newsong.NewSongServer%22%2C%22method%22%3A%22get_new_song_info%22%2C%22param%22%3A%7B%22type%22%3A2%7D%7D%7D'
        } else if (type === 5) {    //最新
            url = 'https://u.y.qq.com/cgi-bin/musics.fcg?-=recom6110692229270864&g_tk=5381&sign=zzaa86z4kj47j7rht9328902d319eb51156c5d99c8c2f3fa8&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22new_song%22%3A%7B%22module%22%3A%22newsong.NewSongServer%22%2C%22method%22%3A%22get_new_song_info%22%2C%22param%22%3A%7B%22type%22%3A5%7D%7D%7D'
        } else if (type === 4) {    //韩国
            url = 'https://u.y.qq.com/cgi-bin/musics.fcg?-=recom6729495528402518&g_tk=5381&sign=zzaaeot1895temhzi2dd56eb7022beed1aa33fd2331ec33b89&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22new_song%22%3A%7B%22module%22%3A%22newsong.NewSongServer%22%2C%22method%22%3A%22get_new_song_info%22%2C%22param%22%3A%7B%22type%22%3A4%7D%7D%7D'
        } else {    //日本 （3）
            url = 'https://u.y.qq.com/cgi-bin/musics.fcg?-=recom5109107892147629&g_tk=5381&sign=zzaycmg5523ln2rw061af5ab9423c29e9dfccb324859bab45b2&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22new_song%22%3A%7B%22module%22%3A%22newsong.NewSongServer%22%2C%22method%22%3A%22get_new_song_info%22%2C%22param%22%3A%7B%22type%22%3A3%7D%7D%7D'
        }
        return axios.get('/user/getDataByUrl',{params: {getUrl: url}})
    },
    getRecomSongList (type) {
        let url = ''
        if (type === 0) {   //为你推荐
            url = 'https://u.y.qq.com/cgi-bin/musics.fcg?-=recom2065763786537418&g_tk=5381&sign=zzazwrr2grts1ivjd1099cdff7fe034e6f3eaf2265079283d&loginUin=2500667233&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22recomPlaylist%22%3A%7B%22method%22%3A%22get_hot_recommend%22%2C%22param%22%3A%7B%22async%22%3A1%2C%22cmd%22%3A2%7D%2C%22module%22%3A%22playlist.HotRecommendServer%22%7D%7D'
        } else if (type === 1) {    //官方歌单
            url = 'https://u.y.qq.com/cgi-bin/musics.fcg?-=recom8688579015002396&g_tk=5381&sign=zzacrefwsub2vrnfu481851622f46256cc8eb3c0b2e92d6b9&loginUin=2500667233&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22playlist%22%3A%7B%22method%22%3A%22get_playlist_by_category%22%2C%22param%22%3A%7B%22id%22%3A3317%2C%22curPage%22%3A1%2C%22size%22%3A40%2C%22order%22%3A5%2C%22titleid%22%3A3317%7D%2C%22module%22%3A%22playlist.PlayListPlazaServer%22%7D%7D'
        } else if (type === 2) {    //情歌
            url = 'https://u.y.qq.com/cgi-bin/musics.fcg?-=recom8759141194251481&g_tk=5381&sign=zzazjux2lxn9on9yp9b89af58ec4a2a006be15191eb7138e6&loginUin=2500667233&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22playlist%22%3A%7B%22method%22%3A%22get_playlist_by_category%22%2C%22param%22%3A%7B%22id%22%3A71%2C%22curPage%22%3A1%2C%22size%22%3A40%2C%22order%22%3A5%2C%22titleid%22%3A71%7D%2C%22module%22%3A%22playlist.PlayListPlazaServer%22%7D%7D'
        } else if (type === 3) {    //网络歌曲
            url = 'https://u.y.qq.com/cgi-bin/musics.fcg?-=recom3325349053145985&g_tk=5381&sign=zzaoygowtzsvcqt1eec0bd11fdd5283fb28a393b9379c9a&loginUin=2500667233&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22playlist%22%3A%7B%22method%22%3A%22get_playlist_by_category%22%2C%22param%22%3A%7B%22id%22%3A3056%2C%22curPage%22%3A1%2C%22size%22%3A40%2C%22order%22%3A5%2C%22titleid%22%3A3056%7D%2C%22module%22%3A%22playlist.PlayListPlazaServer%22%7D%7D'
        } else if (type === 4) {    //经典
            url = 'https://u.y.qq.com/cgi-bin/musics.fcg?-=recom38710442843774673&g_tk=5381&sign=zzaxky68bqfr76otpd41dbe3d3343d0907fcb675ab30bf89c1&loginUin=2500667233&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22playlist%22%3A%7B%22method%22%3A%22get_playlist_by_category%22%2C%22param%22%3A%7B%22id%22%3A59%2C%22curPage%22%3A1%2C%22size%22%3A40%2C%22order%22%3A5%2C%22titleid%22%3A59%7D%2C%22module%22%3A%22playlist.PlayListPlazaServer%22%7D%7D'
        } else {    //KTV热歌
            url = 'https://u.y.qq.com/cgi-bin/musics.fcg?-=recom3798201680049531&g_tk=5381&sign=zza570k37fflm6t1d9444e6ecd99d3dc59d009faa16f6f3&loginUin=2500667233&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22playlist%22%3A%7B%22method%22%3A%22get_playlist_by_category%22%2C%22param%22%3A%7B%22id%22%3A64%2C%22curPage%22%3A1%2C%22size%22%3A40%2C%22order%22%3A5%2C%22titleid%22%3A64%7D%2C%22module%22%3A%22playlist.PlayListPlazaServer%22%7D%7D'
        }
        return axios.get('/user/getDataByUrl',{params: {getUrl: url}})
    },
    getAlbumSongList (type) {
        let url = ''
        if (type === 1) {   //内地
            url = 'https://u.y.qq.com/cgi-bin/musics.fcg?-=recom9962294845624005&g_tk=5381&sign=zza5glptd87riq8bf5e203a354235dc00765db3f750912b&loginUin=2500667233&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22new_album%22%3A%7B%22module%22%3A%22newalbum.NewAlbumServer%22%2C%22method%22%3A%22get_new_album_info%22%2C%22param%22%3A%7B%22area%22%3A1%2C%22sin%22%3A0%2C%22num%22%3A20%7D%7D%7D'
        } else if (type === 2) {    //港台
            url = 'https://u.y.qq.com/cgi-bin/musics.fcg?-=recom9759788083929704&g_tk=5381&sign=zzaccov02a7kb248b456a6260013b3eabbe2a6ba5725a&loginUin=2500667233&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22new_album%22%3A%7B%22module%22%3A%22newalbum.NewAlbumServer%22%2C%22method%22%3A%22get_new_album_info%22%2C%22param%22%3A%7B%22area%22%3A2%2C%22sin%22%3A0%2C%22num%22%3A20%7D%7D%7D'
        } else if (type === 3) {    //欧美
            url = 'https://u.y.qq.com/cgi-bin/musics.fcg?-=recom4248789743435972&g_tk=5381&sign=zza4m8dffs2wo6xbq5261e425af199fc0a1f9bae29694239b1&loginUin=2500667233&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22new_album%22%3A%7B%22module%22%3A%22newalbum.NewAlbumServer%22%2C%22method%22%3A%22get_new_album_info%22%2C%22param%22%3A%7B%22area%22%3A3%2C%22sin%22%3A0%2C%22num%22%3A20%7D%7D%7D'
        } else if (type === 4) {    //韩国
            url = 'https://u.y.qq.com/cgi-bin/musics.fcg?-=recom5272198727279569&g_tk=5381&sign=zza1sy71hpp2ia1izfac6738053130653a8af18646191d8b4&loginUin=2500667233&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22new_album%22%3A%7B%22module%22%3A%22newalbum.NewAlbumServer%22%2C%22method%22%3A%22get_new_album_info%22%2C%22param%22%3A%7B%22area%22%3A4%2C%22sin%22%3A0%2C%22num%22%3A20%7D%7D%7D'
        } else if (type === 5) {    //日本
            url = 'https://u.y.qq.com/cgi-bin/musics.fcg?-=recom9448341988128401&g_tk=5381&sign=zzaxpqf8vzvv1eu7352b9f3f15d563e5aeb7778c3c764915a&loginUin=2500667233&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22new_album%22%3A%7B%22module%22%3A%22newalbum.NewAlbumServer%22%2C%22method%22%3A%22get_new_album_info%22%2C%22param%22%3A%7B%22area%22%3A5%2C%22sin%22%3A0%2C%22num%22%3A20%7D%7D%7D'
        } else {    //其它
            url = 'https://u.y.qq.com/cgi-bin/musics.fcg?-=recom7950753943805817&g_tk=5381&sign=zza2rx816gjameraubm9c42bb2c20527dc58951a043c7e1a433&loginUin=2500667233&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22new_album%22%3A%7B%22module%22%3A%22newalbum.NewAlbumServer%22%2C%22method%22%3A%22get_new_album_info%22%2C%22param%22%3A%7B%22area%22%3A6%2C%22sin%22%3A0%2C%22num%22%3A20%7D%7D%7D'
        }
        return axios.get('/user/getDataByUrl',{params: {getUrl: url}})
    }
}
