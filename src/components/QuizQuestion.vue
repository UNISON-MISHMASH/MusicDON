<template>
  <div class="lyric-quiz">
    <h1 class="quiz-title">歌詞クイズ</h1>
    <div class="question" v-html="newquestion.lyric.replace(/\n/g, '<br/>')">
      {{ newquestion.lyric }}
    </div>
    <input type="text" class="text-box" v-model="answer" />
    <button v-on:click="checkanswer" class="answer-button">回答</button>
  </div>
</template>
<script>
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
        this.$emit("my-click", 2)
      } else {
        this.$emit("my-click", 3)
      }
      this.answer = ""
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
  background-color: transparent;
  background-color: white;
}
.quiz-title {
  padding-top: 30px;
  margin-bottom: 30px;
  color: aqua;
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
  color: rgb(112, 93, 68);
}
.answer-button:hover {
  opacity: 0.8;
}
</style>
