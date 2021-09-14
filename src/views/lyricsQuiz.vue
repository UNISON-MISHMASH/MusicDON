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
            "https://firebasestorage.googleapis.com/v0/b/musicdon-f183f.appspot.com/o/3851bcd1-aec0-454b-a48b-c47b87e5f344_1024.jpg?alt=media&token=b871e597-6f1a-4ec0-871d-b18c50f6e1f2",
          title: "紅蓮華",
          lyric:
            "強くなれる理由を知った 僕を連れて進め \\n 泥だらけの走馬灯に酔う こわばる心 \\n震える手は掴みたいものがある それだけさ \\n夜の匂いに空睨んでも 変わっていけるのは自分自身だけ　\\nそれだけさ  強くなれる理由を知った　僕を連れて進め  \\nどうしたって！ 消せない夢も　止まれない今も\\n 誰かのために強くなれるなら ありがとう 悲しみよ \\n世界に打ちのめされて負ける意味を知った \\n紅蓮の華よ咲き誇れ！ 運命を照らして",
          singer: "Lisa",
        },
        {
          picture:
            "https://firebasestorage.googleapis.com/v0/b/musicdon-f183f.appspot.com/o/81JghBJCFCL._SS500_.jpg?alt=media&token=92ad25dd-fc2d-4ed8-a2ed-78969dba7f72",
          title: "キセキ",
          singer: "GReeeeN",
          lyric:
            "明日、今日よりも好きになれる\
            \\n溢れる想いが止まらない\
            \\n今もこんなに好きでいるのに言葉に出来ない\
            \\n君のくれた日々が積み重なり過ぎ去った日々2人歩いた『軌跡』\
            \\n僕らの出逢いがもし偶然ならば?運命ならば?\
            \\n君に巡り合えたそれって『奇跡』\
            \\n2人寄り添って歩いて永久の愛を形にして\
            \\nいつまでも君の横で笑っていたくて\
            \\nアリガトウやAh\
            \\n愛してるじゃまだ足りないけど\
            \\nせめて言わせて「幸せです」と",
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
