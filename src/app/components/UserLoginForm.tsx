import React, { useState } from 'react'
import Login from './Login'
import SignUp from './SignUp'
import { Button } from '@mui/material'


const UserLoginForm = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <main className="h-auto w-2/5 min-w-96 mt-5 mx-auto bg-purple-500 px-4 py-3 rounded-md text-center shadow-2xl">
      <h2 className="text-3xl font-bold text-white border-b-2 mt-5 mb-8 pb-2">Welcom to my TodoApp</h2>
      {isLogin === false ? (
        <div className='text-lg text-white my-10 mx-auto cursor-pointer'>
          <span className='mr-4 border-b-2 hover:opacity-60 duration-200' onClick={() => setIsLogin(false)}>
            新規登録
          </span>
          /
          <span className='ml-4 hover:opacity-60 duration-200' onClick={() => setIsLogin(true)}>
            ログイン
          </span>
        </div>
      ) : (
        <div className='text-lg text-white my-10 mx-auto cursor-pointer'>
          <div className='text-lg text-white my-10 mx-auto'>
            <span className='px-4 hover:opacity-60 duration-200' onClick={() => setIsLogin(false)}>
              新規登録
            </span>
            /
            <span className='px-4 border-b-2 hover:opacity-60 duration-200' onClick={() => setIsLogin(true)}>
              ログイン
            </span>
          </div>
        </div>
      )}
      {isLogin === false ? (
        <SignUp />
      ) : (
        <Login />
      )}
    </main>
  )
}

export default UserLoginForm