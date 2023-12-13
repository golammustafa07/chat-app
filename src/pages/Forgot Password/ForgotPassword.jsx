import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { getAuth,sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
    const auth = getAuth()

    const [Email,SetEmail] = useState('');
    const [EmailErr,SetEmailErr] = useState('');
    const handleEmail = (e)=>{
        SetEmail(e.target.value);
        SetEmailErr('')
    }

    const handleReset = ()=>{
        if (!Email) {
            SetEmailErr('Email is required')
        }
        if (Email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email)) {
            sendPasswordResetEmail(auth, Email)
            .then(() => {
                console.log('Please Reset');
                SetEmail('')
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
            });
        }
    }

  return (
    <div className='h-screen w-full bg-red-600 flex justify-center items-center'>
        
        <div className='bg-white w-1/2 rounded p-5'>
            
            <h2 className='text-[#11175D] text-[34px] font-bold font-nun ml-[35px]'>Forgot Password</h2>

            <div className='relative mt-[60px] w-96 ml-[35px]'>
                <input onChange={handleEmail} value={Email} className='w-full border-b border-[#b8bacf] outline-none py-[26px] text-[16px] text-[#11175D] font-semibold' type="text" />
                <p className='absolute top-[-10px] bg-white text-[13px] font-nun font-sembold tracking-[1px]'>Email Address</p>
                {
                    EmailErr && 
                    <p className='font-nun font-semibold w-96 text-[16px] bg-red-500 rounded-lg mt-[10px] text-white p-3'>{EmailErr}</p>
                }
            </div>

            <div className='flex ml-[35px] mt-[10px]'>
                <button onClick={handleReset} className='font-nun font-semibold text-white text-[16px] p-5 rounded-lg bg-violet-600'>Reset</button>
                <Link to='/login'><button className='font-nun font-semibold text-white text-[16px] p-5 rounded-lg bg-violet-600 ml-[20px]'>Back to Login</button></Link> 
            </div>

        </div>
    </div>
  )
}

export default ForgotPassword