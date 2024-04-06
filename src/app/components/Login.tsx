import React, { useState } from 'react'
import { EmailSignUp, GitHubSignUp, GoogleSignUp } from '../firebase/authentication';
import { Email, GitHub, Google } from '@mui/icons-material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from '@mui/material';
import { auth } from '../firebase/firebase';



const Login = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');


  return (
    <div className="flex-col w-11/12 h-auto mx-auto">
      <button
        onClick={GoogleSignUp}
        className="block bg-blue-600 text-white w-full h-12 rounded-md mb-3 hover:opacity-60"
      >
        Login with Google<span className="ml-2"><Google></Google></span>
      </button>
      <button
        onClick={GitHubSignUp}
        className="block bg-black text-white w-full h-12 rounded-md mb-3 hover:opacity-70"
      >
        Login with GitHub<span className="ml-2"><GitHub></GitHub></span>
      </button>
      <hr />
      <p className='mt-8 mb-3 text-yellow-200 text-lg'>Login with email <span className='ml-2'><Email></Email></span></p>
      <form className="w-full flex-col justify-center">
        <input type="text" placeholder=" email" className="inline-block w-4/5 mb-3" onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder=" password" className="inline-block w-4/5" onChange={(e) => setPassword(e.target.value)} />
        <a onClick={() => EmailSignUp(email, password)} className='block'><Button>login</Button></a>
      </form>
    </div>
  )
}

export default Login