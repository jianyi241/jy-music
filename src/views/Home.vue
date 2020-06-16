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
            <span class="module-prev" @click="changeRotation('prev')" :style="{top: prevOrNextNum + 'px',left: isShowPrevAndNext ? 0 : '-70px'}"></span>
            <span class="module-next" @click="changeRotation('next')" :style="{top: prevOrNextNum + 'px',right:isShowPrevAndNext ? 0 : '-70px'}"></span>
<!--            <div>-->
<!--                <ul class="music-ul">-->
<!--                    <li class="music-item" v-for="(item,index) in musicList" v-show="index < 6" :key="item.id" :class="!!playingMusic && playingMusic.id === item.id ? 'music-on' : ''" @click="playMusic(item, 1, $event)" @dblclick="playMusic(item, 2, $event)">-->
<!--                        <span class="cover">-->
<!--                            <img :src="item.musicCover" width="40" height="40"/>-->
<!--                        </span>-->
<!--                        <span class="music-name">{{item.musicName}}</span>-->
<!--                        <span class="music-author">{{item.musicAuthor}}</span>-->
<!--                        <span class="music-album">{{item.musicAlbum}}</span>-->
<!--                        <span class="music-duration">{{formatTime(item.musicDuration)}}</span>-->
<!--                        &lt;!&ndash; <span class="music-fiery-degree">-->
<!--                            <i class="degree-frame"></i>-->
<!--                            <i class="degree-frame-bg" :style="{width: item.musicFieryDegree+'%'}"></i>-->
<!--                        </span> &ndash;&gt;-->
<!--                    </li>-->
<!--                </ul>-->
<!--            </div>-->
            <div class="song-recom-module module" :class="currentLookModule === 'songRecom' ? 'current-module-bg' : ''" @mouseover="showPrevAndNext('songRecom')">
                <div class="recom-info">
                    <p class="recom-title">歌单推荐</p>
                    <ul class="recom-tabs">
                        <li class="recom-tab" :class="currentRecomType === item.type ? 'on' : ''" v-for="item in recomTabs" :key="item.type" @click="searchRecomSong(item.type)">{{item.name}}</li>
                    </ul>
                    <div class="recom-content">
                        <ul class="recom-list">
                            <li class="recom-card" v-for="item in recomPlayList[currentRecomSongIdx]" :key="item.content_id">
                                <p class="recom-card-cover" @click="goPage('https://y.qq.com/n/yqq/playsquare/'+item.content_id+'.html#stat=y_new.index.playlist.pic')">
                                    <img :src="item.cover || item.cover_url_big" width="235" height="235"/>
                                    <i class="cover-mask"></i>
                                    <i class="recom-play play-song"></i>
                                </p>
                                <span class="recom-card-title" :title="item.title">{{item.title}}</span>
                                <span class="recom-play-count" :title="'播放量'+parseInt((item.listen_num || item.access_num)/10000).toFixed(1)+'万'">播放量：{{(parseInt(item.listen_num || item.access_num)/10000).toFixed(1)}}万</span>
                            </li>
                        </ul>
                    </div>
                    <ul class="recom-btn-list choice-btn-list">
                        <li class="recom-btn choice-btn" :class="currentRecomSongIdx === index ? 'on' : ''" v-for="(item,index) in recomPlayList" :key="item.content_id" @click="changeRotation(index)"></li>
                    </ul>
                </div>
            </div>
            <div class="new-song-module module" :class="currentLookModule === 'newSong' ? 'current-module-bg' : ''" @mouseover="showPrevAndNext('newSong')">
                <div class="song-info">
                    <p class="song-title">新歌首发</p>
                    <ul class="song-tabs">
                        <li class="song-tab" :class="newSongInfo.lan === item.lan ? 'song-tab-on' : ''" v-for="item in newSongInfo.lanlist" :key="item.type" @click="searchNewSong(item.type)">{{item.lan}}</li>
                    </ul>
                    <div class="song-content" v-if="!!newSongInfo.songlist[currentNewSongIdx].length && typeof (newSongInfo.songlist[currentNewSongIdx]) != 'undefined'">
                        <div class="song-card" v-for="item in newSongInfo.songlist[currentNewSongIdx]" :key="item.id" @click="goPage('https://y.qq.com/n/yqq/album/'+item.album.mid+'.html')">
                            <img :src="'//y.gtimg.cn/music/photo_new/T002R90x90M000'+item.album.pmid+'.jpg?max_age=2592000'" onerror="this.src='//y.gtimg.cn/mediastyle/global/img/album_300.png?max_age=31536000';this.onerror=null;" class="song-cover">
                            <p class="song-txt">
                                <span class="song-name">{{item.title}}</span><br/>
                                <span class="song-author">{{item.singer[0].name}}</span>
                            </p>
                            <p class="song-time">{{formatTime(item.interval)}}</p>
                        </div>
                    </div>
                    <ul class="song-btn-list choice-btn-list">
                        <li class="song-btn choice-btn" :class="currentNewSongIdx === index ? 'on' : ''" v-for="(item,index) in newSongInfo.songlist" :key="item.id" @click="changeRotation(index)"></li>
                    </ul>
                </div>
            </div>
            <div class="mv-module module" :class="currentLookModule === 'mv' ? 'current-module-bg' : ''" @mouseover="showPrevAndNext('mv')">
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
                                <i class="play-mv play-song" @click="goPage(baseUrl+item.vid+'.html')"></i>
                                <img :src="item.picurl" width="224" height="126" @click="goPage(baseUrl+item.vid+'.html')"/>
                            </span>
                            <span class="mv-title" :title="item.mvtitle" @click="goPage(baseUrl+item.vid+'.html')">{{item.mvtitle}}</span>
                            <span class="mv-author" :title="item.singer_name" @click="goPage('https://y.qq.com/n/yqq/singer/'+item.singermid+'.html#stat=y_new.index.mv.singername')">{{item.singer_name}}</span>
                            <span class="play-count"><i class="count-icon"></i>{{item.listennum}}</span>
                        </li>
                    </ul>
                    <ul class="mv-btn-list">
                        <li class="mv-btn" :class="currentMVIdx === index ? 'on' : ''" v-for="(item,index) in mvList" @click="changeRotation(index)"></li>
                    </ul>
                </div>
            </div>
            <div class="new-album-module module" :class="currentLookModule === 'newAlbum' ? 'current-module-bg' : ''" @mouseover="showPrevAndNext('newAlbum')">
                <div class="new-album-info">
                    <p class="album-title">新碟首发</p>
                    <ul class="album-tabs">
                        <li class="album-tab" :class="currentNewAlbumType === item.id ? 'on' : ''" v-for="item in newAlbumType" :key="item.id" @click="searchAlbumSong(item.id)">{{item.name}}</li>
                    </ul>
                    <div class="album-content">
                        <ul class="album-list">
                            <li class="album-card" v-for="item in newAlbumList[currentNewAlbumIdx]" :key="item.id">
                                <p class="album-cover" @click="goPage('https://y.qq.com/n/yqq/album/'+item.mid+'.html#stat=y_new.index.album.albumpic')">
                                    <img :src="'//y.gtimg.cn/music/photo_new/T002R300x300M000'+item.photo.pic_mid+'.jpg?max_age=2592000'" width="224" height="224"/>
                                    <i class="cover-mask"></i>
                                    <i class="album-play play-song"></i>
                                </p>
                                <span class="album-card-title" @click="goPage('https://y.qq.com/n/yqq/album/'+item.mid+'.html#stat=y_new.index.album.albumpic')">{{item.name}}</span>
                                <span class="album-card-author" @click="goPage('https://y.qq.com/n/yqq/album/'+item.mid+'.html#stat=y_new.index.album.albumpic')">
                                    <i v-for="(_item, index) in item.singers" :key="_item.id" @click="goPage('https://y.qq.com/n/yqq/singer/'+_item.mid+'.html#stat=y_new.index.album.singername')">
                                        {{_item.name}}
                                    </i>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <ul class="new-album-btn-list choice-btn-list">
                        <li class="new-album-btn choice-btn" :class="currentNewAlbumIdx === index ? 'on' : ''" v-for="(item, index) in newAlbumList" :key="index" @click="changeRotation(index)"></li>
                    </ul>
                </div>
            </div>
            <div class="ranking-module module" :class="currentLookModule === 'ranking' ? 'current-module-bg' : ''" @mouseover="showPrevAndNext('ranking')">
                <div class="ranking-info">
                    <p class="ranking-title">排行榜</p>
                    <ul class="ranking-list">
                        <li class="ranking-card" :class="'card-bg-'+(index+1)" v-for="(item, index) in rankingList[0].toplist.slice(1,6)" :key="item.topId">
                            <div class="ranking-content">
                                <div class="ranking-card-title">
                                    <p class="card-title1">{{rankingList[0].groupName}}</p>
                                    <p class="card-title2" @click="goPage('https://y.qq.com/n/yqq/toplist/'+item.topId+'.html#stat=y_new.index.toplist.detail.'+item.topId+'')">{{item.musichallTitle.substring(0,item.musichallTitle.length-1)}}</p>
                                </div>
                                <div class="ranking-card-play">
                                    <i class="card-play-btn"></i>
                                </div>
                                <div class="ranking-card-ul">
                                    <ul class="ranking-card-list">
                                        <li class="card-list-item" v-for="(_item, index) in item.song">
                                            <i class="num">{{index + 1}}</i>
                                            <p class="item-txt">
                                                <span @click="goPage('https://y.qq.com/n/yqq/song/'+_item.songId+'_num.html#stat=y_new.index.toplist.songname')">{{_item.title}}</span>
                                                <span @click="goPage('https://y.qq.com/n/yqq/singer/'+_item.singerMid+'.html#stat=y_new.index.toplist.singername')">{{_item.singerName}}</span>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <footer>
            <div class="home-footer">
                <div class="footer-info">
                    <div class="footer-download">
                        <p class="download-title">下载简逸音乐客户端</p>
                        <ul class="download-ul">
                            <li class="download-item" @click="goPage('www.baidu.com')">
                                <i class="icon win-icon"></i>
                            </li>
                        </ul>
                    </div>
                    <div class="footer-nav">
                        <ul class="footer-nav-ul">
                            <li class="nav-item" v-for="item in navList" :key="item.id">
                                <a :href="item.url" target="_blank">{{item.name}}</a><em style="margin: 0 6px">|</em>
                            </li>
                        </ul>
                    </div>
                    <div class="copy-right">

                        <p>Copyright © 1998 - 2020 Simple. All Rights Reserved.<br/>
                            简逸公司 版权所有 简逸网络文化经营许可证（本站纯属娱乐）</p>
                    </div>
                </div>
            </div>
        </footer>
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
            navList: [
                {
                    id: 1,
                    name: '关于简逸',
                    url: 'www.baidu.com'
                },
                {
                    id: 2,
                    name: 'About Simple',
                    url: 'www.baidu.com'
                },
                {
                    id: 3,
                    name: '服务条款',
                    url: 'www.baidu.com'
                },
                {
                    id: 4,
                    name: '用户服务协议',
                    url: 'www.baidu.com'
                },
                {
                    id: 5,
                    name: '隐私政策',
                    url: 'www.baidu.com'
                },
                {
                    id: 6,
                    name: '权利声明',
                    url: 'www.baidu.com'
                },
                {
                    id: 7,
                    name: '简逸招聘',
                    url: 'www.baidu.com'
                },
                {
                    id: 8,
                    name: '客服中心',
                    url: 'www.baidu.com'
                },
                {
                    id: 9,
                    name: '网站导航',
                    url: 'www.baidu.com'
                }
            ],
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
            baseUrl: 'https://y.qq.com/n/yqq/mv/v/',
            newSongInfo: {
                lan: '最新',
                lanlist: [],
                ret_msg: 'success!',
                songlist: [{
                    type: ''
                }],
                type: 5,
            },
            prevOrNextNum: 800,
            isShowPrevAndNext: false,
            currentLookModule: 'newSong',
            currentNewSongIdx: 0,
            currentNewSongPage: 1,
            recomPlayList: [],
            recomTabs: [
                {
                    type: 0,
                    name: '为你推荐'
                },{
                    type: 1,
                    name: '官方歌单'
                },{
                    type: 2,
                    name: '情歌'
                },{
                    type: 3,
                    name: '网络歌曲'
                },{
                    type: 4,
                    name: '经典'
                },{
                    type: 5,
                    name: 'KTV热歌'
                }
            ],
            currentRecomSongIdx: 0,
            recomSongPage: 0,
            currentRecomType: 0,
            newAlbumList: [],
            newAlbumType: [],
            currentNewAlbumType: 1,
            currentNewAlbumIdx: 0,
            currentNewAlbumPage: 0,
            rankingList: [{toplist: []}]
        }
    },
    methods: {
        filterSingers (val) {
            let singers = val.map(item => {
                return item.name
            })
            return singers
        },
        showPrevAndNext(type) {
            this.isShowPrevAndNext = true
            this.currentLookModule = type
            if (type === 'songRecom') {
                this.prevOrNextNum = 167.5 + 535
            } else if (type === 'newSong') {
                this.prevOrNextNum = 1210
            } else if (type === 'mv') {
                this.prevOrNextNum = 1790
            } else if (type === 'newAlbum') {
                this.prevOrNextNum = 2506
            }
        },
        goPage(url) {
            window.open(url,'_blank')
        },
        changeMVByType(val) {
            this.getMVList(val)
            this.currentMVType = val
            this.currentMVIdx = 0
        },
        changeRotation(type){
            if (this.currentLookModule === 'mv') {
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
            } else if (this.currentLookModule === 'newSong') {
                if (type === 'prev') {
                    if (this.currentNewSongIdx > 0) {
                        this.currentNewSongIdx--
                    } else {
                        this.currentNewSongIdx = this.currentNewSongPage
                    }
                } else if (type === 'next') {
                    if (this.currentNewSongIdx < this.currentNewSongPage) {
                        this.currentNewSongIdx++
                    } else {
                        this.currentNewSongIdx = 0
                    }
                } else {
                    this.currentNewSongIdx = type
                }
            } else if (this.currentLookModule === 'songRecom') {
                if (type === 'prev') {
                    if (this.currentRecomSongIdx > 0) {
                        this.currentRecomSongIdx--
                    } else {
                        this.currentRecomSongIdx = this.recomSongPage - 1
                    }
                } else if (type === 'next') {
                    if (this.currentRecomSongIdx < this.recomSongPage -1) {
                        this.currentRecomSongIdx++
                    } else {
                        this.currentRecomSongIdx = 0
                    }
                } else {
                    this.currentRecomSongIdx = type
                }
            } else if (this.currentLookModule === 'newAlbum') {
                if (type === 'prev') {
                    if (this.currentNewAlbumIdx > 0) {
                        this.currentNewAlbumIdx--
                    } else {
                        this.currentNewAlbumIdx = this.currentNewAlbumPage - 1
                    }
                } else if (type === 'next') {
                    if (this.currentNewAlbumIdx < this.currentNewAlbumPage -1) {
                        this.currentNewAlbumIdx++
                    } else {
                        this.currentNewAlbumIdx = 0
                    }
                } else {
                    this.currentNewAlbumIdx = type
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
                // console.log("请求道的mv列表",result)
                // this.mvList = result.mvlist
                JSON.parse(`${res.data}}`).data.mvlist.forEach((item,index) => {
                    result[parseInt(index / 10)].push(item)
                })
                this.mvList = result
                // console.log(this.mvList,"MVLIST")
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
        },
        initHomeData (type='bestNew') {
            this.currentNewSongIdx = 0
            let url = 'https://u.y.qq.com/cgi-bin/musics.fcg?-=recom5538560203444538&g_tk=5381&sign=zza1ex6w1f5xksff15c4441255ee9ef959d8dacccc3f88&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22category%22%3A%7B%22method%22%3A%22get_hot_category%22%2C%22param%22%3A%7B%22qq%22%3A%22%22%7D%2C%22module%22%3A%22music.web_category_svr%22%7D%2C%22recomPlaylist%22%3A%7B%22method%22%3A%22get_hot_recommend%22%2C%22param%22%3A%7B%22async%22%3A1%2C%22cmd%22%3A2%7D%2C%22module%22%3A%22playlist.HotRecommendServer%22%7D%2C%22playlist%22%3A%7B%22method%22%3A%22get_playlist_by_category%22%2C%22param%22%3A%7B%22id%22%3A8%2C%22curPage%22%3A1%2C%22size%22%3A40%2C%22order%22%3A5%2C%22titleid%22%3A8%7D%2C%22module%22%3A%22playlist.PlayListPlazaServer%22%7D%2C%22new_song%22%3A%7B%22module%22%3A%22newsong.NewSongServer%22%2C%22method%22%3A%22get_new_song_info%22%2C%22param%22%3A%7B%22type%22%3A5%7D%7D%2C%22new_album%22%3A%7B%22module%22%3A%22newalbum.NewAlbumServer%22%2C%22method%22%3A%22get_new_album_info%22%2C%22param%22%3A%7B%22area%22%3A1%2C%22sin%22%3A0%2C%22num%22%3A20%7D%7D%2C%22new_album_tag%22%3A%7B%22module%22%3A%22newalbum.NewAlbumServer%22%2C%22method%22%3A%22get_new_album_area%22%2C%22param%22%3A%7B%7D%7D%2C%22toplist%22%3A%7B%22module%22%3A%22musicToplist.ToplistInfoServer%22%2C%22method%22%3A%22GetAll%22%2C%22param%22%3A%7B%7D%7D%2C%22focus%22%3A%7B%22module%22%3A%22music.musicHall.MusicHallPlatform%22%2C%22method%22%3A%22GetFocus%22%2C%22param%22%3A%7B%7D%7D%7D'
            this.$api.getDataByUrl({getUrl: url}).then(({data}) => {
                const {new_song, new_album, new_album_tag, category, focus, playlist, recomPlaylist, toplist} = data
                //新歌首发 列表数据
                let newSongList = []
                //歌单推荐 列表数据
                let recomList = []
                new_song.data.songlist.forEach((item, index) => {
                    if (index % 9 === 0) {
                        newSongList.push([])
                    }
                    newSongList[parseInt(index / 9)].push(item)
                })
                recomPlaylist.data.v_hot.forEach((item,index) => {
                    if (index % 5 === 0) {
                        recomList.push([])
                    }
                    recomList[parseInt(index / 5)].push(item)
                })
                new_song.data.songlist = newSongList
                this.newSongInfo = new_song.data    //新歌首发
                this.currentNewSongPage = this.newSongInfo.songlist.length  //当前新歌页数
                this.recomPlayList = recomList  //歌单推荐
                this.recomSongPage = recomList.length   //歌单推荐页数

                this.newAlbumList = []
                new_album.data.albums.forEach((item, index) => {
                    if (index % 10 === 0) {
                        this.newAlbumList.push([])
                    }
                    this.newAlbumList[parseInt(index / 10)].push(item)
                })
                this.newAlbumType = new_album_tag.data.area
                this.currentNewAlbumPage = this.newAlbumList.length
                this.rankingList = toplist.data.group

                console.log(this.newAlbumList, '新碟推荐数据')
            })
        },
        searchNewSong (type) {
            this.currentNewSongIdx = 0
            this.$api.getNewSongList(type).then(({data}) => {
                const {new_song} = data
                let newSongList = []
                new_song.data.songlist.forEach((item, index) => {
                    if (index % 9 === 0) {
                        newSongList.push([])
                    }
                    newSongList[parseInt(index / 9)].push(item)
                })
                new_song.data.songlist = newSongList
                this.newSongInfo = new_song.data
                this.currentNewSongPage = this.newSongInfo.songlist.length
            })
        },
        searchRecomSong (type) {
            this.currentRecomSongIdx = 0
            this.currentRecomType = type
            this.$api.getRecomSongList(type).then(({data}) => {
                // console.log(res.data.recomPlaylist.data.v_hot, 'recomPalyList')
                let recomList = []
                let recomData = []
                if (type === 0) {
                    recomData = data.recomPlaylist.data.v_hot
                } else {
                    recomData = data.playlist.data.v_playlist
                }
                recomData.forEach((item,index) => {
                    if (index % 5 === 0) {
                        recomList.push([])
                    }
                    recomList[parseInt(index / 5)].push(item)
                })
                this.recomPlayList = recomList
                this.recomSongPage = recomList.length
            })
        },
        searchAlbumSong (type) {
            this.currentNewAlbumIdx = 0
            this.currentNewAlbumType = type
            this.$api.getAlbumSongList(type).then(({data}) => {
                this.newAlbumList = []
                data.new_album.data.albums.forEach((item, index) => {
                    if (index % 10 === 0) {
                        this.newAlbumList.push([])
                    }
                    this.newAlbumList[parseInt(index / 10)].push(item)
                })
                this.currentNewAlbumPage = this.newAlbumList.length
            })
        }
    },
    created() {
        this.initHomeData()
        this.getMusicList()
        this.loop()
        this.getMusicContent()
        this.getMVList('all')
    }
}
</script>

<style lang="less" scoped>
@blue: #23ade5;
@white: #EEF;
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
            width: 276px;
            height: 4px;
            top: 420px;
            left: 50%;
            margin-left: -128px;
            box-sizing: border-box;
            .choice-btn{
                display: inline-block;
                width: 22px;
                height: 4px;
                margin: 0 12px;
                border-radius: 4px;
                background-color: @white;
                cursor: pointer;
                transition: background-color .1s ease-in-out;
                vertical-align: top;
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
        .module-prev,.module-next{
            position: absolute;
            width: 70px;
            height:110px;
            top: 495px;
            margin-top: -40px;
            background: #AAAAAA url("../assets/image/prev.png")  center center/80% no-repeat;
            opacity: .4;
            cursor: pointer;
            z-index: 99;
            transition: top .2s ease-in-out;
            &:hover{
                opacity: .8;
            }
        }
        .module-prev{
            left: -70px;
        }
        .module-next{
            right: -70px;
            transform: rotate(180deg);
        }
        .play-song{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            margin: auto;
            background: #FFF url("../assets/image/cover_play.png") center center/100% no-repeat;
            border-radius: 50%;
            opacity: 0;
            z-index: 99;
            transition: opacity .2s ease-in-out;
        }
        .choice-btn-list{
            position: absolute;
            width: 100%;
            height: 30px;
            line-height: 30px;
            left: 0;
            bottom: 0;
            text-align: center;
            margin: 16px 0;
            >.choice-btn{
                display: inline-block;
                width: 10px;
                height: 10px;
                background-color: rgb(150, 195, 255);
                margin: 0 16px;
                border-radius: 5px;
                transition: background-color .1s ease-in-out;
                cursor: pointer;
            }
            .on{
                background-color: #1296ff;
            }
        }
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
        .module{
            position: relative;
            width: 100%;
            box-sizing: border-box;
            padding: 16px 0;
            overflow: hidden;
        }
        .current-module-bg{
            background-color: rgba(238, 238, 255, 0.6);
        }
        >.song-recom-module{
            height: 468px;
            >.recom-info{
                width: 1240px;
                height: 100%;
                margin: 0 auto;
                >.recom-title{
                    font-size: 32px;
                    text-align: center;
                    letter-spacing: 10px;
                }
                >.recom-tabs{
                    height: 26px;
                    line-height: 26px;
                    text-align: center;
                    margin: 22px 0;
                    >.recom-tab{
                        display: inline-block;
                        margin: 0 16px;
                        cursor: pointer;
                        &:hover{
                            color: #1296ff;
                        }
                    }
                    >.on{
                        color: #1296ff;
                    }
                }
                >.recom-content .recom-list{
                    display: flex;
                    justify-content: space-between;
                    align-content: space-between;
                    >.recom-card{
                        width: 235px;
                        height: 295px;
                        >span{
                            display: block;
                            height: 26px;
                            width: 90%;
                            line-height: 26px;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                            font-size: 14px;
                            cursor: pointer;
                        }
                        >.recom-card-cover{
                            position: relative;
                            width: 235px;
                            height: 235px;
                            cursor: pointer;
                            overflow: hidden;
                            >img{
                                transition: transform .2s ease-in-out;
                            }
                            &:hover{
                                >.cover-mask{
                                    opacity: 1;
                                }
                                >.recom-play{
                                    opacity: 1;
                                }
                                >img{
                                    transform: scale(1.1);
                                }
                            }
                            >.cover-mask{
                                position: absolute;
                                display: block;
                                width: 100%;
                                height: 100%;
                                top: 0;
                                left: 0;
                                background-color: rgba(0, 0, 0, .2);
                                opacity: 0;
                                transition: opacity .2s ease-in-out;
                            }
                            >.recom-play{
                                width: 80px;
                                height: 80px;
                            }
                        }
                        >.recom-card-title{
                            margin-top: 8px;
                            color: #222;
                            transition: color .2s ease;
                            &:hover{
                                color: #1296ff;
                            }
                        }
                        >.recom-play-count{
                            color: #999;
                        }
                    }
                }
                >.recom-btn-list{
                    .recom-btn{
                    }
                    .on{
                        background-color: #1296ff;
                    }
                }
            }
        }
        .new-song-module{
            height: 526px;
            >.song-info{
                height: 100%;
                width: 1240px;
                margin: 0 auto;
                >.song-title{
                    font-size: 32px;
                    text-align: center;
                    letter-spacing: 10px;
                }
                >.song-tabs{
                    height: 20px;
                    text-align: center;
                    margin: 22px 0;
                    >.song-tab{
                        display: inline-block;
                        margin: 0 16px;
                        transition: color .2s ease-in-out;
                        cursor: pointer;
                        &:hover{
                            color: #1296ff;
                        }
                    }
                    >.song-tab-on{
                        color: #1296ff;
                    }
                }
                >.song-content{
                    display: flex;
                    display: -webkit-flex;
                    justify-content: space-between;
                    align-content: space-between;
                    flex-flow: row wrap;
                    height: 332px;
                    overflow: hidden;
                    >.song-card{
                        display: flex;
                        align-content: space-between;
                        flex-direction: row;
                        width: 342px;
                        height: 102px;
                        background-color: rgba(255, 255, 255, .8);
                        box-sizing: border-box;
                        padding-bottom: 11px;
                        overflow: hidden;
                        border-bottom: 1px solid rgba(233, 233, 233, .8);
                        color: #888;
                        >.song-cover{
                            cursor: pointer;
                        }
                        .song-txt{
                            width: 202px;
                            height: 90px;
                            vertical-align: top;
                            font-size: 14px;
                            box-sizing: border-box;
                            padding: 26px 12px;
                            line-height: 19px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .song-time{
                            width: 50px;
                            height: 100%;
                            line-height: 90px;
                        }
                    }
                }
                >.song-btn-list{
                    .song-btn{
                    }
                    .on{
                        background-color: #1296ff;
                    }
                }
            }
        }
        .mv-module{
            height: 633px;
            .mv-title{
                .title{
                    font-size: 32px;
                    text-align: center;
                }
                .mv-type{
                    margin: 22px 0;
                    text-align: center;
                    >li{
                        display: inline-block;
                        margin: 0 16px;
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
                        >.mv-cover{
                            position: relative;
                            width: 224px;
                            height: 126px;
                            overflow: hidden;
                            cursor: pointer;
                            &:hover{
                                >img {
                                    transform: scale(1.1);
                                }
                                .play-mv{
                                    opacity: 1;
                                }
                            }
                            .play-mv{
                                width: 50px;
                                height: 50px;
                            }
                            >img{
                                transition: transform .2s ease-in-out;
                            }
                        }
                        .mv-author{
                            cursor: pointer;
                            &:hover{
                                color: #1296ff;
                            }
                        }
                        >.mv-title{
                            color: #000;
                            cursor: pointer;
                            margin-top: 8px;
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
                        background-color: #1296ff;
                    }
                }
            }
        }
        .new-album-module{
            height: 800px;
            .new-album-info{
                position: relative;
                width: 1240px;
                height: 100%;
                margin: 0 auto;
                .album-title{
                    font-size: 32px;
                    letter-spacing: 10px;
                    text-align: center;
                }
                .album-tabs{
                    margin: 22px 0;
                    text-align: center;
                    >.album-tab{
                        display: inline-block;
                        margin: 0 16px;
                        cursor: pointer;
                        &:hover{
                            color: #1296ff;
                        }
                    }
                    >.on{
                        color: #1296ff;
                    }
                }
                .album-content .album-list{
                    display: flex;
                    width: 100%;
                    height: 596px;
                    justify-content: space-between;
                    align-content: space-between;
                    flex-flow: wrap;
                    .album-card{
                        width: 224px;
                        height: 276px;
                        .album-cover{
                            position: relative;
                            width: 224px;
                            height: 224px;
                            overflow: hidden;
                            >img{
                                transition: transform .2s ease-in-out;
                            }
                            .album-play{
                                width: 60px;
                                height: 60px;
                            }
                            &:hover{
                                .album-play{
                                    opacity: 1;
                                }
                                >img{
                                    transform: scale(1.2);
                                }
                            }
                        }
                        >span{
                            display: block;
                            height: 26px;
                            line-height: 26px;
                            font-size: 14px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .album-card-title{
                            color: #222;
                            margin-top: 8px;
                            transition: color .2s ease-in-out;
                            cursor: pointer;
                            &:hover{
                                color: #1296ff;
                            }
                        }
                        .album-card-author{
                            color: #999;
                            transition: color .2s ease-in-out;
                            >i{
                                font-style: normal;
                                cursor: pointer;
                                &:hover{
                                    color: #23ade5;
                                }
                            }
                        }
                    }
                }
            }
        }
        >.ranking-module{
            height: 684px;
            padding: 16px 0 92px 0;
            >.ranking-info {
                width: 1240px;
                margin: 0 auto;
                >.ranking-title{
                    font-size: 32px;
                    text-align: center;
                    margin: 12px 0 22px 0;
                    letter-spacing: 10px;
                }
                >.ranking-list{
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                    flex-flow: nowrap row;
                    color: #FFF;
                    >.ranking-card{
                        width: 224px;
                        height: 500px;
                        background-color: #FFF;
                        background-repeat: no-repeat;
                        background-size: cover;
                        background-image: url("../assets/image/bg_index_top.jpg");
                        box-sizing: border-box;
                        padding: 60px 24px;
                        &:hover{
                            .ranking-card-play{
                                .card-play-btn{
                                    transform: rotateX(0deg);
                                }
                            }
                        }
                        .ranking-card-title{
                            text-align: center;
                            >.card-title1{
                                font-size: 24px;
                                font-weight: 300;
                            }
                            >.card-title2{
                                font-size: 28px;
                                cursor: pointer;
                                margin-top: 6px;
                            }
                        }
                        .ranking-card-play{
                            text-align: center;
                            margin: 12px 0;
                            >.card-play-btn{
                                display: inline-block;
                                width: 48px;
                                height: 48px;
                                background: transparent url(../assets/image/cover_play.png) center center/contain no-repeat;
                                transition: transform .5s ease-in-out;
                                transform: rotateX(87deg);
                                cursor: pointer;
                            }
                        }
                        .ranking-card-ul .ranking-card-list{
                            height: 178px;
                            >.card-list-item{
                                position: relative;
                                height: 66px;
                                margin-top: 8px;
                                >.num{
                                    position: absolute;
                                    font-style: normal;
                                    font-family: poppin,Tahoma,Arial,\5FAE\8F6F\96C5\9ED1,sans-serif;
                                    top: 0;
                                    left: 0;
                                    font-size: 14px;
                                }
                                >.item-txt{
                                    width: 139px;
                                    font-size: 14px;
                                    line-height: 1.5;
                                    margin-left: 14px;
                                    >span{
                                        display: block;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                        cursor: pointer;
                                    }
                                }
                            }
                        }
                    }
                    .card-bg-1{
                        background-position: 0 0;
                    }
                    .card-bg-2{
                        background-position: -224px 0;
                    }
                    .card-bg-3{
                        background-position: -448px 0;
                    }
                    .card-bg-4{
                        background-position: -672px 0;
                    }
                    .card-bg-5{
                        background-position: -896px 0;
                    }
                }
            }
        }
    }
    .home-footer{
        width: 100%;
        height: 260px;
        background-color: #333333;
        box-sizing: border-box;
        padding-top: 30px;
        .footer-info{
            width: 1240px;
            height: 100%;
            color: #999;
            margin: 0 auto;
            .footer-download{
                position: relative;
                height: 100px;
                margin: 30px 0;
                .download-title{
                    font-size: 16px;
                }
                .download-ul{
                    height: 80px;
                    >.download-item{
                        display: inline-block;
                        height: 100%;
                        vertical-align: middle;
                        >.icon{
                            display: inline-block;
                            width: 37px;
                            height: 48px;
                            background: transparent url(../assets/image/footer.png) no-repeat;
                        }
                        .win-icon{
                            background-position:  -2px 0;
                            &:hover{
                                background-position:  -2px -49px;
                            }
                        }
                        /*
                            win:hover y -50px
                            mac:
                            mac:hover
                        */
                    }
                }
            }
            >.footer-nav{
                width: 100%;
                height: 16px;
                >.footer-nav-ul{
                    width: 100%;
                    text-align: center;
                    font-size: 12px;
                    line-height: 1.5;
                    >.nav-item{
                        display: inline-block;
                        >a{
                            color: #999999;
                            &:hover{
                                color: #FFF;
                                text-decoration: underline;
                            }
                        }
                    }
                }
            }
            >.copy-right{
                height: 40px;
                text-align: center  ;
                font-size: 12px;
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
