import React, { useState } from "react";
import UserLoginForm from "./UserLoginForm";
import { Fade } from "@mui/material";

const AppStart = () => {
  const [start, setStart] = useState<boolean>(false);

  return (
    <>
      { start === false ? (
        <main className="h-auto w-auto flex-col justify-center">
          <h2 className="text-purple-800 font-bold text-6xl flex-wrap w-4/5 h-auto mx-auto mt-32 mb-32 text-center animate-bounce">
            <span className="inline-block mx-3 my-2">Welcom</span> 
            <span className="inline-block mx-3 my-2">to</span>
            <span className="inline-block mx-3 my-2">TodoApp</span>
  
          </h2>
          <button
            className="block mx-auto text-white text-xl bg-orange-700 px-8 py-5 rounded-full shadow-md shadow-orange-950 active:shadow-none active:translate-y-1 "
            onClick={() => setStart(true)}
          >
            create my TodoList
          </button>
        </main>
      ) : (
        <UserLoginForm setStart={setStart} />
      )}
    </>
  );
};

export default AppStart;
