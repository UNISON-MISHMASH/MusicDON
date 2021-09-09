<template>
  <div>
    <div class="container" v-if="start">
      <p class="gametitle slideInRight main">Intro Quiz <br />with everyone</p>

      <img src="../assets/singer-re-don.png" class="singer-re" />
      <img src="../assets/singer-don.png" class="singer" />

      <div>
        <button v-on:click="getContents()">{{ buttonName }}</button>
        <h2 class="start-name slideInRight">{{ startName }}</h2>
      </div>
    </div>
    <div class="container" v-show="question_Area">
      <h2 class="question-text">Listen Carefully</h2>
      <img src="../assets/saiseigamen.png" class="saisei-img" />
      <div>
        <input v-model="answerText" type="text" placeholder="Answer" />
      </div>
      <div>
        <button v-on:click="checkAnswer()">回答</button>
      </div>
    </div>
    <div class="container" v-if="correct_Area">
      <div class="game-correct">
        <h1>{{ correct }}</h1>
        <h1>
          {{ this.audioEle[this.num].singer }}「<a
            v-bind:href="this.audioEle[this.num].mv"
            >{{ this.audioEle[this.num].title }}</a
          >」
        </h1>
      </div>
      <img v-bind:src="this.audioEle[this.num].url" />
      <img src="../assets/character3.png" alt="" />
      <div>
        <button v-on:click="getContents()">Next</button>
        <button v-on:click="reset">RESET</button>
      </div>
    </div>

    <div class="container" v-if="incorrect_Area">
      <div class="answer-box">
        <h1>{{ incorrect }}</h1>
        <h1>
          {{ this.audioEle[this.num].singer }}「<a
            v-bind:href="this.audioEle[this.num].mv"
            >{{ this.audioEle[this.num].title }}</a
          >」
        </h1>
      </div>

      <img v-bind:src="this.audioEle[this.num].url" />
      <img src="../assets/character4.png" alt="" />
      <div>
        <button v-on:click="getContents()">Next</button>
        <button v-on:click="reset">RESET</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      start: true,
      answerText: "",
      buttonCount: 0,
      checkCount: 0,
      startName: "Press the button to start!!",
      buttonName: "Music Start!!",
      audio: new Audio(),
      audioEle: [
        {
          title: "Shape of You",
          singer: "Ed Sheeran",
          sound: "./Shape of You.mp3",
          url: "https://images-fe.ssl-images-amazon.com/images/I/51inO4DBH0L._SY445_SX342_QL70_ML2_.jpg",
          mv: "https://youtu.be/JGwWNGJdvx8",
        },
        {
          title: "はしりがき",
          singer: "マカロニエンピツ",
          sound: "./はしりがき.mp3",
          url: "https://img.hmv.co.jp/image/jacket/400/0000116/6/3/745.jpg",
          mv: "https://youtu.be/G-fvkUwK-Wo",
        },
        {
          title: "Slow & Easy",
          singer: "平井大",
          sound: "./SlowEasy.mp3",
          url: "https://images-na.ssl-images-amazon.com/images/I/51S9KQubcdL._AC_SY450_.jpg",
          mv: "https://youtu.be/1mz-A--mANU",
        },
      ],
      correct: "",
      incorrect: "",
      songtitle: "",
      num: 0,

      question_Area: false,
      correct_Area: false,
      incorrect_Area: false,
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
      this.start = false
      this.buttonCount++
      this.song_img = true

      this.answerText = ""
      this.question_Area = true
      this.answer_button = true
      this.answer_Area = true
      if (this.buttonCount >= 1) {
        this.checkCount = 0
        this.correct = ""
        this.incorrect = ""
        this.songtitle = ""
        this.correct_Area = false
        this.incorrect_Area = false
        this.audio.pause()
        this.audio.currentTime = 0
        this.audio.loop = true
        this.num = Math.floor(Math.random() * this.audioEle.length)
        this.audio.src = this.audioEle[this.num].sound
        this.audio.play()
      } else {
        this.num = Math.floor(Math.random() * this.audioEle.length)

        this.audio.src = this.audioEle[this.num].sound
        this.audio.play()
        this.audio.loop = true
      }
    },

    checkAnswer: function () {
      this.checkCount++
      this.question_Area = false

      if (this.answerText == this.audioEle[this.num].title) {
        // alert("正解")
        this.correct_Area = true
        this.correct = "正解！素晴らしい！"
      } else {
        // alert("不正解")
        this.incorrect_Area = true
        this.incorrect = "残念！不正解！"
      }
      if (this.checkCount > 1) {
        this.incorrect = ""
      }
    },
    reset: function () {
      this.audio.pause()
      this.audio.currentTime = 0
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
    },
  },
}
</script>

<style scoped>
.container {
  position: relative;
  min-height: 100vh;
  background-image: url("../assets/background-don.png");
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
  width: 100%;
  height: 50vh;
}

.gametitle {
  font-size: 70px;
  font-weight: bold;
  font-family: "Viaoda Libre", cursive;
}
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(150px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slideInRight {
  animation-name: slideInRight;
  animation-duration: 1s;
  animation-timing-function: ease-out;
}
.start-name {
  font-size: 50px;
}
.singer-re {
  position: absolute;
  top: 180px;
  left: 45px;
  width: 25%;
}
.singer {
  position: absolute;
  top: 180px;
  right: 45px;
  width: 25%;
}
.chara img {
  width: 500px;
  height: auto;
}
img {
  width: 400px;
  height: auto;
}
.saisei-img {
  position: relative;
  width: 50%;
}
.question-text {
  font-size: 80px;
}
.main {
  color: coral;
}
.question {
  display: inline-block;
  height: 100%;
  background-image: url(../assets/saiseigamen.png);
  border: solid 2px black;
  margin-top: 20px;
  padding: 20px;
}
h1 {
  color: coral;
  font-family: "Viaoda Libre", cursive;
}
h2 {
  color: coral;
  font-family: "Viaoda Libre", cursive;
}
button {
  background-color: #333;
  color: #fff;
}

button:hover {
  background-color: #59b1eb;
}

.answer-box {
  background: black;
  border-radius: 20px;
  padding: 20px;
}
.game-correct {
  text-align: center;
  background: rgba(255, 255, 255, 0.747);
  border-radius: 20px;
  padding: 20px;
}

input {
  position: relative;
  width: 50%;
  color: black;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  font-family: "Viaoda Libre", cursive;
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
