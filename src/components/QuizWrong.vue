<template>
  <div>
    <h1 class="title">残念、不正解です</h1>
    <div class="answer">
      答えは{{ newquestion.singer }}の<br />
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
}
.picture {
  display: block;
  margin: 0 auto;
  height: 250px;
  width: 280px;
  margin: 0, 30px;
}
.title {
  font-family: "Kaisei Opti", serif;
  color: white;
  padding: 30px;
}
.next-quiz:hover {
  opacity: 0.8;
}
</style>
