<template>
  <div>
    <h2>クイズを始める</h2>
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
