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
import { FormEvent, MouseEvent } from "react";

//ーーーーーgoogleログインーーーーー
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


//ーーーーーgithubログインーーーーー
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

export const EmailSignUp = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, email: string, password: string) => {
  e.preventDefault();
  await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

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
