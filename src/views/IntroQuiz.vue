<template>
  <div>
    <div class="container" v-if="start">
      <div>
        <img src="../assets/intoro-app.png" class="intro-ap slideInRight" />
      </div>
      <p class="gametitle slideInRight main">with everyone</p>

      <img src="../assets/singer-re-don.png" class="singer-re" />
      <img src="../assets/singer-don.png" class="singer" />

      <div>
        <button v-on:click="getContents()">{{ buttonName }}</button>
        <h2 class="start-name slideInRight">{{ startName }}</h2>
      </div>
    </div>
    <div class="container" v-show="question_Area">
      <h2 class="question-text">Listen Carefully</h2>
      <img src="../assets/saiseigamen.png" class="saisei-img" />
      <div>
        <input v-model="answerText" type="text" placeholder="Answer" />
      </div>
      <div>
        <button v-on:click="checkAnswer()">回答</button>
      </div>
    </div>
    <div class="container" v-if="correct_Area">
      <div class="game-correct">
        <h1>{{ correct }}</h1>
        <h1>
          {{ this.audioEle[this.num].singer }}「<a
            v-bind:href="this.audioEle[this.num].mv"
            >{{ this.audioEle[this.num].title }}</a
          >」
        </h1>
      </div>
      <img v-bind:src="this.audioEle[this.num].url" />
      <img src="../assets/character3.png" alt="" />
      <div>
        <button v-on:click="getContents()">Next</button>
        <button v-on:click="reset">RESET</button>
      </div>
    </div>

    <div class="container" v-if="incorrect_Area">
      <div class="answer-box">
        <h1>{{ incorrect }}</h1>
        <h1>
          {{ this.audioEle[this.num].singer }}「<a
            v-bind:href="this.audioEle[this.num].mv"
            >{{ this.audioEle[this.num].title }}</a
          >」
        </h1>
      </div>

      <img v-bind:src="this.audioEle[this.num].url" />
      <img src="../assets/character4.png" alt="" />
      <div>
        <button v-on:click="getContents()">Next</button>
        <button v-on:click="reset">RESET</button>
      </div>
    </div>
  </div>
</template>

<script>
import confetti from "canvas-confetti"
export default {
  data: function () {
    return {
      start: true,
      answerText: "",
      buttonCount: 0,
      checkCount: 0,
      startName: "Press the button to start!!",
      buttonName: "Music Start!!",
      audio: new Audio(),
      buttonaudio: new Audio(),
      audioEle: [
        {
          title: "Shape of You",
          singer: "Ed Sheeran",
          sound: "./Shape of You.mp3",
          url: "https://images-fe.ssl-images-amazon.com/images/I/51inO4DBH0L._SY445_SX342_QL70_ML2_.jpg",
          mv: "https://youtu.be/JGwWNGJdvx8",
        },
        {
          title: "はしりがき",
          singer: "マカロニエンピツ",
          sound: "./はしりがき.mp3",
          url: "https://img.hmv.co.jp/image/jacket/400/0000116/6/3/745.jpg",
          mv: "https://youtu.be/G-fvkUwK-Wo",
        },
        {
          title: "Slow & Easy",
          singer: "平井大",
          sound: "./SlowEasy.mp3",
          url: "https://images-na.ssl-images-amazon.com/images/I/51S9KQubcdL._AC_SY450_.jpg",
          mv: "https://youtu.be/1mz-A--mANU",
        },
        {
          title: "女々しくて",
          singer: "ゴールデンボンバー",
          sound: "./女々しくて.mp3",
          url: "https://hominis.media/2019/07/images/GOLDENBOMBER.jpg",
          mv: "https://youtu.be/BC9P3DSZu0A",
        },
        {
          title: "Butter",
          singer: "BTS",
          sound: "./Butter.mp3",
          url: "https://amd-pctr.c.yimg.jp/r/iwiz-amd/20210704-00010008-realsound-000-1-view.jpg",
          mv: "https://youtu.be/WMweEpGlu_U",
        },
        {
          title: "桜坂",
          singer: "福山雅治",
          sound: "./桜坂.mp3",
          url: "https://image.entertainment-topics.jp/article/original/18122.jpg",
          mv: "https://youtu.be/AGYJ6jeu3p8",
        },
        {
          title: "ワタリドリ",
          singer: "Alesandros",
          sound: "./ワタリドリ.mp3",
          url: "http://simg.mysound.jp/img/disc/036/120_UPCH-2036.jpg",
          mv: "https://youtu.be/O_DLtVuiqhI",
        },
        {
          title: "366日",
          singer: "HY",
          sound: "./366日.mp3",
          url: "https://contents.oricon.co.jp/upimg/news/20110207/84601_201102070088855001297066307c.jpg",
          mv: "https://youtu.be/uA1ik3c1J1Q",
        },
        {
          title: "U.S.A.",
          singer: "DA PUMP",
          sound: "./U.S.A..mp3",
          url: "https://images-na.ssl-images-amazon.com/images/I/815E90AuAbL._AC_SL1417_.jpg",
          mv: "https://youtu.be/sr--GVIoluU",
        },
        {
          title: "ハナミズキ",
          singer: "一青窈",
          sound: "./ハナミズキ.mp3",
          url: "https://images-na.ssl-images-amazon.com/images/I/61JLycqW00L._AC_SX355_.jpg",
          mv: "https://youtu.be/TngUo1gDNOg",
        },
        {
          title: "全力少年",
          singer: "スキマスイッチ",
          sound: "./全力少年.mp3",
          url: "https://images-na.ssl-images-amazon.com/images/I/61NSjnNSyjL._AC_.jpg",
          mv: "https://youtu.be/IvDTkTKi5pA",
        },
        {
          title: "今夜このまま",
          singer: "あいみょん",
          sound: "./今夜このまま.mp3",
          url: "https://images-na.ssl-images-amazon.com/images/I/819is9URLVL._AC_SL1500_.jpg",
          mv: "https://youtu.be/mH6LoI63buY",
        },
        {
          title: "勿忘",
          singer: "Awesome City Club",
          sound: "./勿忘.mp3",
          url: "https://images-na.ssl-images-amazon.com/images/I/51yBSgpPA1L._AC_.jpg",
          mv: "https://youtu.be/zkZARKFuzNQ",
        },
        {
          title: "Wasted Nights",
          singer: "ONE OK ROCK",
          sound: "./WastedNights.mp3",
          url: "https://m.media-amazon.com/images/I/81ycP5Vn34L._SS500_.jpg",
          mv: "https://youtu.be/b4YLo74OWfY",
        },
        {
          title: "Lovers Again",
          singer: "EXILE",
          sound: "./Lovers Again.mp3",
          url: "https://images-na.ssl-images-amazon.com/images/I/71b7oFyXz4L._AC_SL1091_.jpg",
          mv: "https://youtu.be/PUdrCJSly_A",
        },
        {
          title: "シンクロニシティ",
          singer: "乃木坂46",
          sound: "./シンクロニシティ.mp3",
          url: "https://m.media-amazon.com/images/I/81OpmuY0R1L._SS500_.jpg",
          mv: "https://youtu.be/f0wbnQw89J0",
        },
        {
          title: "ヒカリへ",
          singer: "miwa",
          sound: "./ヒカリへ.mp3",
          url: "https://images-na.ssl-images-amazon.com/images/I/61CfwEm1lgL._AC_SX425_.jpg",
          mv: "https://youtu.be/aRyjZa89g4o",
        },
        {
          title: "Sparkle",
          singer: "RADWIMPS",
          sound: "./Sparkle.mp3",
          url: "https://i1.sndcdn.com/artworks-000533563956-xnhu01-t500x500.jpg",
          mv: "https://youtu.be/tpH8TEkKQI4",
        },
        {
          title: "クリスマスソング",
          singer: "back number",
          sound: "./クリスマスソング.mp3",
          url: "https://images-na.ssl-images-amazon.com/images/I/616ZobZ2Z7L._AC_SY355_.jpg",
          mv: "https://youtu.be/7zBeQezaz4U",
        },
      ],
      gameaudio: { button: "./決定.mp3" },
      correct: "",
      incorrect: "",
      songtitle: "",
      num: 0,
      question_Area: false,
      correct_Area: false,
      incorrect_Area: false,
      answer_button: false,
      answer_Area: false,
      song_title: false,
      song_img: false,

      // title:"",
    }
  },
  // created() {
  //   this.audio.pause()
  //   this.audio.currentTime = 0
  // },
  beforeDestroy() {
    this.audio.pause()
    this.audio.currentTime = 0
  },
  methods: {
    getContents: function () {
      this.buttonaudio.src = this.gameaudio.button
      this.buttonaudio.play()
      this.start = false
      this.buttonCount++
      this.song_img = true

      this.answerText = ""
      this.question_Area = true
      this.answer_button = true
      this.answer_Area = true
      if (this.buttonCount >= 1) {
        this.checkCount = 0
        this.correct = ""
        this.incorrect = ""
        this.songtitle = ""
        this.correct_Area = false
        this.incorrect_Area = false
        this.audio.pause()
        this.audio.currentTime = 0
        this.audio.loop = true
        this.num = Math.floor(Math.random() * this.audioEle.length)
        this.audio.src = this.audioEle[this.num].sound
        this.audio.play()
      } else {
        this.num = Math.floor(Math.random() * this.audioEle.length)

        this.audio.src = this.audioEle[this.num].sound
        this.audio.play()
        this.audio.loop = true
      }
    },

    checkAnswer: function () {
      this.checkCount++
      this.question_Area = false
      if (this.answerText == this.audioEle[this.num].title) {
        // alert("正解")

        this.correct_Area = true
        this.correct = "正解！素晴らしい！"
        confetti({
          particleCount: 400,
          spread: 90,
          origin: { y: 0.4 },
        })
      } else {
        // alert("不正解")
        this.incorrect_Area = true
        this.incorrect = "残念！不正解！"
      }
      if (this.checkCount > 1) {
        this.incorrect = ""
      }
    },
    reset: function () {
      this.audio.pause()
      this.audio.currentTime = 0
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
    },
  },
}
</script>

<style scoped>
.container {
  position: relative;
  min-height: 100vh;
  background-image: url("../assets/background-don.png");
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
  width: 100%;
  height: 50vh;
}
.intro-ap {
  width: 40%;
  margin-top: 30px;
}
.gametitle {
  font-size: 30px;
  font-weight: bold;
  font-family: "DotGothic16", sans-serif;
}
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(150px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.slideInRight {
  animation-name: slideInRight;
  animation-duration: 1s;
  animation-timing-function: ease-out;
}
.start-name {
  margin-top: 60px;
  font-size: 30px;
}
.singer-re {
  position: absolute;
  top: 160px;
  left: 45px;
  width: 25%;
}
.singer {
  position: absolute;
  top: 160px;
  right: 45px;
  width: 25%;
}
.chara img {
  width: 500px;
  height: auto;
}
img {
  width: 400px;
  height: auto;
}
.saisei-img {
  position: relative;
  width: 50%;
}
.question-text {
  font-size: 80px;
}
.main {
  color: coral;
}
.question {
  display: inline-block;
  height: 100%;
  background-image: url(../assets/saiseigamen.png);
  border: solid 2px black;
  margin-top: 20px;
  padding: 20px;
}
h1 {
  color: coral;
  font-family: "DotGothic16", sans-serif;
}
h2 {
  color: coral;
  font-family: "DotGothic16", sans-serif;
}
button {
  background-color: #333;
  color: #fff;
}

button:hover {
  background-color: #59b1eb;
}
.answer-box {
  background: black;
  border-radius: 20px;
  padding: 20px;
}
.game-correct {
  text-align: center;
  background: rgba(255, 255, 255, 0.747);
  border-radius: 20px;
}
input {
  position: relative;
  width: 50%;
  color: black;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  font-family: "Viaoda Libre", cursive;
}

.answer_size {
  padding-top: 20px;
  padding-bottom: 20px;
}

.answer_area {
  display: inline-block;
  border: solid 2px black;
  width: 100%;
  height: 100%;
}
</style>
