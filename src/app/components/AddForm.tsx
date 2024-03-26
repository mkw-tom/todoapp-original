import React from 'react'

const AddForm = () => {
  return (
    <form className='w-full my-4'>
      <input type="text" className='rounded-l-md w-10/12'/>
      <button className='bg-black text-white mb-2 rounded-r-md px-2'>+</button>
      <hr/>
    </form>
  )
}

export default AddForm