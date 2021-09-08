<template>
  <div class="lyric-quiz">
    <h1 class="quiz-title">歌詞クイズ</h1>
    <div class="question" v-html="newquestion.lyric.replace(/\n/g, '<br/>')">
      {{ newquestion.lyric }}
    </div>
    <input type="text" class="text-box" v-model="answer" />
    <button v-on:click="checkanswer">回答</button>
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
.lyric-quiz {
  margin-left: 15%;
  margin-right: 15%;
}
.quiz-title {
  margin-bottom: 30px;
}
.question {
  font-size: 20px;
  border: 3px, black;
}
.text-box {
  width: 300px;
  height: 35px;
  font-size: 100%;
}
</style>
