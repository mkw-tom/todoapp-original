import {
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthCredential,
  OAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { GitHubProvider, GoogleProvider, auth, db } from "./firebase";

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


// //ーーーーーappleログインーーーーー
// export const AppleSignUp = async () => {
//   const provider = new OAuthProvider('apple.com');
//   provider.addScope('email');
//   provider.addScope('name');

//   await signInWithPopup(auth, provider)
//   .then((result) => {
//     // The signed-in user info.
//     const user = result.user;

//     const credential: OAuthCredential | null = OAuthProvider.credentialFromResult(result);
//     const accessToken = credential?.accessToken;
//     const idToken = credential?.idToken;
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The credential that was used.
//     const credential = OAuthProvider.credentialFromError(error);
//   })
// }



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

export const EmailSignUp = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert(`${errorCode}:${errorMessage}`);
    });
};
