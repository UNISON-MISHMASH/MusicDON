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
        ><img src="@/assets/play-now.png" alt="" id="google" />
      </router-link>

      <router-link to="/Home" @click.native="Guest"
        ><img src="@/assets/guestLogin.png" alt="" id="guest" />
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
  top: 30px;
  left: 30px;
}
.logo img {
  float: left;
  width: 40%;
}
#google {
  width: 350px;
  margin-left: 1%;
}
#guest {
  width: 320px;
}
#nav {
  margin: 20px 10px 20px 0;
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
  flex-direction: column;
}
.Login img {
  width: 400px;
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
    text-align: center;
    display: none;
  }
  #nav {
    display: flex;
    justify-content: space-between;
  }
  #nav {
    text-align: center;
    margin: 10px px 10px 0;
    padding: 30px;
  }

  #nav img {
    padding: 0;
    width: 70%;
  }
}
@media screen and (max-width: 959px) {
  .header-foto img {
    width: 80%;
  }
  #nav {
    display: flex;
    flex-direction: column;
  }
  #nav img {
    padding: 0;
    width: 30%;
  }
}
@media screen and (max-width: 480px) {
  .header-foto img {
    width: 90%;
  }
}
</style>
