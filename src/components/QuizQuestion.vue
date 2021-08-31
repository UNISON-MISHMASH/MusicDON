<template>
  <div>
    <h1>歌詞クイズ</h1>
    <div>{{ newquestion.lyric }}</div>

    <input type="text" v-model="model.answer" />
    <button v-on:click="sendAnswer">回答</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {
        answer: [],
      },
      pageShow: 0,
    }
  },
  props: ["newquestion"],
  methods: {
    sendAnswer: function () {
      this.$emit("my-click", this.text)
    },
    checkanswer: function () {
      if (this.answer == this.questions[this.num].title) {
        this.$emit("check-answer", 2)
      } else {
        this.$emit("check-answer", 3)
      }
    },
  },
}
</script>
