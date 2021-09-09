<template>
  <div id="app">
    <div class="header">
      <router-link to="/Home" v-if="Loginchu">
        <img src="@/assets/logo-app.png" id="logo"
      /></router-link>
      <div id="nav">
        <router-link to="/lyricsQuiz" v-if="Loginchu"
          ><img src="@/assets/lyrics-app.png" alt=""
        /></router-link>
        <router-link to="/introQuiz" v-if="Loginchu"
          ><img src="@/assets/intro-app.png" alt=""
        /></router-link>
        <router-link to="/introQuizTime" v-if="Loginchu"
          ><img src="@/assets/time-app.png" alt=""
        /></router-link>
      </div>
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
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  margin: 0;
  padding: 0;

  background-color: rgba(15, 20, 100, 0.6);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.header {
  background-color: rgba(119, 136, 153, 0);
}
#logo {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 100px;
}

#nav {
  padding: 30px;
}
#nav img {
  width: 15%;
  margin: 0 5%;
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
