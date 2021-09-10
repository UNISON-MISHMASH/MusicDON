<template>
  <div>
    <h1 class="title">LYRICSQUIZ START</h1>
    <button v-on:click="nextQuiz" class="start">クイズスタート</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: 1,
    }
  },
  methods: {
    nextQuiz() {
      this.$emit("my-click", 1)
    },
  },
}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Caveat&family=DotGothic16&display=swap")
  .start: hover {
  opacity: 0.8;
}
.title {
  color: coral;
  font-family: "Caveat", cursive;
  font-size: 50px;
  padding-top: 30px;
}
</style>
