<template>
  <div id="app">
    <div class="main">
      <div class="container" v-if="!gameEnd">
        <div v-if="!start">
          <div>
            <img src="../assets/title-Time.png" class="intr-app slideInRight" />
          </div>
          <h1 class="slideInRight">VS everyone</h1>
          <img src="../assets/dj-don.png" class="start-img" />
          <img src="../assets/dj-don-re.png" class="start-re-img" />
          <button v-on:click="getContent">START</button>
          <p class="starttext slideInRight">
            Penalty <span>10</span> seconds per mistake
          </p>
          <div>
            <router-link to="/Ranking"
              ><button v-on:click="btnsound0">
                <img
                  src="../assets/runking-icon.png"
                  class="ranking-icon"
                /></button
            ></router-link>
          </div>
        </div>
        <div v-if="start">
          <h1 class="top gametitle">第{{ questionIndex + 1 }}問</h1>
          <div>
            <h2 class="game-message">Choose quickly!!</h2>
          </div>
          <div class="flex">
            <button
              type="button"
              class="btn-choice"
              v-for="(answer, index) in questionNow.answers"
              v-bind:key="index"
              v-on:click="checkAnswer(index)"
            >
              {{ answer }}
            </button>
          </div>
          <img src="../assets/character2.png" class="chara" />
        </div>
      </div>
      <div class="container" v-if="gameEnd && start === false">
        <p class="top gametitle">Result</p>

        <div class="starttext slideInRight">
          Time <span>{{ time }}</span> seconds!!
        </div>
        <div
          v-for="(question, index) in questions"
          v-bind:key="index"
          class="answer-container slideInRight"
        >
          <div>
            <p class="answer-question">~第{{ index + 1 }}問~</p>
            <span v-if="question.answer == answers[index]"
              >正解！！<br />{{ questions[index].singer }}「<a
                v-bind:href="questions[index].mv"
                >{{ question.answers[question.answer] }}</a
              >」</span
            >
            <span v-else
              >残念！不正解<br />正解は{{ questions[index].singer }}「<a
                v-bind:href="questions[index].mv"
                >{{ question.answers[question.answer] }}</a
              >」</span
            >
            <img class="answer-img" v-bind:src="questions[index].url" alt="" />
          </div>
        </div>
        <div>
          <router-link to="/Ranking">
            <button v-on:click="btnsound">
              <img src="../assets/runking-icon.png" class="ranking-icon" />
            </button>
          </router-link>
        </div>
        <button v-on:click="reset">RESET</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
// import confetti from "canvas-confetti"
//import star from "@/components/star.vue"
export default {
  data() {
    return {
      answers: [],
      questionIndex: 0,
      answer: [],
      audio: new Audio(),
      endaudio: new Audio(),
      buttonaudio: new Audio(),
      questions: [
        {
          question: "この歌はなんでしょう",
          answers: [
            "Shape of You",
            "Shape of Love",
            "Shake it Off",
            "Shake it Up",
          ],
          answer: 0,
          singer: "Ed Sheeran",
          sound: "./Shape of You.mp3",
          url: "https://images-fe.ssl-images-amazon.com/images/I/51inO4DBH0L._SY445_SX342_QL70_ML2_.jpg",
          mv: "https://youtu.be/JGwWNGJdvx8",
        },
        {
          answers: [
            "ブルーベリーナイツ",
            "かくれんぼ",
            "はしりがき",
            "恋人ごっこ",
          ],
          answer: 2,
          singer: "マカロニえんぴつ",
          sound: "./はしりがき.mp3",
          url: "https://img.hmv.co.jp/image/jacket/400/0000116/6/3/745.jpg",
          mv: "https://youtu.be/G-fvkUwK-Wo",
        },
        {
          answers: ["月色ホライズン", "ツキミソウ", "はしりがき", "ワタリドリ"],
          answer: 3,
          singer: "Alexandros",
          sound: "./ワタリドリ.mp3",
          url: "http://simg.mysound.jp/img/disc/036/120_UPCH-2036.jpg",
          mv: "https://youtu.be/O_DLtVuiqhI",
        },
        {
          answers: ["The USA", "UFO", "U.S.A.", "USA"],
          answer: 2,
          singer: "DA PUMP",
          sound: "./U.S.A..mp3",
          url: "https://images-na.ssl-images-amazon.com/images/I/815E90AuAbL._AC_SL1417_.jpg",
          mv: "https://youtu.be/sr--GVIoluU",
        },
        {
          answers: ["家族になろうよ", "桜坂", "最愛", "虹"],
          answer: 1,
          singer: "福山雅治",
          sound: "./桜坂.mp3",
          url: "https://image.entertainment-topics.jp/article/original/18122.jpg",
          mv: "https://youtu.be/AGYJ6jeu3p8",
        },
        {
          answers: ["ハナミズキ", "桜", "ひまわり", "遥か"],
          answer: 0,
          singer: "一青窈",
          sound: "./ハナミズキ.mp3",
          url: "https://images-na.ssl-images-amazon.com/images/I/61JLycqW00L._AC_SX355_.jpg",
          mv: "https://youtu.be/TngUo1gDNOg",
        },
        {
          answers: ["365日", "365日の紙飛行機", "3月9日", "366日"],
          answer: 3,
          singer: "HY",
          sound: "./366日.mp3",
          url: "https://contents.oricon.co.jp/upimg/news/20110207/84601_201102070088855001297066307c.jpg",
          mv: "https://youtu.be/uA1ik3c1J1Q",
        },
        {
          answers: ["Dynamite", "Lights", "Butter", "Let Go"],
          answer: 2,
          singer: "BTS",
          sound: "./Butter.mp3",
          url: "https://amd-pctr.c.yimg.jp/r/iwiz-amd/20210704-00010008-realsound-000-1-view.jpg",
          mv: "https://youtu.be/WMweEpGlu_U",
        },
        {
          answers: [
            "マリーゴールド",
            "愛を伝えたいだとか",
            "今夜このまま",
            "裸の心",
          ],
          answer: 2,
          singer: "あいみょん",
          sound: "./今夜このまま.mp3",
          url: "https://images-na.ssl-images-amazon.com/images/I/819is9URLVL._AC_SL1500_.jpg",
          mv: "https://youtu.be/mH6LoI63buY",
        },

        {
          answers: [
            "Slow & Easy",
            "祈り花",
            "また逢う日まで",
            "題名のない今日",
          ],
          answer: 0,
          singer: "平井大",
          sound: "./SlowEasy.mp3",
          url: "https://images-na.ssl-images-amazon.com/images/I/51S9KQubcdL._AC_SY450_.jpg",
          mv: "https://youtu.be/O2LsN1WcABI",
        },
        {
          answers: ["愛を伝えたいだとか", "祈り花", "女々しくて", "粉雪"],
          answer: 2,
          singer: "ゴールデンボンバー",
          sound: "./女々しくて.mp3",
          url: "https://hominis.media/2019/07/images/GOLDENBOMBER.jpg",
          mv: "https://youtu.be/BC9P3DSZu0A",
        },
        {
          answers: ["万華鏡", "火花", "紅蓮華", "炎"],
          answer: 2,
          singer: "LiSA",
          sound: "紅蓮華.mp3",
          url: "https://i.kfs.io/album/global/96107995,1v1/fit/500x500.jpg",
          mv: "https://youtu.be/MpYy6wwqxoo",
        },
        {
          answers: [
            "Step and a step",
            "Take a picture",
            "Make you happy",
            "Boom Boom Boom",
          ],
          answer: 2,
          singer: "NiziU",
          sound: "./Make you happy.mp3",
          url: "https://images-fe.ssl-images-amazon.com/images/I/51tKcC7n1bL._SY445_SX342_QL70_ML2_.jpg",
          mv: "https://youtu.be/QW28YKqdxe0",
        },
        {
          answers: ["勿忘", "かくれんぼ", "別れ", "ドライフラワー"],
          answer: 0,
          singer: "Awesome City Club",
          sound: "./勿忘.mp3",
          url: "https://images-na.ssl-images-amazon.com/images/I/51yBSgpPA1L._AC_.jpg",
          mv: "https://youtu.be/zkZARKFuzNQ",
        },
        {
          answers: [
            "We are",
            "Wasted Nights",
            "Stand Out Fit In",
            "The Beginning",
          ],
          answer: 1,
          singer: "ONE OK ROCK",
          sound: "./WastedNights.mp3",
          url: "https://m.media-amazon.com/images/I/81ycP5Vn34L._SS500_.jpg",
          mv: "https://youtu.be/b4YLo74OWfY",
        },
        {
          answers: ["Lovers Again", "Ti Amo", "ただ逢いたくて", "道"],
          answer: 0,
          singer: "EXILE",
          sound: "./Lovers Again.mp3",
          url: "https://images-na.ssl-images-amazon.com/images/I/71b7oFyXz4L._AC_SL1091_.jpg",
          mv: "https://youtu.be/PUdrCJSly_A",
        },
        {
          answers: [
            "サヨナラの意味",
            "帰り道は遠回りをしたくなる",
            "シンクロニシティ",
            "逃げ水",
          ],
          answer: 2,
          singer: "乃木坂46",
          sound: "./シンクロニシティ.mp3",
          url: "https://m.media-amazon.com/images/I/81OpmuY0R1L._SS500_.jpg",
          mv: "https://youtu.be/f0wbnQw89J0",
        },
        {
          answers: ["夜空", "Don't cry anymore", "片想い", "ヒカリへ"],
          answer: 3,
          singer: "miwa",
          sound: "./ヒカリへ.mp3",
          url: "https://images-na.ssl-images-amazon.com/images/I/61CfwEm1lgL._AC_SX425_.jpg",
          mv: "https://youtu.be/aRyjZa89g4o",
        },
        {
          answers: ["Sparkle", "君の名は", "前前前世", "点描の唄"],
          answer: 0,
          singer: "RADWIMPS",
          sound: "./Sparkle.mp3",
          url: "https://i1.sndcdn.com/artworks-000533563956-xnhu01-t500x500.jpg",
          mv: "https://youtu.be/tpH8TEkKQI4",
        },
        {
          answers: [
            "世田谷ラブストーリー",
            "クリスマスソング",
            "高嶺の花子さん",
            "ハッピーエンド",
          ],
          answer: 1,
          singer: "back number",
          sound: "./クリスマスソング.mp3",
          url: "https://images-na.ssl-images-amazon.com/images/I/616ZobZ2Z7L._AC_SY355_.jpg",
          mv: "https://youtu.be/7zBeQezaz4U",
        },
      ],
      gameaudio: {
        end: "./kansei.mp3",
        button: "./決定.mp3",
        ranksound: "./ファンファーレ4.mp3",
      },

      start: false,
      time: 0,
      sTime: 0,
      fTime: 0,
      totalTime: 0,
      missCount: 0,
      IntroScore: [],
    }
  },
  beforeDestroy() {
    this.audio.pause()
    this.audio.currentTime = 0
  },
  created() {
    firebase
      .firestore()
      .collection("IntrScore")
      .doc("IntroTop8")
      .get()
      .then((doc) => {
        doc.data().Top8.forEach((Top8) => {
          this.IntroScore.push({
            ...Top8,
          })
        })
      })
    const shuffle = ([...array]) => {
      for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      return array
    }
    this.questions = shuffle(this.questions)
    this.questions = this.questions.slice(15)

    for (let j = 0; j < this.questions.length; j++) {
      this.answer[j] = this.questions[j].answer
    }
  },
  methods: {
    checkAnswer: function (index) {
      //console.log("押せたよ")
      this.answers.push(index)
      if (!this.gameEnd) {
        this.questionIndex++
        if (this.questionNow) {
          this.audio.src = this.questions[this.questionIndex].sound
          this.audio.play()
          this.audio.loop = true
        } else {
          this.audio.pause()
          this.audio.currentTime = 0
        }
      } else {
        this.start = false
        this.audio.pause()
        this.audio.currentTime = 0
        this.endaudio.src = this.gameaudio.ranksound
        this.endaudio.play()
        this.fTime = performance.now()
        this.result()

        for (let i = 0; i < this.answer.length; i++) {
          if (this.answer[i] != this.answers[i]) {
            this.missCount += 1
          }
        }

        this.time = Number(this.missCount) * 10 + Number(this.second)
        if (this.second < 30) {
          this.onpuMaker(50)
          // this.endaudio.src = this.gameaudio.end
          // this.endaudio.play()
        } else if (this.second < 40) {
          this.onpuMaker(30)
        } else if (this.second < 60) {
          this.onpuMaker(10)
        } else {
          this.onpuMaker(0)
        }
        this.IntroScore.push({
          score: this.time,
          name: this.$auth.currentUser.displayName
            ? this.$auth.currentUser.displayName
            : "Guest",
        })
        this.IntroScore.sort((a, b) => {
          return a.score - b.score
        })
        this.IntroScore.splice(8, 1)

        firebase
          .firestore()
          .collection("IntrScore")
          .doc("IntroTop8")
          .set({ Top8: this.IntroScore })
      }
      // var link = document.getElementById("mv")
      // link.href = this.questions[this.questionIndex].mv
    },
    getContent: function () {
      this.buttonaudio.src = this.gameaudio.button
      this.buttonaudio.play()
      this.start = true
      this.sTime = performance.now()
      this.audio.src = this.questions[this.questionIndex].sound
      this.audio.play()
    },
    result() {
      this.totalTime = ((this.fTime - this.sTime) / 1000).toFixed(2)
      this.second = this.totalTime
    },
    btnsound0: function () {
      this.buttonaudio.src = this.gameaudio.button
      this.buttonaudio.play()
    },
    btnsound: function () {
      this.buttonaudio.src = this.gameaudio.end
      this.buttonaudio.play()
    },
    onpuMaker(n) {
      var star = document.createElement("div")
      star.className = "star"
      star.textContent = "♬"
      for (var i = 0; i < n; i++) {
        this.onpuSet(star)
      }
    },

    onpuSet(clone) {
      var onpuClone = clone.cloneNode(true)
      var onpuStyle = onpuClone.style

      //音符の位置（left）、アニメーションの遅延時間（animation-delay）、サイズ（font-size）をランダムで指定
      onpuStyle.left = 100 * Math.random() + "%"
      onpuStyle.animationDelay = 8 * Math.random() + "s"
      onpuStyle.fontSize = ~~(50 * Math.random() + 20) + "px"
      document.body.appendChild(onpuClone)

      //音符一つのアニメーションが終わったら新しい音符を生成
      onpuClone.addEventListener(
        "animationend",
        function () {
          this.parentNode.removeChild(this)
          var star = document.createElement("div")
          star.className = "star"
          star.textContent = "♬"
        },
        false
      )
    },
    reset: function () {
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
    },
  },
  computed: {
    questionNow: function () {
      return this.questions[this.questionIndex]
    },
    gameEnd: function () {
      return this.questions.length == this.answers.length
    },
  },
}
</script>

<style>
.container {
  background-image: url("../assets/background-don.png");
  position: relative;
}
.start-img {
  position: absolute;
  top: 200px;
  left: 70px;
  width: 25%;
}
.intr-app {
  width: 40%;
  margin-top: 30px;
}
.start-re-img {
  position: absolute;
  top: 200px;
  right: 70px;
  width: 25%;
}
.gametitle {
  font-size: 70px;
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
  font-family: "DotGothic16", sans-serif;
}
.main {
  color: coral;
}
.starttext {
  font-family: "DotGothic16", sans-serif;
  font-size: 30px;

  margin: 50px;
}
.starttext span {
  color: crimson;
  font-weight: bold;
}
.ranking-icon {
  width: 60%;
  height: 60%;
}
.game-message {
  font-size: 40px;
  color: greenyellow;
  font-weight: bold;
  font-family: "DotGothic16", sans-serif;
}
.flex {
  display: flex;
  width: 90%;
}
.flex button {
  font-family: "Viaoda Libre", cursive;
  background-color: greenyellow;
  color: black;
  font-size: 20px;
  size: 30px;
}

button:hover {
  background-color: #59b1eb;
}
.answer-container {
  text-align: center;
  background: rgba(255, 255, 255, 0.747);
  border-radius: 20px;
  padding: 20px;
}
.chara img {
  width: 300px;
  height: auto;
}
.answer-container + .answer-container {
  margin-top: 30px;
}
.answer-question {
  background: black;
  border-radius: 20px;
  font-size: 20px;
  font-weight: bold;
}
.answer-container span {
  font-size: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: bold;
}
img {
  width: 200px;
  height: auto;
}
.star {
  animation: kirakira 8s linear;
  color: rgb(231, 157, 144);
  background-color: transparent;
  display: inline-block;
  height: 1em;
  line-height: 1em;
  position: fixed;
  top: -1em;
  z-index: 1000;
}
@keyframes kirakira {
  0% {
    transform: translateY(0) rotateY(0);
  }
  100% {
    transform: translateY(calc(100vh + 1em)) rotateY(3600deg);
  }
}
@media (max-width: 700px) {
  .flex {
    flex-direction: column;
  }
  .flex button + button {
    margin-top: 30px;
  }
}
</style>
