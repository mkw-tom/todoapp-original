"use client";
import AddForm from "./components/AddForm";
import Todolist from "./components/Todolist";
import { Task, profiles } from "@/Type";
import { db, auth } from "./firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AppStart from "./components/AppStart";
import { updateProfile } from "firebase/auth";

export default function Home() {
  const [todos, setTodos] = useState<Task[]>([]);
  const [user] = useAuthState(auth);

  const [displayName, setDisplayName] = useState<string | null | undefined>();
  const [photoURL, setPhotoURL] = useState<any>();

  const [uid, setUid] = useState<string | undefined>();

  useEffect(() => {
    if (user === null) {
      return;
    }
    setUserData();
    getTodosData();
  }, [user]);

  
  const updateProf = async (name: string | null | undefined, photo: any) => {
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };

  const setUserData = async () => {
    // const profName = await getDoc(doc(db, "users", `${user?.uid}`));
    // if (profName.exists()){
    //   setDisplayName(user?.displayName);
    //   setPhotoURL(user?.photoURL);
    //   return alert("既存ユーザーです")
    // }
    if(user?.displayName === null)  {
      updateProf("unknownUser", user?.photoURL);
    } else if (user?.photoURL === null) {
      updateProf(user?.displayName, "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png")
    } else if(user?.displayName === null && photoURL === null) {
      updateProf("unknownUser", "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png")
    } 

    await setDoc(doc(db, "users", `${user?.uid}`), {
      displayName: user?.displayName,
      photoURL: user?.photoURL,
    })
    setDisplayName(user?.displayName);
    setPhotoURL(user?.photoURL);
  }
  

  const getTodosData = async () => {
    if (user === null) {
      return;
    }

    const datas = await getDocs(collection(db, `users`, `${uid}`, "todos"));
    const todoDataList: Task[] = [];
    datas.forEach((data) => {
      const todo: Task = {
        id: data.data().id,
        text: data.data().text,
        edit: false,
      };
      todoDataList.push(todo);
    });
    // console.log(todoDataList);
    setTodos(todoDataList);
  };

  const handleSignOut = () => {
    auth.signOut();
    setTodos([]);
  };

  return (
    <>
      {user ? (
        <header className=" w-full h-28 bg-purple-700 flex items-center shadow-lg">
          <h1 className="text-2xl text-center font-bold tracking-wide text-white flex-1 border-r-2 flex-wrap">
            <span className="text-4xl display: inline-block mx-8">TodoApp</span>
            <span className="text-xl display: inline-block">
              with Next.js/firebase
            </span>
          </h1>
          <div className="group text-center w-1/5 text-lg">
            <img
              src={photoURL}
              alt="image"
              className="inline-block w-12 h-12 rounded-full z-0 border-2 border-white"
            />
            <div className="flex-col items-center justify-center hidden group-hover:block z-10 bg-purple-100 w-80 h-72 absolute top-5 right-5 duration-700 rounded-md shadow-lg border-2 border-purple-600">
              <img
                src={photoURL}
                alt=""
                className="inline-block w-16 h-16 rounded-full mt-10"
              />
              <p className="mt-3">{displayName}</p>
              <p className="my-6">現在のタスク数：{todos.length}</p>
              <p onClick={handleSignOut}>
                <Button>ログアウト</Button>
              </p>
            </div>
          </div>
        </header>
      ) : (
        <header className=" w-full h-28 bg-purple-700 flex items-center justify-center shadow-lg">
          <h1 className="text-2xl text-center font-bold tracking-wide text-white flex-wrap justify-center mx-auto ">
            <span className="text-4xl display: inline-block mx-8">TodoApp</span>
            <span className="text-xl display: inline-block pr-8">
              with Next.js/firebase
            </span>
          </h1>
          {/* <Link href="./" className="text-white flex-col mx-5 hover:opacity-70">
            <HomeIcon className="text-4xl"></HomeIcon>
          </Link> */}
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
        <AppStart />
      )}
    </>
  );
}
