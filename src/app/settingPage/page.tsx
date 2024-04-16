"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase/firebase";
import { ArrowRight } from "@mui/icons-material";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";

const Page = () => {
  const [user] = useAuthState(auth)
  const [name, setName] = useState<string | null | undefined>(user?.displayName);
  const [photo, setPhoto] = useState<any>(user?.photoURL);
  
  // const userFileName: any = await getDoc(doc(db, "users", `${user?.uid}`, "fileName"));
  // const [fileName, setFileName] = useState<string | null | undefined>(userFileName.data());

  const getURL = async (e: any | React.ChangeEvent<HTMLInputElement>) => {
    // const desertRef = ref(storage, `images/${fileName}`);
    // await deleteObject(desertRef)
    //   .then(() => {
    //     alert("前の画像をストレージから削除しました。")
    //   })
    //   .catch((error) => {
    //     console.log(`${error.message}`)
    //   });

    const file = e.target.files[0];

    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file).then((snapshot) => {
      console.log("success to save a photo");
    });
    const gsReference = ref(storage, `images/${file.name}`);
    await getDownloadURL(gsReference)
      .then((url) => {
        alert("URLが取得できました");
        setPhoto(url);
      })
      .catch((err) => console.log(err));

  };


  const updateName = async () => {
    if (name === "") {
      alert("文字が入力されていません。");
      setName(user?.displayName);
      return;
    }
    if (confirm("ユーザーネームをを変更しますか？") === false) {
      setName(user?.displayName);
      return;
    }
    await updateProfile(auth.currentUser, {
      displayName: name,
    }).catch((error) => {
      // An error occurred
      // ...
    });

    await updateDoc(doc(db, "users", `${user?.uid}`), {
      displayName: name,
    });
    alert("ユーザーネームを変更しました！");
  };


  const updatePhoto = async () => {
    if (photo === user?.photoURL) {
      return alert("画像が選択されていません。");
    }
    if (confirm("プロフィール画像を変更しますか？") === false) {
      setPhoto(user?.photoURL);
      return;
    }
    await updateProfile(auth.currentUser, {
      photoURL: photo,
    }).catch((error) => {
      console.log(`${error.message}`);
    });
    await updateDoc(doc(db, "users", `${user?.uid}`), {
      photoURL: photo,
    });

    alert("プロフィール画像を変更しました！");
  };

  return (
    <>
      <header className=" w-full h-28 bg-purple-700 flex items-center shadow-lg fixed top-0 z-20">
        <h1 className="text-2xl text-center font-bold tracking-wide text-white flex-1 border-r-2 flex-wrap">
          <span className="text-4xl display: inline-block mx-8">TodoApp</span>
          <span className="text-xl display: inline-block">
            with Next.js/firebase
          </span>
        </h1>
      </header>
      <div className="h-28"></div>
      <main className="h-auto w-2/5 min-w-96  mt-16 mb-5 mx-auto bg-purple-500 px-4 py-10 rounded-md text-center shadow-2xl relative">
        <Link
          href="/"
          className="block w-32 ml-auto text-white hover:opacity-70 absolute top-5 -right-3"
        >
          戻る<ArrowRight></ArrowRight>
        </Link>
        <div className="flex-col justify-center w-11/12 h-auto mx-auto">
          <h1 className="inline-block font-bold text-white border-b-2 border-white text-xl">
            設定
          </h1>
          <p className=" text-white mt-12 mb-3 text-left">
            ・プロフィール画像を変更
          </p>
          <img
            src={photo}
            alt="プロフィール画像"
            className="block w-20 h-20 rounded-full my-5 mx-auto border-2 border-white"
          />
          <div className="w-full h-10 flex items-center relative mb-3 cursor-pointer">
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={getURL}
              className="w-10/12 opacity-0 cursor-pointer "
            />
            <button className="inline-block w-10/12 h-10 z-10 absolute top-0 rounded-l-md bg-purple-200 hover:bg-purple-500 pointer-events-none">
              画像を選択
            </button>
            <button
              className="inline-block w-2/12 h-10 bg-purple-800 text-white rounded-r-md"
              onClick={updatePhoto}
            >
              変更
            </button>
          </div>
          <hr />
          <p className="text-white mt-12 mb-3 text-left">
            ・ユーザーネームを変更
          </p>
          <div className="flex items-center w-full h-10 mb-5">
            <input
              type="text"
              maxLength={9}
              className="inline-block h-10 rounded-l-md text-center bg-purple-200 flex-1"
              value={`${name}`}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className="inline-block w-2/12 h-10 bg-purple-800 text-white rounded-r-md hover:opacity-70"
              onClick={updateName}
            >
              変更
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
