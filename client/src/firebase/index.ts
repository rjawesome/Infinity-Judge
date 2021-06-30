import "firebase/auth"
import "firebase/firestore"

import firebase from "firebase/app"
import { useEffect, useState } from "react"

const firebaseConfig = {
  apiKey: "AIzaSyA-Wu88uS3A6NMzCrF5l3DloHHgaNi-aLA",
  authDomain: "judge-9f4ba.firebaseapp.com",
  projectId: "judge-9f4ba",
  storageBucket: "judge-9f4ba.appspot.com",
  messagingSenderId: "735452787743",
  appId: "1:735452787743:web:a22b6f38a3ac4787e3512a",
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const auth = firebase.auth()
const db = firebase.firestore()

export const signUp = async (
  email: string,
  password: string,
  handle: string
) => {
  const { user } = await auth.createUserWithEmailAndPassword(email, password)
  db.collection("users").doc("uid").set({ handle, problems: {} })
}

export const signIn = async (email: string, password: string) => {
  await auth.signInWithEmailAndPassword(email, password)
}

export const useAuthState = (): [firebase.User | null, boolean] => {
  const [user, setUser] = useState<firebase.User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    return auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })
  }, [])
  return [user, loading]
}

interface UserData {
  handle: string
  problems: {
    [id: string]: number
  }
}

export const useUserData = () => {
  const [user] = useAuthState()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const a = async () => {
      if (user) {
        const doc = await db.collection("users").doc(user.uid).get()
        setUserData(doc.data() as UserData)
        setLoading(false)
      }
    }
  }, [user])
  return [userData, loading]
}
