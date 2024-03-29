import React, { useRef, useState } from 'react'
import { Task, propsAddForm } from '@/Type'
import { Delete, Edit, EditOff } from '@mui/icons-material'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'



const Todolist = ({ todos, setTodos }: propsAddForm) => {
  const [updateText, setUpdateText] = useState<string>("")
  const ref = useRef<HTMLInputElement>(null!)

  const handleSave = async (id: number, text: string) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.edit = false;
        todo.text = updateText;
      }
      return todo
    });
    setTodos(newTodos);

    await updateDoc(doc(db, "todo", `${id}`), {
      text: updateText,
      edit: false,
    })



    console.log(todos)
  }

  ////////リスト編集の複数選択をなくす

  const handleEdit = async (id: number, text: string) => {
    setUpdateText(text);
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.edit = true
      }
      return todo;
    });
    setTodos(newTodos);

    await updateDoc(doc(db, "todo", `${id}`), {
      edit: true,
    });
  }

  const handleDelete = async (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    await deleteDoc(doc(db, "todo", `${id}`));
  }

  return (
    <ul className='w-full h-auto max-h-96 overflow-auto'>
      {todos.map((todo, index) => (
        <li key={index} className='w-full h-auto px-3 py-2 flex justify-between items-center bg-gray-100 rounded-md  border-l-4 border-black mb-5' >
          {todo.edit ? (
            <input type="text" className='display: inline-block w-3/5 h-auto mx-auto break-words text-lg font-bold tracking-widest text-center' value={updateText} onChange={(e) => setUpdateText(e.target.value)} ref={ref}/>
          ) : (
            <p className='display: inline-block w-3/5 h-auto mx-auto break-words text-lg font-bold tracking-widest'>
              {todo.text}
            </p>
          )}
          <div>
            {todo.edit ? (

              <a onClick={() => handleSave(todo.id, todo.text)}>
                <EditOff className='text-blue-500 hover:opacity-70 active:text-lg mr-3'></EditOff>
              </a>
            ) : (
              <a onClick={() => handleEdit(todo.id, todo.text)}>
                <Edit className='text-blue-500 hover:opacity-70 active:text-lg mr-3'></Edit>
              </a>
            )}

            <a onClick={() => handleDelete(todo.id)}>
              <Delete className='text-red-500 hover:opacity-70 active:text-lg'></Delete>
            </a>
          </div>
        </li>
      ))
      }
    </ul >
  )
}

export default Todolist