<template>
  <div>
    <h2>正解です！</h2>
    <div>○○でした</div>
    <button v-on:click="nextQuiz">次の問題</button>
  </div>
</template>
<script>
export default {
  methods: {
    nextQuiz: function () {
      this.$emit("my-click", 1)
    },
  },
}
</script>
