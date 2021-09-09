<template>
  <div id="app">
    <div class="title">
      <img src="../assets/choice-title.png" alt="" />
    </div>
    <div class="button">
      <router-link to="/introquiz">
        <button>Intro Quiz</button>
      </router-link>
      <router-link to="/lyricsQuiz"><button>Lyrics Quiz</button></router-link>
      <router-link to="/introQuizTime"
        ><button>Time Attack</button></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ChoiceSingle",
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
.title {
  height: 100%;
}
.title img {
  width: 75%;
  margin-top: 20px;
}

.button {
  font-family: ocr-a-std, monospace;

  font-weight: 400;

  font-style: normal;
}
</style>
