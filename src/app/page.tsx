"use client"
import AddForm from "./components/AddForm";
import Todolist from "./components/Todolist";
import { Task } from '@/Type';
import { db } from "./firebase/firebase";
import { collection, doc, getDocs, } from 'firebase/firestore';
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<Task[]>([]);

  
  const getTodosData = async () => {
    const datas = await getDocs(collection(db, "todo"));
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

  useEffect(() => {
    getTodosData();
  }, [])

 
  return (
    <>
      <h1 className="text-3xl text-center my-8 font-bold tracking-wide">TodoApp with Next.js/firebase</h1>
      <main className="h-auto w-2/5 min-w-96 mt-5 mx-auto bg-gray-300 px-4 py-3 rounded-md text-center shadow-2xl">
        <div className="flex-col w-11/12 h-auto mx-auto">
          <AddForm todos={todos} setTodos={setTodos}/>
          <Todolist todos={todos} setTodos={setTodos}/>
        </div>
      </main>
    </>
  )
}