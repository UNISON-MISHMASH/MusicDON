<template>
  <div class="container">
    <div class="answer-wrong">
      <h1 class="title">残念、不正解です</h1>
      <img src="../assets/character4.png" class="character-left" />
      <img src="../assets/character4.png" class="character-right" />
      <div class="answer">
        答えは<span class="answer-title">"{{ newquestion.singer }}"</span
        >の<br />
        <span class="answer-title">"{{ newquestion.title }}"</span>でした！
      </div>
      <img v-bind:src="newquestion.picture" class="picture" />
    </div>
    <button v-on:click="nextQuiz" class="next-quiz">次の問題</button>
  </div>
</template>
<script>
export default {
  props: ["newquestion"],
  methods: {
    nextQuiz: function () {
      this.$emit("my-click", 1), this.$emit("nextquestion", 1)
    },
  },
}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Caveat&family=DotGothic16&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Kaisei+Opti&display=swap");
.answer {
  font-size: 25px;
  margin-top: 15px;
  margin-bottom: 10px;
  color: aqua;
  font-family: "Kaisei Opti", serif;
}
.picture {
  display: block;
  margin: 0 auto;
  height: 250px;
  width: 280px;
  margin: 0, 30px;
}
.title {
  font-family: "DotGothic16", sans-serif;
  color: white;
  padding-top: 30px;
  text-shadow: 2px 3px 3px black;
}
.answer-wrong {
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
.next-quiz:hover {
  opacity: 0.8;
}
.next-quiz {
  font-family: "DotGothic16", sans-serif;
  text-shadow: 2px 2px 2px white;
}
.answer-title {
  font-size: 35px;
}
.container {
  position: relative;
  width: 100%;
}
.character-left {
  position: absolute;
  top: 260px;
  left: 45px;
  width: 28%;
}
.character-right {
  position: absolute;
  right: 45px;
  top: 260px;
  width: 28%;
}
</style>
