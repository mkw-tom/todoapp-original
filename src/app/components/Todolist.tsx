import React from 'react'
import Todo from './Todo'

type Props = {}

const Todolist = () => {
  return (
    <ul className='w-full h-auto max-h-96'>
      <Todo />
    </ul>
  )
}

export default Todolist