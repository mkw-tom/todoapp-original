import {
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { GitHubProvider, GoogleProvider, auth, db } from "./firebase";
import { getDoc } from "firebase/firestore";
import { getExistingUser } from "./firestore";

export const GoogleSignUp = async () => {
  await signInWithPopup(auth, GoogleProvider)
    .then((result) => {
      const credential: OAuthCredential | null =
        GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
    })
    .catch((error) => {
      window.alert("ログインに失敗しました。");
    });
};

export const GitHubSignUp = async () => {
  await signInWithPopup(auth, GitHubProvider)
    .then((result) => {
      const credential: OAuthCredential | null =
        GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
    })
    .catch((error) => {
      window.confirm("ログインに失敗しました。");
    });
};

export const EmailSignUp = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert(`${errorCode}:${errorMessage}`);
    });
};
