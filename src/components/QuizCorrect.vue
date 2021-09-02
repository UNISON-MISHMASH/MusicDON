<template>
  <div>
    <h2>正解です！</h2>
    <div>{{ newquestion.title }}でした</div>
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
