<template>
  <div class="login">
    <img src="../assets/login-image.png" alt="" />
  </div>
</template>

<style scoped>
.login {
  margin: 0;
  padding: 0;
  height: 100vh;
  background-color: rgba(15, 20, 100, 0.8);
}
.login img {
  width: 100%;
}
@media screen and (max-width: 959px) {
  .login {
    height: 100%;
  }
}
</style>

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
