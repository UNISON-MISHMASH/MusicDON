<template>
  <div>
    <h1>正解です！</h1>
    <div class="answer">
      {{ newquestion.singer }}の<br />
      {{ newquestion.title }}でした！
    </div>
    <div class="picture">
      <img v-bind:src="newquestion.picture" />
    </div>
    <button v-on:click="nextQuiz">次の問題</button>
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
.answer {
  font-size: 25px;
  margin-top: 15px;
}
.picture {
  display: inline-block;
  height: 50px;
  margin: 0, 30px;
}
</style>
