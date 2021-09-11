<template>
  <div class="lyric-quiz">
    <div class="question">
      <h1 class="quiz-title">歌詞クイズ</h1>
      <div class="question" v-html="newquestion.lyric.replace(/\\n/g, '<br/>')">
        {{ newquestion.lyric }}
      </div>
    </div>
    <div>
      <input type="text" class="text-box" v-model="answer" />
      <button v-on:click="checkanswer" class="answer-button">回答</button>
    </div>
    <button v-on:click="wrong" class="answer-button">分からない!</button>
  </div>
</template>
<script>
import confetti from "canvas-confetti"
export default {
  data() {
    return {
      answer: "",
      pageShow: 0,
    }
  },
  props: ["newquestion"],
  methods: {
    checkanswer: function () {
      if (this.answer === this.newquestion.title) {
        confetti(), this.$emit("my-click", 2)
      } else {
        this.$emit("my-click", 3)
      }
      this.answer = ""
    },
    wrong: function () {
      this.$emit("my-click", 3)
    },
  },
}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kaisei+Opti&display=swap");
.lyric-quiz {
  margin-left: 15%;
  margin-right: 15%;
  font-family: "Kaisei Opti", serif;
  background-size: cover;
  background: transparent;
}
.quiz-title {
  padding-top: 30px;
  margin-bottom: 30px;
  color: aqua;
  font-family: "DotGothic16", sans-serif;
  text-shadow: 2px 3px 3px black;
}
.question {
  font-size: 20px;
  color: aqua;
  margin-bottom: 20px;
}
.text-box {
  width: 300px;
  height: 30px;
  font-size: 100%;
}
.answer-button {
  color: black;
  font-family: "DotGothic16", sans-serif;
  text-shadow: 1px 2px 2p yellowgreen;
  background-color: cornsilk;
}
.answer-button:hover {
  opacity: 0.8;
}
.question {
  animation-name: fadein;
  animation-duration: 2s;
}
@keyframes fadein {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
