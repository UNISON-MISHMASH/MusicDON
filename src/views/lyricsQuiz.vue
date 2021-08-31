<template>
  <div>
    <quizstart v-show="pageShow === 0" @my-click="pageShow = $event" />
    <quiz-question
      v-show="pageShow === 1"
      @my-click="pageShow = $event"
      v-bind:newquestion="this.number[0]"
      @check-answer="pageShow = $event"
    />
    <quiz-correct v-show="pageShow === 2" @my-click="pageShow = $event" />
    <quiz-wrong v-show="pageShow === 3" @my-click="pageShow = $event" />
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
          title: "タイトル",
          lyric: "歌詞",
        },
        {
          title: "ドライフラワー",
          lyric:
            "多分、私じゃなくていいね 余裕のない二人だったし 気付けば喧嘩ばっかりしてさごめんね  ずっと話そうと思ってた きっと私たち合わないね 二人きりしかいない部屋でさ 貴方ばかり話していたよね もしいつか何処かで会えたら 今日の事を笑ってくれるかな 理由もちゃんと話せないけれど 貴方が眠った後に泣くのは嫌 声も顔も不器用なとこも 全部全部 嫌いじゃないの ドライフラワーみたい 君との日々もきっときっときっときっと色褪せる",
        },
        {
          title: "夜に駆ける",
          lyric:
            "沈むように溶けてゆくように 二人だけの空が広がる夜に「さよなら」だけだったその一言で全てが分かった 日が沈み出した空と君の姿 フェンス越しに重なっていた 初めて会った日から 僕の心の全てを奪った どこか儚い空気を纏う君は 寂しい目をしてたんだ いつだってチックタックと 鳴る世界で何度だってさ 触れる心無い言葉うるさい声に 涙が零れそうでも ありきたりな喜び きっと二人なら見つけられる 騒がしい日々に笑えない君に 思い付く限り眩しい明日を 明けない夜に落ちてゆく前に 僕の手を掴んでほら 忘れてしまいたくて閉じ込めた日々も 抱きしめた温もりで溶かすから 怖くないよいつか日が昇るまで二人でいよう",
        },
      ],
      num: 0,
      pageShow: 0,
      number: [],
    }
  },
  components: {
    Quizstart,
    QuizQuestion,
    QuizCorrect,
    QuizWrong,
  },
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
    for (let i = this.questions.length - 1; this.questions.length > 1; i--) {
      const j = (Math.floor(Math.random() * (i + 1))[
        (this.questions[i], this.questions[j])
      ] = [this.questions[j], this.questions[i]])
    }
  },
}
</script>
