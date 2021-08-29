<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">ログイン画面</router-link>
      |<router-link to="/Home">Home</router-link>|
      <router-link to="/lyricsQuiz">歌詞クイズ</router-link> |
      <router-link to="/introQuiz">イントロクイズ</router-link>
    </div>

    <router-view />
    <div>
      <div @click="login">ログイン</div>
      <div v-on:click="logout">ログアウト</div>

      <div v-if="isLogin">こんにちは！</div>
      <div v-else>ログアウトしています</div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      isLogin: false,
    }
  },

  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider()

      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          // @type {firebase.auth.OAuthCredential} */
          console.log({ result })
          if (result.user) {
            this.isLogin = true
          }
        })
    },

    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.isLogin = false
        })
    },
  },
}
</script>
