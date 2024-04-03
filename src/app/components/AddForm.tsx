
import React, { useRef, useState } from 'react';
import { Task, propsTask } from '@/Type';
import { db } from '../firebase/firebase';
import { collection, doc, addDoc, setDoc } from 'firebase/firestore';


const AddForm = ({uid, todos, setTodos}: propsTask) => {
  const [text, setText] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null!)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo: Task = {
      id: todos.length,
      text: text,
      edit: false,
    }
    setTodos([...todos, newTodo])

    ///
    await setDoc(doc(db, `users`, `${uid}`, "todos", `${todos.length}`), {
      ...newTodo,
    });

    ref.current.value = ""
  }

  return (
    <form className='w-full my-4' onSubmit={(e) => handleSubmit(e)}>
      <input type="text" className='rounded-l-md w-10/12' onChange={(e) => setText(e.target.value)} ref={ref}/>
      <button className='bg-purple-800 text-white mb-2 rounded-r-md px-2'>+</button>
      <hr/>
    </form>
  )
}

export default AddForm