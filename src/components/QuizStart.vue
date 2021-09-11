<template>
  <div class="quizstart">
    <h1 class="title">LYRICSQUIZ START</h1>
    <img src="../assets/dj-don-re.png" class="character-left" />
    <img src="../assets/dj-don-re.png" class="character-right" />
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
@import url("https://fonts.googleapis.com/css2?family=Caveat&family=DotGothic16&display=swap");
.start {
  font-family: "DotGothic16", sans-serif;
  margin-top: 75px;
}
.title {
  color: coral;
  font-family: "DotGothic16", sans-serif;
  text-shadow: 3px 3px 3px black;
  font-size: 50px;
  padding-top: 50px;
}
.start:hover {
  opacity: 0.8;
}
.quizstart {
  background: transparent;
  position: relative;
  animation-name: fadein;
  animation-duration: 3s;
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
.character-left {
  position: absolute;
  top: 200px;
  left: 55px;
  width: 25%;
}
.character-right {
  position: absolute;
  right: 55px;
  top: 200px;
  width: 25%;
}
</style>
