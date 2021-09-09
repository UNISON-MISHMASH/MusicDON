<template>
  <div class="lyric-quiz">
    <quizstart v-show="pageShow === 0" @my-click="pageShow = $event" />
    <quiz-question
      v-show="pageShow === 1"
      @my-click="pageShow = $event"
      v-bind:newquestion="this.questions[this.num]"
    />
    <quiz-correct
      v-show="pageShow === 2"
      @my-click="pageShow = $event"
      @nextquestion="num += $event"
      v-bind:newquestion="this.questions[this.num]"
    />
    <quiz-wrong
      v-show="pageShow === 3"
      @my-click="pageShow = $event"
      @nextquestion="num += $event"
      v-bind:newquestion="this.questions[this.num]"
    />
  </div>
</template>

<script>
import Quizstart from "@/components/QuizStart.vue"
import QuizQuestion from "@/components/QuizQuestion.vue"
import QuizCorrect from "@/components/QuizCorrect.vue"
import QuizWrong from "@/components/QuizWrong.vue"
import firebase from "firebase"

export default {
  data() {
    return {
      questions: [
        {
          picture:
            "https://firebasestorage.googleapis.com/v0/b/musicdon-f183f.appspot.com/o/81JghBJCFCL._SS500_.jpg?alt=media&token=92ad25dd-fc2d-4ed8-a2ed-78969dba7f72",
          title: "キセキ",
          singer: "GReeeeN",
          lyric:
            "明日、今日よりも好きになれる\
            \n溢れる想いが止まらない\
            \n今もこんなに好きでいるのに言葉に出来ない\
            \n君のくれた日々が積み重なり過ぎ去った日々2人歩いた『軌跡』\
            \n僕らの出逢いがもし偶然ならば?運命ならば?\
            \n君に巡り合えたそれって『奇跡』\
            \n2人寄り添って歩いて永久の愛を形にして\
            \nいつまでも君の横で笑っていたくて\
            \nアリガトウやAh\
            \n愛してるじゃまだ足りないけど\
            \nせめて言わせて「幸せです」と",
        },
      ],
      num: 0,
      pageShow: 0,
    }
  },
  components: {
    Quizstart,
    QuizQuestion,
    QuizCorrect,
    QuizWrong,
  },
  // created() {
  // for (let i = this.questions.length - 1; i >= 0; i--) {
  //   const j = Math.floor(Math.random() * (i + 1))
  //   const tmp = this.questions[i]
  //   this.questions[i] = this.questions[j]
  //   this.questions[j] = tmp
  //   firebase
  //     .firestore()
  //     .collection("lyricsQuiz")
  //     .get()
  //     .then((snapshot) => {
  //       snapshot.forEach((doc) => {
  //         this.questions.push(doc.data())
  //       })
  //     })
  // }
  created() {
    firebase
      .firestore()
      .collection("lyricsQuiz")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.questions.push(doc.data())
        })
      })
      .then(() => {
        for (let i = this.questions.length - 1; i >= 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          const tmp = this.questions[i]
          this.questions[i] = this.questions[j]
          this.questions[j] = tmp
        }
      })
  },
}
</script>
<style scoped>
* {
  background-image: url("../assets/background-don.png");
}
.lyric-quiz {
  min-height: 70vh;
}
</style>
