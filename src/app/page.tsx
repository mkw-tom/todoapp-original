"use client"
import AddForm from "./components/AddForm";
import Todolist from "./components/Todolist";
import { Task, userInfomation } from '@/Type';
import { db, auth, GoogleProvider, GitHubProvider } from "./firebase/firebase";
import { collection, doc, getDocs, setDoc, updateDoc, } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { GithubAuthProvider, GoogleAuthProvider, OAuthCredential, signInWithRedirect } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "@mui/material";
import { GitHub, Google } from "@mui/icons-material";


export default function Home() {
  const [todos, setTodos] = useState<Task[]>([]);
  const [userInfo, setUserInfo] = useState<userInfomation>()
  const [user] = useAuthState(auth);
  const curUser: any = auth.currentUser;
  let photoURL: any = curUser?.photoURL;
  let userName: string | number = curUser?.displayName;
  let uid: any = curUser?.uid;


  useEffect(() => {
    getTodosData();
  }, [user]);

  // const setUserData = async () => {
  //   await updateDoc(doc(db, "users", `${uid}`), {
  //     userName: userName,
  //     photoURL: photoURL,
  //   });
  // }

  const getTodosData = async () => {
    const datas = await getDocs(collection(db, `users`, `${uid}`, 'todos'));
    const todoDataList: Task[] = [];
    datas.forEach((data) => {
      const todo: Task = {
        id: data.data().id,
        text: data.data().text,
        edit: false,
      }
      todoDataList.push(todo);
    });
    // console.log(todoDataList);
    setTodos(todoDataList);
  }


  const GoogleSignUp = () => {
    signInWithRedirect(auth, GoogleProvider)
      .then((result) => {
        const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
      }).catch((error) => {
        window.confirm("ログインに失敗しました。");
      });
  }

  const GitHubSignUp = () => {
    signInWithRedirect(auth, GitHubProvider)
      .then((result) => {
        const credential: OAuthCredential | null = GithubAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

      }).catch((error) => {
        window.confirm("ログインに失敗しました。")
      });
  }



  const handleSignOut = () => {
    auth.signOut();
    setTodos([]);

  }



  return (
    <>
      {user ? (
        <header className=" w-full h-28 bg-purple-700 flex items-center shadow-lg">
          <h1 className="text-2xl text-start font-bold tracking-wide text-white flex-1 border-r-2 flex-wrap ml-16">
            <span className="text-4xl display: inline-block mx-8">TodoApp</span>
            <span className="text-xl display: inline-block pr-8">with Next.js/firebase</span>
          </h1>
          <div className="group text-center w-1/5 text-lg">
            <img src={photoURL} alt="image" className="inline-block w-12 h-12 rounded-full z-0 border-2 border-white" />
            <div className="flex-col items-center justify-center hidden group-hover:block z-10 bg-purple-100 w-80 h-72 absolute top-5 right-5 duration-700 rounded-md shadow-lg border-2 border-purple-600">
              <img src={photoURL} alt="" className="inline-block w-16 h-16 rounded-full mt-10" />
              <p className="mt-3">{userName}</p>
              <p className="my-6">現在のタスク数：{todos.length}</p>
              <p onClick={handleSignOut}><Button >ログアウト</Button></p>
            </div>
          </div>
        </header>
      ) : (
        <header className=" w-full h-28 bg-purple-700 flex items-center justify-center shadow-lg">
          <h1 className="text-2xl text-start font-bold tracking-wide text-white flex-wrap justify-center mx-auto">
            <span className="text-4xl display: inline-block mx-8">TodoApp</span>
            <span className="text-xl display: inline-block pr-8">with Next.js/firebase</span>
          </h1>
        </header>
      )}
      {user ? (
        <main className="h-auto w-2/5 min-w-96 mt-5 mx-auto bg-purple-500 px-4 py-3 rounded-md text-center shadow-2xl">
          <div className="flex-col w-11/12 h-auto mx-auto">
            <AddForm uid={uid} todos={todos} setTodos={setTodos} />
            <Todolist uid={uid} todos={todos} setTodos={setTodos} />
          </div>
        </main>
      ) : (
        <main className="h-auto w-2/5 min-w-96 mt-5 mx-auto bg-purple-500 px-4 py-3 rounded-md text-center shadow-2xl">
          <div className="flex-col w-11/12 h-auto mx-auto">
            <h2 className="text-3xl font-bold text-white border-b-2 mt-5 mb-8 pb-2">Welcom to my TodoApp</h2>
            <button
              onClick={GoogleSignUp}
              className="block bg-blue-600 text-white w-full h-12 rounded-md mb-3 hover:opacity-60"
            >
              Login with Google<span className="ml-2"><Google></Google></span>
            </button>
            <button
              onClick={GitHubSignUp}
              className="block bg-black text-white w-full h-12 rounded-md mb-3 hover:opacity-70"
            >
              Login with GitHub<span className="ml-2"><GitHub></GitHub></span>
            </button>
          </div>
        </main>
      )}

    </>
  )
}