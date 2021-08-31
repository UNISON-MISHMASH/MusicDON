<template>
  <div>
    <div class="header-foto">
      <img src="../assets/mainlogo2.png" alt="" />
    </div>
  </div>
</template>

<style scoped>
.header-foto {
  display: flex;
  justify-content: center;
}
.header-foto img {
  width: 900px;
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
