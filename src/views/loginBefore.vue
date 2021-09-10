<template>
  <div class="login"></div>
</template>

<style scoped>
.login {
  margin: 0;
  padding: 0;
  height: 100vh;
  background-image: url("../assets/login-image.png");
  background-position: center center;

  background-size: cover;
  background-color: rgba(15, 20, 100, 0.8);
}
.header-foto {
  display: flex;
  justify-content: center;
}
.header-foto img {
  margin: 100px;
  width: 70%;
}
@media screen and (max-width: 959px) {
  .header-foto img {
    width: 80%;
  }
}
@media screen and (max-width: 480px) {
  .header-foto img {
    width: 90%;
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
