<template>
  <div id="app">
    <div class="main">
      <div class="title">
        <img src="../assets/slide-rank-title.png" alt="" />
      </div>
      <div class="ranking">
        <table>
          <tr v-for="rank in intro" v-bind:key="rank.rank_id">
            <td>{{ rank.number }}</td>
            <td>{{ rank.human }}</td>
            <td>{{ rank.time }}秒</td>
          </tr>
        </table>
      </div>
    </div>
    <div>
      <router-link to="/introQuizTime"
        ><button v-on:click="btnsound">TimeAttack!!</button></router-link
      >
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  name: "Ranking",
  data() {
    return {
      buttonaudio: new Audio(),
      intro: [
        {
          number: "🥇1位🥇",
          human: "",
          time: 0,
        },
        {
          number: "🥈2位🥈",
          human: "",
          time: 0,
        },
        {
          number: "🥉3位🥉",
          human: "",
          time: 0,
        },
        {
          number: "4位",
          human: "",
          time: 0,
        },
        {
          number: "5位",
          human: "",
          time: 0,
        },
      ],
      IntroScore: [],
      gameaudio: { button: "./決定.mp3" },
    }
  },

  created() {
    firebase
      .firestore()
      .collection("IntrScore")
      .doc("IntroTop8")
      .get()
      .then((doc) => {
        doc.data().Top8.forEach((Top8) => {
          this.IntroScore.push({
            ...Top8,
          })
        })
        for (let i = 0; i < 5; i++) {
          this.intro[i].time = this.IntroScore[i].score
          this.intro[i].human = this.IntroScore[i].name
        }
      })
  },
  methods: {
    btnsound: function () {
      this.buttonaudio.src = this.gameaudio.button
      this.buttonaudio.play()
    },
  },
}
</script>

<style scoped>
#app {
  width: 92%;
  height: 100%;
  background-position: center center;
  background-size: cover;
  background-color: transparent;
  background-repeat: no-repeat;

  text-align: center;
  margin: 0 20% 0 3%;
}
.main {
  text-align: center;
}

.main img {
  width: 70%;

  margin-top: 50px;
  margin-bottom: 30px;
}
.ranking {
  display: flex;
  justify-content: center;
  margin-right: 30px;
}
table {
  width: 60%;
}
td {
  font-size: 40px;
  color: rgb(21, 254, 188);
  text-align: center;
  font-weight: bold;
  font-family: "DotGothic16", sans-serif;
}

@media screen and (max-width: 1500px) {
  #app {
    background-image: url("../assets/background-choice.png");
  }
}
</style>

>
