<template>
  <div>
    <div class="container">
      <div id="app" class="start">
        <h2>{{ startName }}</h2>
        <div>
          <button v-on:click="getContents()">{{ buttonName }}</button>
        </div>
        <div class="question" v-show="question_Area">
          <div>
            <img id="songimg" v-show="song_img" class="song-img" />
            <div>
              <input v-model="answerText" type="text" placeholder="Answer" />

              <button v-on:click="checkAnswer()">回答</button>
              <h1>{{ correct }}</h1>

              <h1>{{ incorrect }}</h1>
            </div>
          </div>
        </div>
        <div class="answer_area" v-show="answer_Area">
          <button v-if="answer_button" v-on:click="showAnswer()">
            答えを見る
          </button>
          <h2 class="answer_size">
            <div v-show="song_title">{{ songtitle }}</div>
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      //gameStart: false,
      answerText: "",
      buttonCount: 0,
      checkCount: 0,
      startName: "ボタンを押してスタート!!",
      buttonName: "Music Start!!",
      audio: new Audio(),
      audioEle: [
        { title: "Shape of You", sound: "./Shape of You.mp3" },
        { title: "はしりがき", sound: "./はしりがき.mp3" },
        { title: "Slow & Easy", sound: "./SlowEasy.mp3" },
      ],
      correct: "",
      incorrect: "",
      songtitle: "",
      num: 0,
      question_Area: false,
      answer_button: false,
      answer_Area: false,
      song_title: false,
      song_img: false,

      // title:"",
    }
  },
  // created() {
  //   this.audio.pause()
  //   this.audio.currentTime = 0
  // },
  methods: {
    getContents: function () {
      //this.gameStart = true
      this.buttonCount++
      this.song_img = true
      this.startName = "ボタンを押して次の曲へ！"
      this.answerText = ""
      this.question_Area = true
      this.answer_button = true
      this.answer_Area = true
      if (this.buttonCount >= 1) {
        this.checkCount = 0
        this.correct = ""
        this.incorrect = ""
        this.songtitle = ""
        this.buttonName = "Next!!"
        this.audio.pause()
        this.audio.currentTime = 0
        this.num = Math.floor(Math.random() * this.audioEle.length)
        this.audio.src = this.audioEle[this.num].sound
        this.audio.play()
      } else {
        this.num = Math.floor(Math.random() * this.audioEle.length)

        this.audio.src = this.audioEle[this.num].sound
        this.audio.play()
      }
      var songImg = document.getElementById("songimg")
      songImg.src =
        "https://chicodeza.com/wordpress/wp-content/uploads/toonnkigou-illust-01.jpg"
    },

    checkAnswer: function () {
      this.checkCount++
      if (this.answerText == this.audioEle[this.num].title) {
        // alert("正解")

        this.correct = "正解！すごすぎ！"
      } else {
        // alert("不正解")

        this.incorrect = "残念！不正解！"
      }
      if (this.checkCount > 1) {
        this.incorrect = ""
      }
    },
    showAnswer: function () {
      this.song_title = true
      this.songtitle = "A." + this.audioEle[this.num].title
    },
  },
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: aquamarine;
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
  width: 100%;
  height: 50vh;
}

.question {
  display: inline-block;
  height: 100%;
  background-color: #f1f1f1;
  border: solid 2px black;
  margin-top: 20px;
  padding: 20px;
}
button {
  background-color: #333;
  color: #fff;
}

button:hover {
  background-color: #59b1eb;
}
.song-img {
  width: 100%;
}
.start {
  display: inline-block;
  padding-top: 100px;
  padding-bottom: 30px; /*ヘッダーとフッターの高さの分調節-->*/
  width: 70%;
  padding: 20px;
  margin-bottom: 60px;
  border: solid 1px black;
  box-sizing: border-box;
  margin-right: auto;
  margin-left: auto;
  background-color: white;
}
input {
  color: black;
  text-align: center;
  font-size: 28px;
  font-weight: bold;
}
#correct {
  color: red;
}

#incorrect {
  color: blue;
}
.answer_size {
  padding-top: 20px;
  padding-bottom: 20px;
}

.answer_area {
  display: inline-block;
  border: solid 2px black;
  width: 100%;
  height: 100%;
}
</style>
