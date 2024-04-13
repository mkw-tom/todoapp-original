
import React, { useId, useRef, useState } from 'react';
import { Task, propsTask } from '@/Type';
import { db } from '../firebase/firebase';
import { doc, addDoc, setDoc, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from "uuid"


const AddForm = ({ uid, todos, setTodos }: propsTask) => {
  const [text, setText] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null!)

  const handleAdd = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    //文字列がない場合の早期リターン
    if(text === "") {
      return
    }
    
    //文字列が既に存在した場合の早期リターン
    const sameText: Task | undefined = todos.find((todo) => todo.text === text);
    if(sameText !== undefined) {
      ref.current.value = "";
      setText("");
      return window.alert("このタスクは既に存在しています。")
    }
    
    const docID: number | string = uuidv4();

    const newTodo: Task = {
      id: `${docID}`,
      text: text,
      edit: false,
      locked: false,
      disabled:false,
      bgColor: "white",
    }
    setTodos([...todos, newTodo])

    ///
    await setDoc(doc(db, `users`, `${uid}`, "todos", `${docID}`), {
      ...newTodo,
    });

    ref.current.value = ""
  }

  return (
    <form className='w-full my-4' onSubmit={(e) => handleAdd(e)}>
      <input type="text" className='rounded-l-md w-10/12 bg-purple-100' onChange={(e) => setText(e.target.value)} ref={ref} />
      <button className='bg-purple-800 text-white mb-2 rounded-r-md px-2' onClick={(e) => handleAdd(e)}>+</button>
      <hr />
    </form>
  )
}

export default AddForm