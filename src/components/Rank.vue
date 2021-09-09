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
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  data() {
    return {
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
}
</script>

<style scoped>
#app {
  width: 75%;
  height: 350px;
  background-image: url("../assets/slide-rank.png");
  background-size: cover;
  background-color: transparent;
  text-align: center;
  margin: 0 10% 0 10%;
}
.main {
  text-align: center;
}

.main img {
  width: 30%;
  margin-top: 30px;
}
.ranking {
  display: flex;
  justify-content: center;
}

td {
  font-size: 20px;
  color: rgb(21, 254, 188);
  text-align: center;
}

@media screen and (max-width: 1500px) {
  #app {
    background-image: url("../assets/slide-rank-M.png");
  }
}
</style>
