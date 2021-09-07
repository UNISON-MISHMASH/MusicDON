<template>
  <div>
    <h1>残念、不正解です</h1>
    <div class="answer">
      答えは{{ newquestion.singer }}の<br />
      {{ newquestion.title }}でした！
    </div>
    <div>
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
