
import React, { useId, useRef, useState } from 'react';
import { Task, propsTask } from '@/Type';
import { db } from '../firebase/firebase';
import { collection, doc, addDoc, setDoc } from 'firebase/firestore';
import {v4 as uuidv4} from "uuid"


const AddForm = ({uid, todos, setTodos}: propsTask) => {
  const [text, setText] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null!)

  const handleAdd = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const docID: number | string = uuidv4();

    const newTodo: Task = {
      id: `${docID}`,
      text: text,
      edit: false,
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
      <input type="text" className='rounded-l-md w-10/12' onChange={(e) => setText(e.target.value)} ref={ref}/>
      <button className='bg-purple-800 text-white mb-2 rounded-r-md px-2' onClick={(e) => handleAdd(e)}>+</button>
      <hr/>
    </form>
  )
}

export default AddForm