<template>
  <div id="app">
    <div class="main">
      <div class="container" v-if="!gameEnd">
        <div v-if="!start">
          <p class="gametitle slideInRight">
            Intro <br />
            Time Attack!!
          </p>
          <button v-on:click="getContent">START</button>
          <p class="starttext slideInRight">
            Penalty <span>10</span> seconds per mistake
          </p>
        </div>
        <div v-if="start">
          <h1 class="top gametitle">第{{ questionIndex + 1 }}問</h1>

          <div class="flex">
            <button
              type="button"
              v-for="(answer, index) in questionNow.answers"
              v-bind:key="index"
              v-on:click="checkAnswer(index)"
            >
              {{ answer }}
            </button>
          </div>
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
              >正解！！<br />{{ questions[index].singer }}「{{
                question.answers[question.answer]
              }}」</span
            >
            <span v-else
              >残念！不正解<br />正解は{{ questions[index].singer }}「{{
                question.answers[question.answer]
              }}」</span
            >
          </div>
        </div>
        <button v-on:click="reset">RESET</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
//import Star from "@/components/Star.vue"
export default {
  data() {
    return {
      answers: [],
      questionIndex: 0,
      answer: [],
      audio: new Audio(),
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
        },
        {
          question: "この歌はなんでしょう",
          answers: [
            "ブルーベリーナイツ",
            "かくれんぼ",
            "はしりがき",
            "恋人ごっこ",
          ],
          answer: 2,
          singer: "マカロニえんぴつ",
          sound: "./はしりがき.mp3",
        },
        {
          question: "この歌はなんでしょう",
          answers: [
            "Slow & Easy",
            "祈り花",
            "また逢う日まで",
            "題名のない今日",
          ],
          answer: 0,
          singer: "平井大",
          sound: "./SlowEasy.mp3",
        },
      ],

      start: false,
      time: 0,
      sTime: 0,
      fTime: 0,
      totalTime: 0,
      missCount: 0,
      IntroScore: [],
    }
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
        this.fTime = performance.now()
        this.result()

        for (let i = 0; i < this.answer.length; i++) {
          if (this.answer[i] != this.answers[i]) {
            this.missCount += 1
          }
        }

        this.time = Number(this.missCount) * 3 + Number(this.second)
        if (this.second < 5) {
          this.starMaker(50)
        } else if (this.second < 10) {
          this.starMaker(25)
        } else if (this.second < 20) {
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
      star.textContent = "★"
      for (var i = 0; i < n; i++) {
        this.starSet(star)
      }
    },

    starSet(clone) {
      var starClone = clone.cloneNode(true)
      var starStyle = starClone.style

      //星の位置（left）、アニメーションの遅延時間（animation-delay）、サイズ（font-size）をランダムで指定
      starStyle.left = 100 * Math.random() + "%"
      starStyle.animationDelay = 8 * Math.random() + "s"
      starStyle.fontSize = ~~(50 * Math.random() + 20) + "px"
      document.body.appendChild(starClone)

      //星一つのアニメーションが終わったら新しい星を生成
      starClone.addEventListener(
        "animationend",
        function () {
          this.parentNode.removeChild(this)
          var star = document.createElement("div")
          star.className = "star"
          star.textContent = "★"
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
.gametitle {
  font-size: 70px;
  font-weight: bold;
  font-family: "Viaoda Libre", cursive;
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
.starttext {
  font-family: "Viaoda Libre", cursive;
  font-size: 30px;

  margin: 50px;
}
.starttext span {
  color: crimson;
  font-weight: bold;
}
button {
  font-family: "Viaoda Libre", cursive;
  background-color: #333;
  color: #fff;
}

button:hover {
  background-color: #59b1eb;
}
.answer-container {
  background: rgba(255, 255, 255, 0.747);
  border-radius: 20px;
  padding: 20px;
}
.answer-container + .answer-container {
  margin-top: 30px;
}
.answer-question {
  background: rgba(255, 255, 255, 0.747);
  font-size: 26px;
}
.answer-container span {
  font-size: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
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
