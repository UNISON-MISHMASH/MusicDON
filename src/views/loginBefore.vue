<template>
  <div>まだログインしていません</div>
</template>

<script>
export default {
  name: "loginBefore",
  computed: {
    user() {
      return this.$auth.currentUser
    },
  },
}
</script>
