<template>
  <div class="home">
    <div>{{ user.displayName }}</div>
    <div class="header-foto">
      <img src="../assets/mainlogo2.png" alt="" />
    </div>
    <div class="play-mode">
      <div class="play-item one">
        <div class="play-foto">
          <img
            id="button-one"
            onmouseover="kirikae1()"
            onmouseout="kirikaeback1()"
            class="before"
            src="../assets/newguiter.png"
            alt=""
          />
        </div>
        <div class="play-button">
          <button onmouseover="kirikae1()" onmouseout="kirikaeback1()">
            SINGLE PLAY
          </button>
        </div>
      </div>
      <div class="play-item everyone">
        <div class="play-foto">
          <img
            onmouseover="kirikae2()"
            onmouseout="kirikaeback2()"
            id="button-everyone"
            src="../assets/newband.png"
            alt=""
          />
        </div>
        <div class="play-button">
          <button onmouseover="kirikae2()" onmouseout="kirikaeback2()">
            PARTY PLAY
          </button>
        </div>
      </div>
    </div>

    <div class="screen">
      <p id="title2">NEWS</p>
      <ul class="slider">
        <li><img src="../assets/sample1.png" alt="image(1)" /></li>
        <li><img src="../assets/sample2.png" alt="image(2)" /></li>
        <li><img src="../assets/sample3.png" alt="image(3)" /></li>
        <li><img src="../assets/sample4.png" alt="image(4)" /></li>
      </ul>
    </div>
    <div class="Runking">
      <p class="runking-title" id="title1">RUNKING</p>
      <div id="container">
        <div class="top5">
          <img src="../assets/number1.png" alt="" />
          <p>さっきーさん１</p>
        </div>
        <div class="top5">
          <img src="../assets/number2.png" alt="" />
          <p>さっきーさん１</p>
        </div>
        <div class="top5">
          <img src="../assets/number3.png" alt="" />
          <p>さっきーさん１</p>
        </div>
        <div class="top5">
          <img src="../assets/number4.png" alt="" />
          <p>さっきーさん１</p>
        </div>
        <div class="top5">
          <img src="../assets/number5.png" alt="" />
          <p>さっきーさん１</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  background-color: rgb(21, 254, 188);
  margin: 0;
  padding: 0;
  font-size: 50px;
}

.header-list {
  display: flex;
  justify-content: center;
}

.header-item {
  display: flex;
  flex-direction: column;
  margin: 50px 100px 30px 100px;
  align-items: center;
}
.header-item img {
  width: 50px;
  height: 50px;
}

.header-item p {
  font-family: "Oswald", sans-serif;
  font-size: 30px;
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
  font-size: 50px;
  margin-top: 20px;

  padding: 30px;
  font-family: "Oswald", sans-serif;
  border-radius: 100vh;
  border: 5px solid #000000;
}

.one img {
  width: 400px;
}

.everyone img {
  width: 400px;
}

.runking-title {
  font-size: 70px;
  font-family: "Oswald", sans-serif;
  text-align: center;
  margin-top: 120px;
}
#container {
  background-color: gray;
}

.top5 {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: none;
}

.top5 img {
  margin: 0 20px;
  height: 90px;
}

.top5 p {
  font-family: "Dela Gothic One", cursive;
  font-size: 40px;
}

.screen {
  text-align: center;
  margin-top: 120px;
}

.screen p {
  font-size: 70px;
  font-family: "Oswald", sans-serif;
  text-align: center;
}
.slider img {
  width: 50%;
  margin-left: 25%;
  margin-right: 25%;
}

@media screen and (max-width: 959px) {
  .header-list {
    display: flex;
    justify-content: space-around;
  }

  .header-item {
    display: flex;
    flex-direction: column;
    margin: 25px 25px 10px 25px;
  }

  .header-item img {
    width: 30px;
    height: 30px;
  }
  .header-item p {
    font-family: "Oswald", sans-serif;
    font-size: 20px;
  }
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

  .top5 p {
    font-family: "Dela Gothic One", cursive;
    font-size: 30px;
  }

  .slider img {
    width: 90%;
    margin: auto;
    margin-bottom: 30px;
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
  .top5 img {
    height: 40px;
  }

  .top5 p {
    font-family: "Dela Gothic One", cursive;
    font-size: 20px;
    color: white;
  }
  #title1 {
    font-size: 80%;
    margin-top: 30px;
  }
  #title2 {
    font-size: 80%;
    margin-top: 30px;
  }
}
</style>
<script>
// @ is an alias to /src

export default {
  name: "Home",
  computed: {
    user() {
      return this.$auth.currentUser
    },
  },
}
</script>
