import { GithubAuthProvider, GoogleAuthProvider, OAuthCredential, signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth"
import { GitHubProvider, GoogleProvider, auth } from "./firebase";



export const GoogleSignUp = () => {
  signInWithRedirect(auth, GoogleProvider)
    .then((result) => {
      const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
    })
    .catch((error) => {
      window.alert("ログインに失敗しました。")
    });
}

export const GitHubSignUp = () => {
  signInWithRedirect(auth, GitHubProvider)
    .then((result) => {
      const credential: OAuthCredential | null = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

    })
    .catch((error) => {
      window.confirm("ログインに失敗しました。")
    });
}

