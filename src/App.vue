<template>
  <div id="app">
    <div class="header">
      <div class="logo">
        <router-link to="/Home">
          <img src="@/assets/home-logo.png"
        /></router-link>
      </div>
      <div id="nav">
        <router-link to="/lyricsQuiz"
          ><img src="@/assets/lyrics-app.png" alt=""
        /></router-link>
        <router-link to="/introQuiz"
          ><img src="@/assets/intro-app.png" alt=""
        /></router-link>
        <router-link to="/introQuizTime"
          ><img src="@/assets/time-app.png" alt=""
        /></router-link>
      </div>
    </div>
    <router-view />
    <div class="Login">
      <router-link to="/Home" @click.native="login"
        ><img src="@/assets/play-now.png" alt="" />
      </router-link>

      <!--<router-link to="/" id="logoutButton" @click.native="logout"
        >Logout
      </router-link>
      <router-link to="/Home" id="loginButton" @click.native="Guest">
        Guest Login
      </router-link>-->
    </div>
  </div>
</template>
<script>
import firebase from "firebase"

export default {
  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider()

      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          // @type {firebase.auth.OAuthCredential} */
          console.log({ result })
          //if (result.user) {
          //}
        })
    },

    logout() {
      firebase.auth().signOut()
      /*.then(() => {
      /*this.isLogin = false
      this.Logoutchu = true
      this.Loginchu = false
      })*/
    },

    Guest() {
      firebase
        .auth()
        .signInAnonymously()
        .then((result) => {
          console.log(result)
          // this.isGuest = true
          //this.Logoutchu = false
          //this.Loginchu = true
        })
    },
  },
  computed: {
    user() {
      return this.$auth.currentUser
    },
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  margin: 0;
  padding: 0;
  background-color: rgba(15, 20, 100);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}
.header {
  background: transparent;
}
.logo {
  position: absolute;
  top: 10px;
  left: 10px;
}
.logo img {
  width: 350px;
}

#nav {
  padding: 30px;
  text-align: right;
}
#nav img {
  text-align: right;
  width: 20%;
  margin: 0 30px;
}
#nav a {
  font-weight: bold;
}

button {
  font-size: 20px;
  margin: 5%;
  padding: 30px 50px;
  font-family: "Oswald", sans-serif;
  border-radius: 100vh;
  border: 5px solid #000000;
}
.Login {
  display: flex;
  justify-content: center;
}
.Login img {
  width: 50%;
  margin-top: 10%;
  margin-bottom: 20%;
}

*#logoutButton {
  color: black;
  font-size: 20px;
  margin: 5%;

  padding: 30px 50px;
  font-family: "Oswald", sans-serif;
  border-radius: 100vh;
  border: 5px solid #000000;
}

@media screen and (max-width: 1340px) {
  .logo {
    position: none;
    text-align: center;
  }
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
