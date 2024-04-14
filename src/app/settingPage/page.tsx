"use client";
import Link from "next/link";
import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ArrowRight } from "@mui/icons-material";

const page = () => {
  const [user] = useAuthState(auth);
  const [displayName, setDisplayName] = useState<string | null | undefined>(user?.displayName);
  const [photoURL, setPhotoURL] = useState<any>(user?.photoURL);

  return (
    <>
      <header className=" w-full h-28 bg-purple-700 flex items-center shadow-lg">
        <h1 className="text-2xl text-center font-bold tracking-wide text-white flex-1 border-r-2 flex-wrap">
          <span className="text-4xl display: inline-block mx-8">TodoApp</span>
          <span className="text-xl display: inline-block">
            with Next.js/firebase
          </span>
        </h1>
      </header>
      <main className="h-auto w-2/5 min-w-96 mt-16 mx-auto bg-purple-500 px-4 py-3 rounded-md text-center shadow-2xl">
        <Link href="/" className="block w-32 ml-auto text-white hover:opacity-70">back to<ArrowRight></ArrowRight></Link>
        <div className="flex-col justify-center w-11/12 h-auto mx-auto">
          <h1 className="inline-block font-bold text-white border-b-2 border-white text-lg">settingPage</h1>
          <p className=" text-white mt-12 mb-2">プロフィール画像を変更</p>
          <img src={`${user?.photoURL}`} alt="" className="block w-20 h-20 rounded-full my-5 mx-auto border-2 border-white"/>
          <div className="relative border-dashed border-2 hover:bg-purple-400 rounded-md">
            <input
              type="file" 
              accept="image/"
              className="block opacity-0 bg-blue-300 w-full py-7 z-10 cursor-pointer"
            />
            <p className="absolute top-8 left-44 text-white font-bold pointer-events-none">＋ファイルを選択</p>
          </div>
          <div className="block w-4/12 mx-auto mt-2">
            <button className="bg-blue-500 text-white px-6 py-1 flex-1 rounded-l-md hover:opacity-70">Edit</button>
            <button className="bg-red-500 text-white px-3 py-1 flex-1 rounded-r-md hover:opacity-70">Cancel</button>
          </div>
          <p className="text-white mt-12 mb-2">プロフィールネームを変更</p>
          <input
            type="text"
            className="rounded-md w-9/12 text-center"
            value={`${displayName}`}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <div className="block mx-auto w-4/12 mt-2 mb-8">
            <button className="bg-blue-500 text-white px-6 py-1 flex-1 rounded-l-md hover:opacity-70">Edit</button>
            <button className="bg-red-500 text-white px-3 py-1 flex-1 rounded-r-md hover:opacity-70">Cancel</button>
          </div>
        </div>
      </main>
    </>
  );
};

export default page;
