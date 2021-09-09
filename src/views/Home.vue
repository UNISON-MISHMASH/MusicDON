<template>
  <div class="home">
    <div class="header-foto">
      <img src="../assets/mainlogo-yellow.png" />
    </div>
    <div class="play-mode">
      <div class="play-item one">
        <div class="play-foto">
          <img
            id="button-one"
            v-bind:src="image1"
            @mouseover="mouseOver1"
            @mouseout="mouseOut1"
            class="before"
          />
        </div>
        <div class="play-button">
          <router-link to="/ChoiceSingle">
            <button @mouseover="mouseOver1" @mouseout="mouseOut1">
              SINGLE PLAY
            </button>
          </router-link>
        </div>
      </div>
      <div class="play-item everyone">
        <div class="play-foto">
          <img
            v-bind:src="image2"
            @mouseover="mouseOver2"
            @mouseout="mouseOut2"
            @id="button - everyone"
          />
        </div>
        <div class="play-button">
          <router-link to="/ChoiceParty">
            <button @mouseover="mouseOver2" @mouseout="mouseOut2">
              PARTY PLAY
            </button></router-link
          >
        </div>
      </div>
    </div>

    <div class="screen">
      <p id="title1">NEWS</p>
      <div>
        <hooper :settings="hooperSettings">
          <slide> <Rank /></slide>
          <slide> <img src="../assets/slide-intro.png" /><br /> </slide>
          <slide> <img src="../assets/slide-lyrics.png" /></slide>
          <slide> <img src="../assets/slide-time.png" /></slide>
        </hooper>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Hooper, Slide } from "hooper"
import "hooper/dist/hooper.css"
import Rank from "@/components/Rank.vue"

export default {
  name: "Home",
  data() {
    return {
      image1: require("@/assets/singer-don.png"),
      image2: require("@/assets/dj-don.png"),

      hooperSettings: {
        autoPlay: true,
        playSpeed: "4000",
        transition: "1000",
        infiniteScroll: true,
      },
    }
  },

  methods: {
    mouseOver1: function () {
      this.image1 = require("@/assets/singer-don.png")
    },
    mouseOver2: function () {
      this.image2 = require("@/assets/dj-don.png")
    },
    mouseOut1: function () {
      this.image1 = require("@/assets/singer-don.png")
    },
    mouseOut2: function () {
      this.image2 = require("@/assets/dj-don.png")
    },
  },
  components: {
    Hooper,
    Slide,
    Rank,
  },

  computed: {
    user() {
      return this.$auth.currentUser
    },
  },
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  font-size: 50px;
}

.home {
  height: 100%;
  background-image: url("../assets/background-home.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: rgba(15, 20, 100, 0.8);
}
.header-foto {
  display: flex;
  justify-content: center;
}

.header-foto img {
  width: 900px;
}

.play-mode {
  display: flex;
  justify-content: center;
}
.play-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5%;
}
.play-foto {
  display: flex;
  align-items: flex-end;
}

.play-mode button {
  font-size: 30px;
  margin-top: 20px;
  color: black;
  border: none;
  padding: 30px;
  font-family: lithos-pro, sans-serif;
  font-weight: 600;
  font-style: normal;
  background: transparent;
}

.one img {
  margin-top: 50px;
  width: 250px;
}

.everyone img {
  margin-top: 50px;
  width: 400px;
}

.screen {
  text-align: center;
}

.screen p {
  font-size: 70px;
  font-family: lithos-pro, sans-serif;
  font-weight: 600;
  font-style: normal;
  background: transparent;
  text-align: center;
  color: black;
}

.hooper-slide {
  align-items: center;
}
.screen img {
  width: 70%;
}
@media screen and (max-width: 959px) {
  .header-foto img {
    width: 80%;
  }

  .play-mode {
    display: flex;
    justify-content: space-around;
  }
  .play-mode button {
    font-size: 0.9rem;
    margin-top: 20px;

    padding: 0.9rem;
    font-family: "Oswald", sans-serif;
    border-radius: 100vh;
  }
}
@media screen and (max-width: 480px) {
  .header-foto img {
    width: 90%;
  }
  .play-foto {
    display: none;
  }
  .play-mode {
    display: block;
  }
  .play-mode button {
    font-size: 30px;
    margin: 10px;

    padding: 20px;
    font-family: "Oswald", sans-serif;
    border-radius: 100vh;
  }

  #title1 {
    font-size: 80%;
    margin-top: 30px;
  }
}
</style>
