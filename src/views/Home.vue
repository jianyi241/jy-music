<template>
    <div class="home">
        <div class="header loop" @mouseover="changeLoop('')" @mouseout="loop()">
            <div class="loop-content" :style="{backgroundColor: loopList[currentLoop].bgColor}">
                <span class="prev" @click="changeLoop('prev')"></span>
                <a href="#" class="loop-item" :style="{backgroundImage: 'url('+loopList[currentLoop].imgUrl+')'}" ></a>
                <span class="next" @click="changeLoop('next')"></span>
            </div>
            <ul class="choice">
                <li class="choice-btn" v-for="item in loopList" :key="item.index" :class="currentLoop === item.index ? 'choice-btn-on' : ''" @click="changeLoop(item.index)"></li>
            </ul>
        </div>
        <div class="section">
            <div>
                <ul class="music-ul">
                    <li class="music-item" v-for="(item,index) in musicList" v-show="index < 6" :key="item.id" :class="!!playingMusic && playingMusic.id === item.id ? 'music-on' : ''" @click="playMusic(item, 1, $event)" @dblclick="playMusic(item, 2, $event)">
                        <span class="cover">
                            <img :src="item.musicCover" width="40" height="40"/>
                        </span>
                        <span class="music-name">{{item.musicName}}</span>
                        <span class="music-author">{{item.musicAuthor}}</span>
                        <span class="music-album">{{item.musicAlbum}}</span>
                        <span class="music-duration">{{formatTime(item.musicDuration)}}</span>
                        <!-- <span class="music-fiery-degree">
                            <i class="degree-frame"></i>
                            <i class="degree-frame-bg" :style="{width: item.musicFieryDegree+'%'}"></i>
                        </span> -->
                    </li>
                </ul>
            </div>
            <div class="mv-module">
                <span class="mv-prev" @click="changeRotation('mv','prev')"></span>
                <div class="mv-title">
                    <p class="title">
                        <span>M</span>
                        <span style="margin-left: 18px;">V</span>
                    </p>
                    <ul class="mv-type">
                        <li v-for="item in mvType" :key="item.id" :class="currentMVType === item.val ? 'on' : ''" @click="changeMVByType(item.val)">{{item.text}}</li>
                    </ul>
                </div>
                <div class="mv-content">
                    <ul class="mv-list">
                        <li class="mv-item" v-for="(item,index) in mvList[currentMVIdx]" :key="item.mv_id">
                            <span class="mv-cover">
                                <i class="play-mv" @click="goPage(baseUrl+item.vid+'.html')"></i>
                                <img :src="item.picurl" width="224" height="126" @click="goPage(baseUrl+item.vid+'.html')"/>
                            </span>
                            <span class="mv-title" :title="item.mvtitle" @click="goPage(baseUrl+item.vid+'.html')">{{item.mvtitle}}</span>
                            <span class="mv-author" :title="item.singer_name" @click="goPage('https://y.qq.com/n/yqq/singer/'+item.singermid+'.html#stat=y_new.index.mv.singername')">{{item.singer_name}}</span>
                            <span class="play-count"><i class="count-icon"></i>{{item.listennum}}</span>
                        </li>
                    </ul>
                    <ul class="mv-btn-list">
                        <li class="mv-btn" :class="currentMVIdx === index ? 'on' : ''" v-for="(item,index) in mvList" @click="changeRotation('mv',index)"></li>
                    </ul>
                </div>
                <span class="mv-next" @click="changeRotation('mv','next')"></span>
            </div>
        </div>
        <div class="playing-info" v-if="!!playingMusic">
            <span class="curr-cover" ref="curr-cover" :class="playingMusic.isPlay ? 'rotate-cover' : ''">
                <img :src="playingMusic.musicCover" width="52" height="52"/>
            </span>
            <i class="play-btn" :class="!!playingMusic ? playingMusic.isPlay ? 'playing' : ''  : ''" @click="playOrPause()"></i>
            <span class="curr-time">{{formatTime(parseInt(media.currentTime))}}</span>
            <p class="range">
                <input type="range" v-model="media.currentTime" min="0" :max="speedMax" step="1" @input="changeMusicSpeed()" @change="changeMusicSpeed()"/>
            </p>
            <span class="play-time">{{formatTime(playingMusic.musicDuration)}}</span>
            <audio ref="audio" :src="playingMusic.musicUrl" autoplay loop @timeupdate="durationChange" @playing="play()" @seeking="seeking()" @seeked="seeked"></audio>
        </div>

    </div>
</template>

<script>
import loop1 from "../assets/img/loop/loop1.jpg"
import loop2 from "../assets/img/loop/loop2.jpg"
import loop3 from "../assets/img/loop/loop3.jpg"
import loop4 from "../assets/img/loop/loop4.jpg"
import loop5 from "../assets/img/loop/loop5.jpg"
import loop6 from "../assets/img/loop/loop6.jpg"
import audio1 from "../assets/audio/a1.mp3"
import audio2 from "../assets/audio/a2.mp3"
import audio3 from "../assets/audio/a3.mp3"

export default {
    name: 'Home',
    components: {

    },
    data() {
        return {
            currentLoop: 0,
            loopList: [
                {
                    index: 0,
                    imgUrl: loop1,
                    title: "就是歌多,大有不同",
                    bgColor: "#1267C4"
                },
                {
                    index: 1,
                    imgUrl: loop2,
                    title: "繁星网 缔造星途神话",
                    bgColor: "#F5FAF4"
                },
                {
                    index: 2,
                    imgUrl: loop3,
                    title: " 创造营2020学员 创造营2020 第3期",
                    bgColor: "#F3548E"
                },
                {
                    index: 3,
                    imgUrl: loop4,
                    title: "青春有你2",
                    bgColor: "#37A7F9"
                },
                {
                    index: 4,
                    imgUrl: loop5,
                    title: "pick宝藏！新生代欧美男团备忘录",
                    bgColor: "#0047B9"
                },
                {
                    index: 5,
                    imgUrl: loop6,
                    title: "唱作人2合辑",
                    bgColor: "#080808"
                }
            ],
            loopInterval: null,
            musicList: [
                {
                    id: 1001,
                    musicName: "冬眠",
                    musicAuthor: "司南",
                    musicAlbum: "动漫",
                    musicUrl: audio1,
                    musicDuration: 269,
                    musicFieryDegree: 80,
                },{
                    id: 1002,
                    musicName: "不再见",
                    musicAuthor: "陈学冬",
                    musicAlbum: "不再见",
                    musicUrl: audio2,
                    musicDuration: 244,
                    musicFieryDegree: 60,
                },{
                    id: 1003,
                    musicName: "你的答案",
                    musicAuthor: "阿允",
                    musicAlbum: "你的答案",
                    musicUrl: audio3,
                    musicDuration: 219,
                    musicFieryDegree: 90,
                }
            ],
            playingMusic: null,
            speed: 0,
            speedMax: 0,
            media: {
                currentTime: 0
            },
            timer: null,
            pageIndex: 1,
            pageSize: 20,
            words: "热歌",
            mvList: [],
            mvType: [
                {
                    id: 0,
                    val: "all",
                    text: "精选"
                },
                {
                    id: 1,
                    val: "neidi",
                    text: "内地"
                },
                {
                    id: 2,
                    val: "korea",
                    text: "韩国"
                },
                {
                    id: 3,
                    val: "gangtai",
                    text: "港台"
                },
                {
                    id: 4,
                    val: "oumei",
                    text: "欧美"
                },
                {
                    id: 5,
                    val: "janpan",
                    text: "日本"
                },
            ],
            currentMVIdx: 0,
            currentMVType: 'all',
            baseUrl: "https://y.qq.com/n/yqq/mv/v/"
        }
    },
    methods: {
        goPage(url) {
            window.open(url,'_blank')
        },
        changeMVByType(val) {
            this.getMVList(val)
            this.currentMVType = val
            this.currentMVIdx = 0
        },
        changeRotation(rotaType, type){
            if (rotaType === 'mv') {
                if (type === 'prev') {
                    if (this.currentMVIdx > 0) {
                        this.currentMVIdx--
                    } else {
                        this.currentMVIdx = 4
                    }
                } else if (type === 'next') {
                    if (this.currentMVIdx < 4) {
                        this.currentMVIdx++
                    } else {
                        this.currentMVIdx = 0
                    }
                } else {
                    this.currentMVIdx = type
                }
            }
        },
        changeLoop(val) {
            clearInterval(this.loopInterval)
            if (val === '') {
                return
            }
            if (val === 'prev') {
                if (this.currentLoop > 0) {
                    this.currentLoop--
                } else {
                    this.currentLoop = 5
                }
            } else if(val === 'next') {
                if (this.currentLoop < 5) {
                    this.currentLoop++
                } else {
                    this.currentLoop = 0
                }
            } else{
                this.currentLoop = val
            }
        },
        loop() {
            this.loopInterval = setInterval(() => {
                this.currentLoop++
                if (this.currentLoop > 5) {
                    this.currentLoop = 0
                }
            },3000)
        },
        playOrPause() {
            if (!this.$refs.audio.paused) {
                this.$refs.audio.pause()
                this.playingMusic.isPlay = false
            } else {
                this.$refs.audio.play()
                this.playingMusic.isPlay = true
            }
        },
        playMusic(item, _type, event) {
            clearTimeout(this.timer);
            if (_type == 1) {
                if (event.detail == 2) return;
                this.timer = setTimeout(function() {
                    if (!!item.playUrl) {
                        window.open(item.playUrl,"_blank")
                    }
                }, 300);
            } else {
                console.log("播放了哦！",item.musicUrl);
                if (!this.playingMusic) {
                    this.playingMusic = item
                    this.playingMusic.isPlay = true
                } else {
                    if (this.playingMusic.id === item.id) {
                        if (!this.$refs.audio.paused) {
                            this.$refs.audio.pause()
                            this.playingMusic.isPlay = false
                        } else {
                            this.$refs.audio.play()
                            this.playingMusic.isPlay = true
                        }
                    } else {
                        this.playingMusic = item
                        this.$refs.audio.play()
                        this.playingMusic.isPlay = true
                    }
                }
            }
        },
        changeMusicSpeed() {
            this.$refs.audio.currentTime = this.media.currentTime
        },
        durationChange() {
            this.media.currentTime = this.$refs.audio.currentTime
        },
        play() {
            this.speedMax = this.$refs.audio.duration
        },
        seeking() {
            console.log("seeking")
        },
        seeked() {
            console.log("seeked")
        },
        getMusicList() {
            this.$api.getDataByUrl({getUrl: "https://c.y.qq.com/soso/fcgi-bin/client_search_cp?remoteplace=txt.weixin.officialaccount&platform=weixin&format=json&p="+this.pageIndex+"&n="+this.pageSize+"&w="+encodeURI(this.words)}).then(res => {
                // console.log(res.data,"音乐列表")
                let list = res.data.data.song.list
                this.musicList = []
                list.forEach((item, index) => {
                    this.musicList.push({
                        id: item.songid,
                        musicName: item.songname,
                        musicAuthor: item.singer[0].name,
                        musicAlbum: item.albumname,
                        musicUrl: index % 2 === 0 ? audio1 : audio2,
                        // 'https://mp.weixin.qq.com/cgi-bin/readtemplate?t=tmpl/qqmusic_tmpl&singer=薛之谦&music_name=演员&albumurl=https://y.gtimg.cn/music/photo_new/T002R68x68M000002LSGV30Vhra4.jpg&musictype=1',
                        // `https://mp.weixin.qq.com/cgi-bin/readtemplate?t=tmpl/qqmusic_tmpl&amp;singer=${decodeURIComponent(item.singer[0].name)}&amp;music_name=${item.songname}&amp;albumurl=${item.albummid}`,
                        musicDuration: item.interval,
                        musicCover: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid || item.media_mid}.jpg`,
                        musicFieryDegree: 90,
                        playUrl: item.songurl || ''
                    })
                });
            })
        },
        getMVList(type) {
            let url = `https://c.y.qq.com/mv/fcgi-bin/getmv_by_tag?g_tk_new_20200303=5381&g_tk=5381&loginUin=2500667233&hostUin=0&format=json&inCharset=utf8&outCharset=GB2312&notice=0&platform=yqq.json&needNewCode=0&cmd=shoubo&lan=${type}`
            this.$api.getDataByUrl({getUrl: url}).then(res => {
                let result = [[],[],[],[],[]]
                console.log("请求道的mv列表",result)
                // this.mvList = result.mvlist
                JSON.parse(`${res.data}}`).data.mvlist.forEach((item,index) => {
                    result[parseInt(index / 10)].push(item)
                })
                this.mvList = result
                console.log(this.mvList,"MVLIST")
            })
        },
        getMusicContent() {
            this.$api.getMusicContent().then(res => {
                // console.log(`"${res.data}"`,"首页主题内容")
            })
        },
        formatTime(time) {
            let minute = 0
            if (time % 60 === 0) {
                minute = parseInt(time / 60) > 9 ? parseInt(time / 60) + ':00' : '0' + parseInt(time / 60) + ':00'
            } else {
                minute = parseInt(time / 60) > 9 ? parseInt(time / 60) + ':'+(time % 60 > 9 ? time % 60 : '0' + time % 60) : '0' + parseInt(time / 60) + ':' + (time % 60 > 9 ? time % 60 : '0' + time % 60)
            }
            return minute
        }

    },
    created() {
        this.getMusicList()
        this.loop()
        this.getMusicContent()
        this.getMVList('all')
    }
}
</script>

<style lang="less" scoped>
@blue: #23ade5;
@white: rgb(247, 238, 214);
.home{
    width: 100%;
    .loop{
        position: relative;
        width: inherit;
        height: 445px;
        &:hover{
            .loop-content {
                .prev{
                    left: 0;
                }
                .next {
                    right: 0;
                }
            }
        }
        .loop-content{
            position: relative;
            text-align: center;
            transition: background-color .4s ease-in-out;
            overflow: hidden;
            .prev,.next{
                position: absolute;
                display: block;
                width: 80px;
                height: 200px;
                background: rgba(99, 99, 99, .2) url("../assets/image/prev.png")  center center/80% no-repeat;
                top: 50%;
                margin-top: -100px;
                transition: background-color .2s ease-in-out;
                cursor: pointer;
                &:hover{
                    background-color: rgba(66, 66, 66, .2);
                }
            }
            .prev{
                left: -80px;
                transition: left .2s ease-in-out;
            }
            .next{
                right: -80px;
                transform: rotate(180deg);
                transition: right .2s ease-in-out;
            }
            .loop-item{
                display: inline-block;
                width: 100%;
                height: 445px;
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center center;
                transition: background-image .4s ease-in-out;
            }
        }
        .choice{
            position: absolute;
            width: 256px;
            height: 36px;
            top: 380px;
            left: 50%;
            margin-left: -128px;
            box-sizing: border-box;
            padding: 12px 0;
            .choice-btn{
                display: inline-block;
                width: 18px;
                height: 8px;
                margin: 0 12px;
                border-radius: 4px;
                background-color: @white;
                cursor: pointer;
                transition: background-color .1s ease-in-out;
                &:hover{
                    background-color: #23ade5;
                }
            }
            .choice-btn-on{
                background-color: @blue;
            }
        }
    }
    .section{
        .music-ul{
            width: 520px;
            margin: 0 auto;
            .music-item{
                position: relative;
                margin: 12px 0;
                height: 52px;
                width: 100%;
                line-height: 52px;
                background-color: rgba(100, 148, 237, .2);
                padding: 0 8px;
                border-radius: 4px;
                color: #FFF;
                cursor: pointer;
                &:hover{
                    box-shadow: 0 0 2px rgba(100, 148, 237, 1);
                    background-color: rgba(100, 148, 237, .4);
                }
                span{
                    position: relative;
                    display: inline-block;
                    height: 100%;
                    font-size: 14px;
                    margin-right: 16px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    vertical-align: middle;
                }
                .cover{
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                    margin-top: -1px;
                }
                .music-name{
                    width: 100px;
                }
                .music-author{
                    width: 100px;
                }
                .music-album{
                    width: 100px;
                }
                .music-duration {
                    width: 100px;
                }
            }
            .music-on{
                box-shadow: 0 0 8px rgba(100, 148, 237, .8);
            }
        }
        .mv-module{
            position: relative;
            width: 100%;
            height: 633px;
            background-color: rgba(238, 238, 255, .8);
            box-sizing: border-box;
            padding: 16px 0;
            overflow: hidden;
            &:hover{
                .mv-prev{
                    left: 0px;
                }
                .mv-next{
                    right: 0px;
                }
            }
            .mv-title{
                .title{
                    font-size: 34px;
                    text-align: center;
                }
                .mv-type{
                    margin: 16px 0 30px 0;
                    text-align: center;
                    li{
                        display: inline-block;
                        margin-right: 42px;
                        cursor: pointer;
                        &:hover{
                            color: #1296ff;
                        }
                    }
                    .on{
                        color: #1296ff;
                    }
                }
            }
            .mv-prev,.mv-next{
                position: absolute;
                width: 70px;
                height:110px;
                top: 50%;
                margin-top: -40px;
                background: #AAAAAA url("../assets/image/prev.png")  center center/80% no-repeat;
                opacity: .4;
                cursor: pointer;
                &:hover{
                    opacity: .8;
                }
            }
            .mv-prev{
                left: -70px;
                transition: left .2s ease-in-out;
            }
            .mv-next{
                right: -70px;
                transform: rotate(180deg);
                transition: right .2s ease-in-out;
            }
            .mv-content{
                position: relative;
                width: 1240px;
                height: 495px;
                margin: 0 auto;
                .mv-list{
                    display: flex;
                    justify-content: space-between;
                    flex-flow: row wrap;
                    width: 100%;
                    height: 465px;
                    overflow: hidden;
                    .mv-item{
                        width: 224px;
                        height: 220px;
                        margin-bottom: 25px;
                        span{
                            display: block;
                            height: 24px;
                            line-height: 24px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            font-size: 14px;
                            color: #999;
                            transition: color .1s ease-in-out;
                        }
                        .mv-cover{
                            position: relative;
                            width: 224px;
                            height: 126px;
                            overflow: hidden;
                            cursor: pointer;
                            &:hover{
                                img {
                                    transform: scale(1.1);
                                }
                                .play-mv{
                                    z-index: 1;
                                    transform: scale(1.3);
                                }
                            }
                            .play-mv{
                                display: inline-block;
                                width: 40px;
                                height: 40px;
                                position: absolute;
                                left: 0;
                                top: 0;
                                right: 0;
                                bottom: 0;
                                margin: auto;
                                background: #FFF url("../assets/image/cover_play.png") center center/100% no-repeat;
                                border-radius: 50%;
                                z-index: -1;
                                transition: transform .2s ease-in-out;
                            }
                            img{
                                transition: transform .2s ease-in-out;
                            }
                        }
                        .mv-author{
                            cursor: pointer;
                            &:hover{
                                color: #1296ff;
                            }
                        }
                        .mv-title{
                            color: #000;
                            cursor: pointer;
                            &:hover{
                                color: #1296ff;
                            }
                        }
                        .play-count{
                            .count-icon{
                                display: inline-block;
                                width: 19px;
                                height: 12px;
                                margin-right: 6px;
                                background-image: url(../assets/image/icon_sprite.png);
                                background-repeat: no-repeat;
                                background-position: -180px -20px;
                                vertical-align: -1px;
                            }
                        }
                    }
                }
                .mv-btn-list{
                    position: absolute;
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                    left: 0;
                    bottom: 0;
                    text-align: center;
                    .mv-btn{
                        display: inline-block;
                        width: 10px;
                        height: 10px;
                        background-color: #FFF;
                        margin: 0 16px;
                        border-radius: 5px;
                        transition: background-color .1s ease-in-out;
                        cursor: pointer;
                    }
                    .on{
                        width: 24px;
                        background-color: #1296ff;
                    }
                }
            }
        }
    }
    .playing-info{
        position: fixed;
        width: 1000px;
        height: 80px;
        bottom: 0;
        left: 50%;
        margin-left: -500px;
        background-color: #FFF;
        // rgba(100, 152, 240, .4);
        // rgba(255, 192, 203, 0.2);
        border-radius: 6px 6px 0 0;
        box-sizing: border-box;
        padding: 17px 152px;
        box-shadow: 0 0 6px #ccc;
        span{
            display: inline-block;
            height: 46px;
            width: 50px;
            text-align: center;
            line-height: 46px;
            font-size: 14px;
            color: #444;
            vertical-align: top;
        }
        .curr-cover{
            width: 52px;
            height: 52px;
            margin-top: -3px;
            border-radius: 50%;
            overflow: hidden;
        }
        .rotate-cover{
            animation:loopRotate 8s linear infinite;
        }
        @keyframes loopRotate {
            0% {
                transform: rotate(0deg)
            }
            100% {
                transform: rotate(360deg)
            }
        }
        .play-btn{
            display: inline-block;
            position: relative;
            width: 46px;
            height: 46px;
            margin: 0 16px;
            background: transparent url(../assets/image/play.svg) center center/contain no-repeat;
            transition: background-image .1s ease-in;
            border-radius: 50%;
            cursor: pointer;
        }
        .playing{
            background-image: url(../assets/image/playing.svg);
        }
        .range{
            position: relative;
            display: inline-block;
            height: 46px;
            box-sizing: border-box;
            padding: 13px 10px 25px 10px;
            vertical-align: top;
            input[type=range] {
                -webkit-appearance: none;
                width: 300px;
                border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
            }
            input[type=range]::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: 12px;
                width: 12px;
                margin-top: -4px; /*使滑块超出轨道部分的偏移量相等*/
                background: #1296ff;
                border-radius: 50%; /*外观设置为圆形*/
                cursor: pointer;
                transition: transform .1s ease-in,margin-top .1s ease-in;
                &:hover{
                    transform: scale(1.2);
                    margin-top: -4.8px;
                }
            }
            input[type=range]::-webkit-slider-runnable-track {
                height: 4px;
                border-radius: 2px; /*将轨道设为圆角的*/
                box-shadow: 0 0px 2px #def3f8; /*轨道内置阴影效果*/
                background-color: rgba(100, 152, 240, .4);
            }
            input[type=range]:focus {
                outline: none;
            }
        }
    }
}
</style>
