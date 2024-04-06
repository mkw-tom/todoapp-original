import React, { useState } from "react";
import UserLoginForm from "./UserLoginForm";
import { Fade } from "@mui/material";

const AppStart = () => {
  const [start, setStart] = useState<Boolean>(false);

  return (
    <>
      { start === false ? (
        <main className="h-auto w-auto flex-col justify-center">
          <h2 className="text-purple-800 font-bold text-5xl block w-3/5 h-auto mx-auto mt-48 mb-16 text-center animate-bounce">
            Welcom to TodoApp
          </h2>
          <button
            className="block mx-auto text-white text-xl bg-orange-700 px-8 py-5 rounded-full shadow-md shadow-orange-950 active:shadow-none active:translate-y-1 "
            onClick={() => setStart(true)}
          >
            create my TodoList
          </button>
        </main>
      ) : (
        <UserLoginForm />
      )}
    </>
  );
};

export default AppStart;