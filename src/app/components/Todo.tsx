import { Delete, Edit } from '@mui/icons-material'

const Todo = () => {
  return (
    <li className='w-full h-auto px-3 py-2 flex justify-between items-center bg-gray-100 rounded-md  border-l-4 border-black' >
      <p className='display: inline-block w-3/5 h-auto mx-auto break-words text-lg font-bold tracking-widest'>プログラミング</p>
      <div>
        <Edit className='text-blue-500 hover:opacity-70 active:text-lg mr-3'></Edit>
        <Delete className='text-red-500 hover:opacity-70 active:text-lg'></Delete>
      </div>
    </li>
  )
}

export default Todo