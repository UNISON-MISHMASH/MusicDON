<template>
  <div>
    <div class="container">
      <div id="app" class="start">
        <h2>さあはじめよう！！！</h2>
        <div>
          <button v-on:click="getContents()">
            Music Start!
          </button>
        </div>
        <div class="question">
          <div>
            <div>
              <input v-model="answerText" type="text" placeholder="Answer" />

              <button v-on:click="checkAnswer()">回答</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      answerText: "",
      audioEle: ["./Shape of You.mp3", "./はしりがき.mp3", "./Slow Easy.mp3"],

      // title:"",
    };
  },
  methods: {
    getContents: function() {
      let audio = new Audio();
      let num = Math.floor(Math.random() * this.audioEle.length);

      if (num == this.audioEle.length) {
        num = this.audioEle.length - 1;
      }
      audio.src = this.audioEle[num];
      audio.play();
    },

    // //checkAnswer: function() {
    //   // if(this.answerText==this.title){
    //   // }
    // },
  },
};
</script>

<style>
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
</style>
