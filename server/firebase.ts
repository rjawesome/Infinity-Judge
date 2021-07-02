import admin from "firebase-admin"

const serviceAccount = require("./firebasekey.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const auth = admin.auth()
const firestore = admin.firestore()

export const verifyUser = async (idToken: string) => {
  return await auth.verifyIdToken(idToken)
}

export const updateScore = async (
  uid: string,
  problemId: string,
  score: number
) => {
  return await firestore
    .collection("users")
    .doc(uid)
    .update({ [`problems.${problemId}`]: score })
}
