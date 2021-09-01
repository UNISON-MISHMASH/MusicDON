<template>
  <div>
    <h1>歌詞クイズ</h1>
    <div>{{ newquestion.lyric }}</div>

    <input type="text" v-model="model.answer" />
    <button v-on:click="checkanswer">回答</button>
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
    checkanswer: function () {
      if (this.model.answer === this.newquestion.title) {
        this.$emit("my-click", 2)
      } else {
        this.$emit("my-click", 3)
      }
    },
  },
}
</script>
