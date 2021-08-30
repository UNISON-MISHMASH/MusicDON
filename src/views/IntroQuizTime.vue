<template>
  <div id="app">
    <div class="main">
      <div class="container" v-if="!completed">
        <div v-if="!start">
          <p>イントロタイムアタック</p>
          <button v-on:click="getContent">START</button>
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
      <div class="container" v-if="completed && start === false">
        <p class="top">結果</p>
        <div>{{ time }}</div>
        <div
          v-for="(question, index) in questions"
          v-bind:key="index"
          class="answer-container"
        >
          <div>
            <p class="answer-question">~第{{ index + 1 }}問~</p>
            <span v-if="question.answer == answers[index]">正解</span>
            <span v-else
              >不正解<br />正解は「{{
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
export default {
  data() {
    return {
      answers: [],
      questionIndex: 0,
      answer: [],
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
    }
  },
  created() {
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
      console.log("押せたよ")
      this.answers.push(index)
      if (!this.completed) {
        this.questionIndex++
        let audio = new Audio()

        audio.src = this.questions[this.questionIndex].sound
        audio.play()
      } else {
        this.start = false
        this.fTime = performance.now()
        this.result()
        for (let i = 0; i < this.answer.length; i++) {
          if (this.answer[i] != this.answers[i]) {
            this.missCount += 1
          }
        }
      }
      this.time = Number(this.missCount) * 3 + Number(this.second)
    },
    getContent: function () {
      this.start = true
      this.sTime = performance.now()
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
    completed: function () {
      return this.questions.length == this.answers.length
    },
  },
}
</script>
