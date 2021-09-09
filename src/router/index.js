import Vue from "vue"
import VueRouter from "vue-router"
import loginBefore from "@/views/loginBefore.vue"
import Home from "@/views/Home.vue"
import firebase from "firebase"
import Choice from "@/views/choice.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/loginBefore",
  },
  {
    path: "/loginBefore",
    name: "loginBefore",
    component: loginBefore,
  },
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },
  {
    path: "/Choice",
    name: "Choice",
    component: Choice,
  },

  {
    path: "/lyricsQuiz",
    name: "lyricsQuiz",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/lyricsQuiz.vue"),
  },
  {
    path: "/introQuiz",
    name: "introQuiz",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/IntroQuiz.vue"),
  },
  {
    path: "/introQuizTime",
    name: "introQuizTime",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/IntroQuizTime.vue"),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

const isSignedIn = async () => {
  // Promise を使って、onAuthStateChanged が完了するまで待つ
  return await new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          unsubscribe()
          resolve(true)
        } else {
          unsubscribe()
          resolve(false)
        }
      },
      (error) => {
        unsubscribe()
        reject(error)
      }
    )
  })
}

// Vue Router のグローバルガードで、ログインしてない場合は、BeforeSignInにしか行けなくする。

router.beforeEach(async (to, from, next) => {
  const auth = await isSignedIn()
  if (to.name !== "loginBefore" && !auth) {
    next("/loginBefore")
  } else {
    next()
  }
})

export default router
