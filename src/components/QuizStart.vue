<template>
  <div>
    <h1>クイズを始める</h1>
    <button v-on:click="nextQuiz">クイズスタート</button>
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
