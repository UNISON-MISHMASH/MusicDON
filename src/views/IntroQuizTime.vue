<template>
  <div id="app">
    <div class="main">
      <div class="container" v-if="!gameEnd">
        <div v-if="!start">
          <p>イントロタイムアタック</p>
          <button v-on:click="getContent">START</button>
          <p>1つミスるとペナルティー+3秒!!</p>
        </div>
        <div v-if="start">
          <h1 class="top">第{{ questionIndex + 1 }}問</h1>

          <div class="flex">
            <button
              type="button"
              v-for="(answer, index) in questionNow.answers"
              v-bind:key="index"
              v-on:click="checkAnswer(index)"
            >
              {{ index + 1 }}.{{ answer }}
            </button>
          </div>
        </div>
      </div>
      <div class="container" v-if="gameEnd && start === false">
        <p class="top">結果はっぴょう～♪♪</p>
        <div>あなたの成績は{{ time }}秒です！！！</div>
        <div
          v-for="(question, index) in questions"
          v-bind:key="index"
          class="answer-container"
        >
          <div>
            <p class="answer-question">~第{{ index + 1 }}問~</p>
            <span v-if="question.answer == answers[index]">正解</span>
            <span v-else
              >残念！不正解<br />正解は「{{
                question.answers[question.answer]
              }}」</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
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
