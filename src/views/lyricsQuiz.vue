<template>
  <div>
    <h1>歌詞クイズ</h1>
    <div v-for="(question, index) in questions" v-bind:key="index">
      {{ question }}
    </div>
    <input type="text" v-model="answer" />
    <button v-on:click="checkAnswer">回答</button>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  data() {
    return {
      questions: [
        {
          title: "タイトル",
          lyric: "歌詞",
        },
        {
          title: "ドライフラワー",
          lyric:
            "多分、私じゃなくていいね 余裕のない二人だったし 気付けば喧嘩ばっかりしてさごめんね  ずっと話そうと思ってた きっと私たち合わないね 二人きりしかいない部屋でさ 貴方ばかり話していたよね もしいつか何処かで会えたら 今日の事を笑ってくれるかな 理由もちゃんと話せないけれど 貴方が眠った後に泣くのは嫌 声も顔も不器用なとこも 全部全部 嫌いじゃないの ドライフラワーみたい 君との日々もきっときっときっときっと色褪せる",
        },
      ],
      answer: "",
    }
  },
  // methods:{
  //   if(answer === questions.title){
  //     return "正解です"
  //   }else{
  //     alert("残念、不正解です")
  //   }
  // }
  created() {
    firebase
      .firestore()
      .collection("lyricsQuiz")
      .document("lyric")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.questions.push(doc.data())
        })
      })
  },
}
</script>
