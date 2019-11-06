<template>
  <div v-once>
    <div ref="liveContainer">
      <div class="poke-ball poke-ball-hide" ref="PokeBall" @click="callWifeBack">
        <p ref="wifeMsg" class="wife-msg"></p>
        <img src="../public/img/poke_ball.gif">
      </div>
      <div class="wife" ref="wife" @mousedown="press" @mouseup="loosen" @mousemove="move">
        <div class="wife-tips" style="opacity:0"></div>
        <canvas id="live2d" width="300" height="280" class="live2d"></canvas>
        <div class="tool-bar">
          <ul>
            <li class="tool-bar-item" v-for="item in tipsList" :key="item.id" @click="clickTool(item.id)"
                @mouseenter="setClothesTips(item.id)"
                @mouseleave="setClothesTips(item.id)">
              <font-awesome-icon class="font-icon" :icon="item.icon" size="xs"/>
              <ul class="switch-music" v-if="item.icon.includes('music')">
                <li class="music-input">
                  <input type="url" v-model.trim="musicUrl" placeholder="  qq音乐或网易云歌单链接">
                  <input type="button" @click="switchMusic(musicUrl)" value="确认">
                </li>
                <li v-for="(item,i) in musicList" :key="i" @click="switchMusic(item.url)">{{item.title}}</li>
              </ul>
              <span ref="tipsText" class="tool-tips">{{item.tips}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <canvas class="fireworks" style="position:fixed;left:0;top:0;z-index:88;pointer-events:none;"></canvas>
    <!--引入点击网页canvas爆炸动画特效js-->
    <script v-pre type="text/javascript" src="/lib/bomb.js"></script>
    <script v-pre defer src="/live2dModels/live2d/js/live2d.js"></script>
    <script v-pre async="" defer src="/live2dModels/live2d/js/wife.js"></script>
    <!--<script v-pre type="text/javascript" charset="utf-8" async="" defer src="/lib/L2Dwidget.min.js"></script>-->
    <!--<script v-pre type="text/javascript" charset="utf-8" async="" defer src="/lib/L2Dwidget.0.min.js"></script>-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        timerId: null,
        msgTimer: null,//老婆快离开时消息定时器
        moveElem: null,//被拖拽的容器
        dragging: false,//是否正在拖拽中
        tLeft: 0,//拖拽时距离左边的距离
        tTop: 0,//拖拽时距离顶部边的距离
        animaCount: 0,//记录老婆离开时发信息的动画次数
        doAnimation: null,//监听老婆离开时发信息动画结束事件
        tiaIndex: 0,
        oldModelNum: 0,
        musicUrl: "",
        musicList: [{
          title: "珍爱日漫集",
          url: "https://y.qq.com/n/yqq/playlist/2949360967.html"
        }, {
          title: "国语经典与心共鸣",
          url: "https://y.qq.com/n/yqq/playlist/2949821647.html"
        }, {
          title: "游戏党必备",
          url: "https://y.qq.com/n/yqq/playlist/2949361041.html"
        }, {
          title: "经典粤语金曲",
          url: "https://y.qq.com/n/yqq/playlist/2949823435.html"
        }, {
          title: "能拨动心弦的轻音乐",
          url: "https://y.qq.com/n/yqq/playlist/2949360725.html"
        }, {
          title: "欧美抖腿系列",
          url: "https://y.qq.com/n/yqq/playlist/2949811232.html"
        },],
        wifeMsg: [
          '哼！竟然敢屏蔽我',
          '我真的生气了！快点来哄我~~',
          '呜呜~为什么还不肯见我？一定是我哪里做的不够好···',
          '哼哼，其实一个人在这里呆着也挺好的，啦啦啦~',
          '啊~好无聊啊！为什么你还不来找我~',
          '你一定是不爱我了~~再见！',
        ],
        animationList: ['fadeInLeft', 'lightSpeedIn', 'zoomIn', 'swing', 'heartBeat', 'wobble'],
        personModel: '/live2dModels/live2d/model/kesshouban/model.json',
        basePath: '/live2dModels/live2d/model/',
        modelPaths: [],
        tipsList: [
          {id: 1, icon: ['fab', 'github'], tips: 'github'},
          {id: 2, icon: ['fas', 'music'], tips: '切换歌单'},
          {id: 3, icon: ['fas', 'exchange-alt'], tips: '换人'},
          {id: 4, icon: ['fas', 'tshirt'], tips: '换装'},
          {id: 5, icon: ['fas', 'power-off'], tips: '关闭'},
        ]
      }
    },
    created() {
      this.modelPaths = [`${this.basePath}kesshouban/model.json`,
        `${this.basePath}tia/model4.json`,
        `${this.basePath}ShizukuTalk/shizuku-48/index.json`,
        `${this.basePath}HyperdimensionNeptunia/blanc_classic/index.json`,
        // `${this.basePath}HyperdimensionNeptunia/histoire/index.json`,
        `${this.basePath}HyperdimensionNeptunia/histoirenohover/index.json`,
        `${this.basePath}HyperdimensionNeptunia/nepgear_default/index.json`,
        `${this.basePath}HyperdimensionNeptunia/noir_default/index.json`,
        `${this.basePath}HyperdimensionNeptunia/vert_classic/index.json`,
        `${this.basePath}umaru/13.json`,
        `${this.basePath}violet/14.json`,
        `${this.basePath}miku/15.json`,
        `${this.basePath}tamamo/16.json`,
        `${this.basePath}nero/17.json`,
        `${this.basePath}murakumo/index.json`,
        `${this.basePath}pio/0.json`,
        `${this.basePath}z16/z16.model.json`,
        `${this.basePath}epsilon/Epsilon2.1.model.json`,
        `${this.basePath}remu/rem.json`,
        `${this.basePath}22/0.json`,
        `${this.basePath}33/0.json`,]
    },
    mounted() {
      this.moveElem = this.$refs.wife
      //页面加载完，默认显示第一个live2d看板娘
      window.addEventListener('load', () => {
        loadlive2d("live2d", this.personModel = this.modelPaths[this.oldModelNum])
      })
    },
    methods: {
      clickTool(id) {
        switch (id) {
          case 1:
            window.open('https://github.com/lsh-blog')
            break
          case 3:
            this.switchModel()
            break
          case 4:
            this.switchClothes()
            break
          case 5:
            this.$refs.wife.style.display = 'none' //隐藏看板娘
            console.log('你。。好狠心！再见~~')
            this.$refs.PokeBall.classList.remove('poke-ball-hide', 'animated', 'fadeOutUp')
            this.$refs.PokeBall.classList.add('poke-ball-show', 'animated', 'bounceInDown')
            let i = 0 //记录wifeMsg的索引值
            this.animaCount = 0//记录动画执行次数，以便做不同动画
            this.$refs.wifeMsg.classList.add('animated', this.animationList[0])
            this.$refs.wifeMsg.innerText = this.wifeMsg[i++]
            this.doAnimation = () => {//清除动画
              if (this.animaCount >= this.animationList.length) this.animaCount = 0
              this.$refs.wifeMsg.classList.remove(this.animationList[this.animaCount])
              // console.count(this.animationList[this.animaCount])
              this.animaCount++
            }
            this.msgTimer = setInterval(() => {//启动老婆叨唠发信息定时器
              if (i > this.wifeMsg.length - 1) {
                clearInterval(this.msgTimer)
                //获取组件根节点
                let node = this.$refs.liveContainer
                //移除所有子节点
                while (node.hasChildNodes()) {
                  node.removeChild(node.lastChild);
                }
                //加载我的女神
                // L2Dwidget.init()
              } else {
                //给消息添加动画
                this.$refs.wifeMsg.classList.add(this.animationList[this.animaCount] || 'fadeIn')
                this.$refs.wifeMsg.innerText = this.wifeMsg[i++]
              }
            }, 3000)
            this.$refs.wifeMsg.addEventListener('animationend', this.doAnimation)
            break
        }
      },
      //切换歌单
      switchMusic(url) {
        this.$nextTick(() => {
          if (url.trim() == "" || url.indexOf("http") == -1) {
            return alert("请输入有效的歌单链接")
          }
          let meting = document.querySelector("meting-js")
          // while (meting.hasChildNodes()) {
          //   meting.removeChild(meting.lastChild);
          // }
          meting.setAttribute("auto", url)
          document.body.appendChild(meting)
        })
      },
      setClothesTips(id) {
        var e = window.event || arguments.callee.caller.arguments[0]
        if (id == 4) {
          if (e.type == 'mouseleave') {
            this.$refs.tipsText[3].innerText = '换装'
          } else if (e.type == 'mouseenter') {
            let tips = this.$refs.tipsText[3]
            if (this.personModel.indexOf('tia') > 0) {
              tips.innerText = '换装(共4套)'
              return
            } else if (this.personModel.indexOf('pio') > 0) {
              tips.innerText = '换装(共50套)'
              return
            } else if (this.personModel.indexOf('22') > 0) {
              tips.innerText = '换装(共18套)'
            } else if (this.personModel.indexOf('33') > 0) {
              tips.innerText = '换装(共18套)'
            } else if (this.personModel.indexOf('shizuku') > 0) {
              tips.innerText = '换装(共2套)'
            }else if (this.personModel.indexOf('blanc') > 0) {
              tips.innerText = '换装(共3套)'
            }else if (this.personModel.indexOf('HyperdimensionNeptunia/nep') > 0) {
              tips.innerText = '换装(共6套)'
            }else if (this.personModel.indexOf('noir') > 0) {
              tips.innerText = '换装(共4套)'
            }else if (this.personModel.indexOf('vert') > 0) {
              tips.innerText = '换装(共3套)'
            }else {
              tips.innerText = '换装(无服装)'
            }
          }
        }
      },
      switchClothes() {//切换服装
        if (this.personModel.indexOf('tia') > 0) {
          this.tiaIndex++
          if (this.tiaIndex > 3) {
            this.tiaIndex = 0
          }
          loadlive2d("live2d", '/live2dModels/live2d/model/tia/model' + this.tiaIndex + '.json')
        } else if (this.personModel.indexOf('pio') > 0) {
          loadlive2d("live2d", '/live2dModels/live2d/model/pio/' + Math.floor(Math.random() * 50) + '.json')
        } else if (this.personModel.indexOf('22') > 0) {
          loadlive2d("live2d", '/live2dModels/live2d/model/22/' + Math.floor(Math.random() * 18) + '.json')
        }else if (this.personModel.indexOf('33') > 0) {
          loadlive2d("live2d", '/live2dModels/live2d/model/33/' + Math.floor(Math.random() * 18) + '.json')
        }else if (this.personModel.indexOf('shizuku') > 0) {
          if (this.personModel.indexOf('shizuku-pajama') !== -1) {
            this.personModel = '/live2dModels/live2d/model/ShizukuTalk/shizuku-48/index.json'
            loadlive2d("live2d", '/live2dModels/live2d/model/ShizukuTalk/shizuku-48/index.json')
          }else {
            this.personModel = '/live2dModels/live2d/model/ShizukuTalk/shizuku-pajama/index.json'
            loadlive2d("live2d", '/live2dModels/live2d/model/ShizukuTalk/shizuku-pajama/index.json')
          }
        }else if (this.personModel.indexOf('blanc') > 0) {
          if (this.personModel.indexOf('blanc_normal') !== -1) {
            this.personModel = '/live2dModels/live2d/model/HyperdimensionNeptunia/blanc_swimwear/index.json'
            loadlive2d("live2d", '/live2dModels/live2d/model/HyperdimensionNeptunia/blanc_swimwear/index.json')
          }else if (this.personModel.indexOf('blanc_classic') !== -1) {
            this.personModel = '/live2dModels/live2d/model/HyperdimensionNeptunia/blanc_normal/index.json'
            loadlive2d("live2d", '/live2dModels/live2d/model/HyperdimensionNeptunia/blanc_normal/index.json')
          }else {
            this.personModel = '/live2dModels/live2d/model/HyperdimensionNeptunia/blanc_classic/index.json'
            loadlive2d("live2d", '/live2dModels/live2d/model/HyperdimensionNeptunia/blanc_classic/index.json')
          }
        }else if (this.personModel.indexOf('vert') > 0) {
          if (this.personModel.indexOf('vert_classic') !== -1) {
            this.personModel = '/live2dModels/live2d/model/HyperdimensionNeptunia/vert_normal/index.json'
            loadlive2d("live2d", '/live2dModels/live2d/model/HyperdimensionNeptunia/vert_normal/index.json')
          }else if (this.personModel.indexOf('vert_normal') !== -1) {
            this.personModel = '/live2dModels/live2d/model/HyperdimensionNeptunia/vert_swimwear/index.json'
            loadlive2d("live2d", '/live2dModels/live2d/model/HyperdimensionNeptunia/vert_swimwear/index.json')
          }else {
            this.personModel = '/live2dModels/live2d/model/HyperdimensionNeptunia/vert_classic/index.json'
            loadlive2d("live2d", '/live2dModels/live2d/model/HyperdimensionNeptunia/vert_classic/index.json')
          }
        }else if (this.personModel.indexOf('noir') > 0) {
          if (this.personModel.indexOf('noir_default') !== -1) {
            this.personModel = '/live2dModels/live2d/model/HyperdimensionNeptunia/noir_classic/index.json'
            loadlive2d("live2d", '/live2dModels/live2d/model/HyperdimensionNeptunia/noir_classic/index.json')
          }else if (this.personModel.indexOf('noir_classic') !== -1) {
            this.personModel = '/live2dModels/live2d/model/HyperdimensionNeptunia/noir_santa/index.json'
            loadlive2d("live2d", '/live2dModels/live2d/model/HyperdimensionNeptunia/noir_santa/index.json')
          }else if (this.personModel.indexOf('noir_santa') !== -1) {
            this.personModel = '/live2dModels/live2d/model/HyperdimensionNeptunia/noireswim/index.json'
            loadlive2d("live2d", '/live2dModels/live2d/model/HyperdimensionNeptunia/noireswim/index.json')
          }else {
            this.personModel = '/live2dModels/live2d/model/HyperdimensionNeptunia/noir_default/index.json'
            loadlive2d("live2d", '/live2dModels/live2d/model/HyperdimensionNeptunia/noir_default/index.json')
          }
        }else if (this.personModel.indexOf('HyperdimensionNeptunia/nep') > 0) {
          if (this.personModel.indexOf('nepgear_default') !== -1) {
            this.personModel = '/live2dModels/live2d/model/HyperdimensionNeptunia/nepgear_extra/index.json'
            loadlive2d("live2d", '/live2dModels/live2d/model/HyperdimensionNeptunia/nepgear_extra/index.json')
          }else if (this.personModel.indexOf('nepgear_extra') !== -1) {
            this.personModel = '/live2dModels/live2d/model/HyperdimensionNeptunia/nepgearswim/index.json'
            loadlive2d("live2d", '/live2dModels/live2d/model/HyperdimensionNeptunia/nepgearswim/index.json')
          }else if (this.personModel.indexOf('nepgearswim') !== -1) {
            this.personModel = '/live2dModels/live2d/model/HyperdimensionNeptunia/nepmaid/index.json'
            loadlive2d("live2d", '/live2dModels/live2d/model/HyperdimensionNeptunia/nepmaid/index.json')
          }else if (this.personModel.indexOf('nepmaid') !== -1) {
            this.personModel = '/live2dModels/live2d/model/HyperdimensionNeptunia/nepnep/index.json'
            loadlive2d("live2d", '/live2dModels/live2d/model/HyperdimensionNeptunia/nepnep/index.json')
          }else if (this.personModel.indexOf('nepnep') !== -1) {
            this.personModel = '/live2dModels/live2d/model/HyperdimensionNeptunia/nepswim/index.json'
            loadlive2d("live2d", '/live2dModels/live2d/model/HyperdimensionNeptunia/nepswim/index.json')
          }else if (this.personModel.indexOf('nepswim') !== -1) {
            this.personModel = '/live2dModels/live2d/model/HyperdimensionNeptunia/neptune_classic/index.json'
            loadlive2d("live2d", '/live2dModels/live2d/model/HyperdimensionNeptunia/neptune_classic/index.json')
          }else if (this.personModel.indexOf('neptune_classic') !== -1) {
            this.personModel = '/live2dModels/live2d/model/HyperdimensionNeptunia/neptune_santa/index.json'
            loadlive2d("live2d", '/live2dModels/live2d/model/HyperdimensionNeptunia/neptune_santa/index.json')
          }else {
            this.personModel = '/live2dModels/live2d/model/HyperdimensionNeptunia/nepgear_default/index.json'
            loadlive2d("live2d", '/live2dModels/live2d/model/HyperdimensionNeptunia/nepgear_default/index.json')
          }
        }else {
          console.log('不好意思！该老婆没有衣服可换了，因为鹅没钱给心爱的老婆买衣服了')
        }
      },
      switchModel() { //切换人物模型
        let total = this.modelPaths.length //总的人物模型数量
        let newModelNum = Math.floor(Math.random() * total) //新的随机索引
        if (this.oldModelNum == newModelNum) {
          newModelNum = newModelNum == total - 1 ? newModelNum - 1 : (newModelNum == 0 ? newModelNum + 1 : newModelNum + 1)
          if (newModelNum > total - 1 || newModelNum < 0) {
            newModelNum = Math.floor(Math.random() * total)
          }
        }
        this.oldModelNum = newModelNum
        this.personModel = this.modelPaths[newModelNum]

        loadlive2d("live2d", this.modelPaths[newModelNum])
      },
      callWifeBack() {//点击精灵球召唤老婆
        clearInterval(this.msgTimer)
        this.$refs.wife.style.display = 'block'
        console.log('哼！知道错了吧！我又回来了~~')
        removeEventListener('animationend', this.doAnimation)
        this.$refs.wifeMsg.classList.remove(this.animationList[this.animaCount] || 'fadeIn')
        this.$refs.PokeBall.classList.remove('poke-ball-show', 'animated', 'bounceInDown')
        this.$refs.PokeBall.classList.add('poke-ball-hide', 'animated', 'fadeOutUp')
      },
      press(e) {//鼠标按下
        let timeStart = new Date().getTime()
        let moveElemRect = this.moveElem.getBoundingClientRect();
        let timeEnd = 0
        this.timerId = setInterval(() => {
          timeEnd = new Date().getTime()
          if (timeEnd - timeStart > 1200) {
            clearInterval(this.timerId)
            this.moveElem.style.cursor = 'all-scroll'
          }
        }, 200)
        this.dragging = true; //激活拖拽状态
        this.tLeft = e.clientX - moveElemRect.left; //鼠标按下时和选中元素的坐标偏移:x坐标
        this.tTop = e.clientY - moveElemRect.top; //鼠标按下时和选中元素的坐标偏移:y坐标
      },
      loosen() {//鼠标松开
        this.dragging = false;
        clearInterval(this.timerId)
        this.moveElem.style.cursor = 'grab'
      },
      move(e) {//鼠标移动
        if (this.dragging) {
          let moveX = e.clientX - this.tLeft,
            moveY = e.clientY - this.tTop;
          this.moveElem.style.left = moveX + 'px';
          this.moveElem.style.top = moveY + 'px';
          this.moveElem.style.bottom = 'unset';
          this.moveElem.style.right = 'unset';
        }
      }
    }
  }
</script>


<style src="../public/live2dModels/live2d/css/wife.css" scoped></style>
<style lang="stylus" scoped>
  .tool-bar-item {
    .switch-music {
      display none;
      position absolute;
      bottom 0
      right 100%
      padding 0
      margin 0
      background-color rgba(255, 255, 255, .7)
      box-shadow 0 0 3px rgba(0, 0, 0, .6)
      border-radius 5px
      overflow hidden

      .music-input {
        display flex
        padding 0
        margin 0
        width 100%

        input {
          outline none
          border none
          font-size 8px
          line-height 24px
        }

        input[type="url"] {
          flex 3
        }

        input[type="button"] {
          flex 1
          background-color skyblue

          &:hover {
            cursor pointer
          }
        }
      }

      li {
        display block
        padding 5px
        width 100%
        min-width 120px
        font-size 12px
        text-overflow ellipsis
        white-space nowrap
        overflow hidden
      }

      li:hover {
        background-color #1fb554
        color white
      }
    }

    &:hover .switch-music {
      display block;
    }
  }
</style>
