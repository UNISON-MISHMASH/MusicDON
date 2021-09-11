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
              ><button>
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
            <button>
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
          answers: ["Slow & Easy", "祈り花", "女々しくて", "粉雪"],
          answer: 2,
          singer: "ゴールデンボンバー",
          sound: "./女々しくて.mp3",
          url: "https://hominis.media/2019/07/images/GOLDENBOMBER.jpg",
          mv: "https://youtu.be/BC9P3DSZu0A",
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
      ],
      gameaudio: [{ end: "./kansei.mp3" }],

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
        } else {
          this.audio.pause()
          this.audio.currentTime = 0
        }
      } else {
        this.start = false
        this.audio.pause()
        // this.endaudio.src = this.gameaudio.end
        // this.endaudio.play()
        this.fTime = performance.now()
        this.result()

        for (let i = 0; i < this.answer.length; i++) {
          if (this.answer[i] != this.answers[i]) {
            this.missCount += 1
          }
        }

        this.time = Number(this.missCount) * 10 + Number(this.second)
        if (this.second < 30) {
          this.starMaker(50)
          // this.endaudio.src = this.gameaudio.end
          // this.endaudio.play()
        } else if (this.second < 40) {
          this.starMaker(30)
        } else if (this.second < 60) {
          this.starMaker(10)
        } else {
          this.starMaker(0)
        }
        this.IntroScore.push({
          score: this.time,
          name: this.$auth.currentUser.displayName,
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
      this.start = true
      this.sTime = performance.now()
      this.audio.src = this.questions[this.questionIndex].sound
      this.audio.play()
    },
    result() {
      this.totalTime = ((this.fTime - this.sTime) / 1000).toFixed(2)
      this.second = this.totalTime
    },
    starMaker(n) {
      var star = document.createElement("div")
      star.className = "star"
      star.textContent = "♬"
      for (var i = 0; i < n; i++) {
        this.starSet(star)
      }
    },

    starSet(clone) {
      var starClone = clone.cloneNode(true)
      var starStyle = starClone.style

      //音符の位置（left）、アニメーションの遅延時間（animation-delay）、サイズ（font-size）をランダムで指定
      starStyle.left = 100 * Math.random() + "%"
      starStyle.animationDelay = 8 * Math.random() + "s"
      starStyle.fontSize = ~~(50 * Math.random() + 20) + "px"
      document.body.appendChild(starClone)

      //音符一つのアニメーションが終わったら新しい音符を生成
      starClone.addEventListener(
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
  width: 100%;
}
.flex button {
  font-family: "Viaoda Libre", cursive;
  background-color: greenyellow;
  color: black;
  font-size: 20px;
  size: 50px;
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
</style>
