import Vue from "vue"
import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAw-sbo-jZjj8WUAPUM6ko9CJRBDnYvRzs",
  authDomain: "musicdon-f183f.firebaseapp.com",
  projectId: "musicdon-f183f",
  storageBucket: "musicdon-f183f.appspot.com",
  messagingSenderId: "151221887218",
  appId: "1:151221887218:web:5af28926e28030d012f06b",
  measurementId: "G-6RP6EXS5DT",
}

firebase.initializeApp(firebaseConfig)

const initialUserState = {
  uid: "",
  displayName: "",
  photoURL: "",
}
const $auth = Vue.observable({
  currentUser: { ...initialUserState },
})
firebase.auth().onAuthStateChanged((user) => {
  let state
  if (user) {
    const { uid, displayName, photoURL } = user
    state = {
      uid,
      displayName,
      photoURL,
    }
  } else {
    state = initialUserState
  }
  Object.assign($auth.currentUser, state)
})
Vue.prototype.$auth = $auth
