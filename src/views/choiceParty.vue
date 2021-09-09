<template>
  <div id="app">
    <div class="title">
      <img src="../assets/choice-title.png" alt="" />
    </div>
    <div class="button">
      <router-link to="/introquiz">
        <img src="../assets/choice-button-In.png" alt="" />
      </router-link>
      <router-link to="/lyricsQuiz"
        ><img src="../assets/choice-button-Ly.png" alt=""
      /></router-link>
    </div>
    <div class="comment">
      <p>なにするー？</p>
      <img src="../assets/smile-don.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ChoiceParty",
}
</script>
<style scoped>
#app {
  margin: 0;
  padding: 0;

  min-height: 100vh;
  background-image: url("../assets/background-choice.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: rgba(15, 20, 100, 0.8);
}

.title img {
  width: 75%;
  margin-top: 20px;
}

.button {
  float: left;
  margin: 3% 5% 3% 5%;
  width: 45%;
}
.button img {
  margin: 3% 5% 3% 5%;
  width: 90%;
}
.comment {
  float: right;
  margin: 5% 10% 10% 0;
}
.comment img {
  margin: 30px;
}
.comment p {
  font-style: normal;
  font-family: ab-sekka, sans-serif;
  color: white;
  font-size: 50px;
}
</style>
