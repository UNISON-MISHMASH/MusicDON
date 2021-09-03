<template>
  <div id="app">
    <div id="nav">
      <router-link to="/Home" v-if="Loginchu">Home</router-link>
      <router-link to="/lyricsQuiz" v-if="Loginchu">歌詞クイズ</router-link>
      <router-link to="/introQuiz" v-if="Loginchu">イントロクイズ</router-link>
      <router-link to="/introQuizTime" v-if="Loginchu"
        >イントロクイズTimeAtack</router-link
      >
    </div>

    <router-view />
    <div class="Login">
      <router-link
        to="/Home"
        id="loginButton"
        @click.native="login"
        v-if="Logoutchu"
        >Login
      </router-link>

      <router-link
        to="/"
        id="logoutButton"
        @click.native="logout"
        v-if="Loginchu"
        >Logout
      </router-link>
      <router-link
        to="/Home"
        id="loginButton"
        @click.native="Guest"
        v-if="Logoutchu"
      >
        Guest Login
      </router-link>
    </div>
    <div>
      <div v-if="isLogin">こんにちは！</div>
      <div v-else-if="isGuest">ゲストさん</div>
      <div v-else></div>
    </div>
  </div>
</template>

<style>
* {
  background-color: rgb(21, 254, 188);
  margin: 0;
  padding: 0;
}
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
.Login {
  display: flex;
  justify-content: center;
}
button {
  font-size: 20px;
  margin: 5%;

  padding: 30px 50px;
  font-family: "Oswald", sans-serif;
  border-radius: 100vh;
  border: 5px solid #000000;
}
#loginButton {
  color: black;
  font-size: 20px;
  margin: 5%;

  padding: 30px 50px;
  font-family: "Oswald", sans-serif;
  border-radius: 100vh;
  border: 5px solid #000000;
}
#logoutButton {
  color: black;
  font-size: 20px;
  margin: 5%;

  padding: 30px 50px;
  font-family: "Oswald", sans-serif;
  border-radius: 100vh;
  border: 5px solid #000000;
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
import firebase from "firebase"

export default {
  data() {
    return {
      isLogin: false,
      isGuest: false,
      Loginchu: false,
      Logoutchu: true,
      isGuest: false,
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
            this.Loginchu = true
            this.Logoutchu = false
          }
        })
    },

    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.isLogin = false
          this.Logoutchu = true
          this.Loginchu = false
        })
    },

    Guest() {
      firebase
        .auth()
        .signInAnonymously()
        .then((result) => {
          console.log(result)
          this.isGuest = true
          this.Logoutchu = false
          this.Loginchu = true
        })
    },
  },
}
</script>
