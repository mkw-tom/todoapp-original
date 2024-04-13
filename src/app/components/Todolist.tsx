import React, { useRef, useState } from "react";
import { Task, propsTask } from "@/Type";
import { Delete, Edit, EditOff, Lock, LockOpen } from "@mui/icons-material";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Todolist = ({ uid, todos, setTodos }: propsTask) => {
  const [updateText, setUpdateText] = useState<string>("");
  
  const ref = useRef<HTMLInputElement>(null!);


  const handleLock = async (id: string | number) => {
    if(confirm("このタスクにロックしますか？") === false) {
      return;
    }

    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.locked = true;
        todo.bgColor = "yellow"
        todo.disabled = true;
      }
      return todo;
    })
    setTodos(newTodos);

    await updateDoc(doc(db, `users`, `${uid}`, `todos`, `${id}`), {
      locked: true,
      bgColor: "yellow",
      disabled: true,
    });
  }

  const handleOpenLock = async (id: string | number) => {
    if(confirm("このタスクのロックの解除しますか？") === false) {
      return;
    }

    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.locked = false;
        todo.bgColor = "white"
        todo.disabled = false;
      }
      return todo;
    })
    setTodos(newTodos);

    await updateDoc(doc(db, `users`, `${uid}`, `todos`, `${id}`), {
      locked: false,
      bgColor: "white",
      disabled: false,
    });
  }

  const handleSave = async ( id: number | string, text: string) => {
    if(updateText === "") {
      return alert("文字が入力されていません。");
    }
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.edit = false;
        todo.text = updateText;
      } else {
        todo.disabled = false;
      }
      return todo;
    });
    setTodos(newTodos);

    await updateDoc(doc(db, `users`, `${uid}`, `todos`, `${id}`), {
      text: updateText,
      edit: false,
    });
    setUpdateText("");
  };

  const handleEdit = async (id: number | string, text: string) => {
    setUpdateText(text);
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.edit = true;
      } else {
        todo.disabled = true;
      }
      return todo;
    });

    setTodos(newTodos);

    await updateDoc(doc(db, `users`, `${uid}`, `todos`, `${id}`), {
      edit: true,
    });
  };

  const handleDelete = async (id: number | string) => {
    if(confirm("このタスクを消してもよろしいですか？") === false) {
      return
    }
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    await deleteDoc(doc(db, "users", `${uid}`, "todos", `${id}`));
  };

  return (
    <ul className="w-full h-auto max-h-96 overflow-auto">
      {todos.map((todo, index) => (
        <li
          key={index}
          style={{backgroundColor: `${todo.bgColor}`}}
          className="w-full h-auto px-3 py-2 flex justify-between items-center bg-purple-100 rounded-md  border-l-4 border-purple-700 mb-5"
        >
          {todo.locked === false ? (
            <div onClick={() => handleLock(todo.id)}>
              <LockOpen />
            </div>
          ) :(
            <div onClick={() => handleOpenLock(todo.id)}>
              <Lock />
            </div>
          )}
          {todo.edit ? (
            <input
              type="text"
              className="inline-block w-3/5 h-auto mx-auto break-words text-lg font-bold tracking-widest text-center border-2 border-purple-700 rounded-md outline-2 outline-purple-700"
              value={updateText}
              onChange={(e) => setUpdateText(e.target.value)}
              autoFocus={true}
              disabled={todo.disabled}
            />
          ) : (
            <p className="display: inline-block w-3/5 h-auto mx-auto break-words text-lg font-bold tracking-widest">
              {todo.text}
            </p>
          )}
          <div>
            {todo.edit ? (
              <button onClick={() => handleSave(todo.id, todo.text)}>
                <EditOff className="text-blue-500 hover:opacity-70 mr-3"></EditOff>
              </button>
            ) : (
              <button onClick={() => handleEdit(todo.id, todo.text)} disabled={todo.disabled}>
                <Edit className="text-blue-500 hover:opacity-70  mr-3" ></Edit>
              </button>
            )}

            <button onClick={() => handleDelete(todo.id)} disabled={todo.disabled}>
              <Delete className="text-red-500 hover:opacity-70"></Delete>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Todolist;
