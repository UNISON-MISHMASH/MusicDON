<template>
  <div class="container">
    <div class="answer-correct">
      <h1 class="title">正解です!!</h1>
      <img src="../assets/character3.png" class="character-left" />
      <img src="../assets/character3.png" class="character-right" />
      <div class="answer">
        <span class="answer-title">"{{ newquestion.singer }}"</span>の<br />
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
@import url("https://fonts.googleapis.com/css2?family=Kaisei+Opti&display=swap");
.answer {
  font-size: 25px;
  margin-top: 15px;
  margin-bottom: 10px;
  color: aqua;
  font-family: "Kaisei Opti", serif;
}
.answer-correct {
  animation-name: fadein;
  animation-duration: 1s;
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
.picture {
  display: block;
  margin: 0 auto;
  height: 250px;
  width: 280px;
}
.title {
  font-family: "DotGothic16", sans-serif;
  text-shadow: 3px 2px 4px black;
  color: yellowgreen;
  padding-top: 30px;
  font-size: 50px;
}
.next-quiz:hover {
  opacity: 0.8;
}
.next-quiz {
  font-family: "DotGothic16", sans-serif;
  /* text-shadow: 1px 2px 2px black; */
}
.answer-title {
  font-size: 35px;
}
.container {
  position: relative;
}
.character-left {
  position: absolute;
  top: 230px;
  left: 55px;
  width: 20%;
}
.character-right {
  position: absolute;
  right: 55px;
  top: 230px;
  width: 20%;
}
</style>
