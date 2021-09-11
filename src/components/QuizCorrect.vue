<template>
  <div>
    <h1 class="title">正解です！</h1>
    <div class="answer">
      {{ newquestion.singer }}の<br />
      {{ newquestion.title }}でした！
    </div>
    <img v-bind:src="newquestion.picture" class="picture" />
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
.picture {
  display: block;
  margin: 0 auto;
  height: 250px;
  width: 280px;
}
.title {
  font-family: "DotGothic16", sans-serif;
  text-shadow: 1px 2px 3px green;
  color: yellowgreen;
  padding: 30px;
}
.next-quiz:hover {
  opacity: 0.8;
}
.next-quiz {
  font-family: "DotGothic16", sans-serif;
  text-shadow: 1px 2px 2px black;
}
</style>
