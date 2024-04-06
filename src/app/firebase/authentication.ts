import { GithubAuthProvider, GoogleAuthProvider, OAuthCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth"
import { GitHubProvider, GoogleProvider, auth, db } from "./firebase";
import { getDoc } from "firebase/firestore";
import { getExistingUser } from "./firestore";



export const GoogleSignUp = async () => {
  await signInWithRedirect(auth, GoogleProvider)
    .then((result) => {
      const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
    })
    .catch((error) => {
      window.alert("ログインに失敗しました。")
    });

}

export const GitHubSignUp = async () => {
  await signInWithRedirect(auth, GitHubProvider)
    .then((result) => {
      const credential: OAuthCredential | null = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
    })
    .catch((error) => {
      window.confirm("ログインに失敗しました。")
    });
}


export const EmailSignUp = async (email: any, password: any) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert(`${errorMessage}`)
    });
}