import React, { useState } from 'react'
import registration from '../../assets/registration.png'
import { RiEyeFill,RiEyeCloseFill } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";



const Registration = () => { 
    const db = getDatabase();
    const auth = getAuth();
    const navigate = useNavigate()
    const [success,setSuccess] = useState('')
    
    const [ShowPassword,SetShowPassword] = useState(false)
    const [Password,SetPassword] = useState('');
    const [PasswordErr,SetPasswordErr] = useState('');
    const handlePassword = (e)=>{
        SetPassword(e.target.value);
        SetPasswordErr('');
    }

    const [FullName,SetFullName] = useState('');
    const [FullNameErr,SetFullNameErr] = useState('');
    const handleFullName = (e)=>{
        SetFullName(e.target.value);
        SetFullNameErr('');
    }

    const [Email,SetEmail] = useState('');
    const [EmailErr,SetEmailErr] = useState('');
    const handleEmail = (e)=>{
        SetEmail(e.target.value);
        SetEmailErr('')
    }

    const handleSignUp = ()=>{
        console.log('registration done');
        if (!Email) {
            SetEmailErr('Email is Required');
        }else{
            if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(Email)){
                SetEmailErr('Email is Invalid');
            }
        }
        if (!FullName) {
            SetFullNameErr('Full Name is Required')
        }
        if (!Password) {
            SetPasswordErr('Password is Required')
        }else if(!/^(?=.*[a-z])/.test(Password)){
            SetPasswordErr('The string must contain at least 1 lowercase alphabetical character')
        }else if(!/^(?=.*[A-Z])/.test(Password)){
            SetPasswordErr('The string must contain at least 1 uppercase alphabetical character')
        }else if(!/^(?=.*[0-9])/.test(Password)){
            SetPasswordErr('The string must contain at least 1 numeric character')
        }else if(!/^(?=.{8,})/.test(Password)){
            SetPasswordErr('The string must contain at least 1 numeric character')
        }
        if (Email && FullName && Password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(Email)) {
            createUserWithEmailAndPassword(auth, Email, Password)
            .then((user) => {
                updateProfile(auth.currentUser, {
                    displayName: FullName,
                    photoURL: './src/assets/profile.png'
                }).then(() => {
                    sendEmailVerification(auth.currentUser)
                    console.log(user, 'user');
                    toast.success('registration done & please verify your email');
                    SetEmail('');
                    SetFullName('');
                    SetPassword('');
                    setTimeout(()=>{
                    navigate('/login')
                },2000)
            })     .then(()=>{
                set(ref(db, 'users/' + user.user.uid ), {
                    username: user.user.displayName,
                    email: user.user.email,
                 });
            })  
        })
            .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            if (errorCode.includes('auth/email-already-in-use')) {
                SetEmailErr('Email is already used');
            }
        });
        }
        
    }

  return (
    <div className='flex'>
        <div className='w-1/2 flex justify-end mr-[69px]'>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <div className='mt-[150px]'>
                <h2 className='text-[#11175D] text-[34px] font-bold font-nun'>Get started with easily register</h2>
                <p className='text-[#7f7f7f] text-[20px] opacity-[0.5] font-nun'>Free register <span className='text-[#808080] opacity-[0.5]'>and</span> you can enjoy it</p>
                

                <div className='relative mt-[60px] w-96'>
                    <input onChange={handleEmail} value={Email} className='w-full border border-[#b8bacf] outline-none rounded-lg py-[26px] px-[52px] text-[16px] text-[#11175D] font-semibold' type="text" />
                    <p className='absolute top-[-10px] left-[34px] px-[18px] bg-white text-[13px] font-nun font-sembold tracking-[1px]'>Email Address</p>
                    {
                        EmailErr && 
                        <p className='font-nun font-semibold w-96 text-[16px] bg-red-500 rounded-lg mt-[10px] text-white p-3'>{EmailErr}</p>
                    }
                </div>
                
                <div className='relative mt-[60px] w-96'>
                    <input onChange={handleFullName} value={FullName} className='w-full border border-[#b8bacf] outline-none rounded-lg py-[26px] px-[52px] text-[16px] text-[#11175D] font-semibold' type="text" />
                    <p className='absolute top-[-10px] left-[34px] px-[18px] bg-white text-[13px] font-nun font-sembold tracking-[1px]'>Full Name</p>
                    {
                        FullNameErr && 
                        <p className='font-nun font-semibold w-96 text-[16px] bg-red-500 rounded-lg mt-[10px] text-white p-3'>{FullNameErr}</p>
                    }
                </div>
                
                <div className='relative mt-[60px] w-96'>
                    <input onChange={handlePassword} value={Password} className='w-full border border-[#b8bacf] outline-none rounded-lg py-[26px] px-[52px] text-[16px] text-[#11175D] font-semibold' type={ ShowPassword ? 'text' : 'password' } />
                    <p className='absolute top-[-10px] left-[34px] px-[18px] bg-white text-[13px] font-nun font-sembold tracking-[1px]'>Password</p>
                    {
                        ShowPassword ? 
                        <RiEyeFill onClick={()=> SetShowPassword(!ShowPassword)} className='absolute top-[30px] right-[10px]'/>
                        :
                        <RiEyeCloseFill onClick={()=> SetShowPassword(!ShowPassword)} className='absolute top-[30px] right-[10px]'/>
                    }
                    {
                        PasswordErr && 
                        <p className='font-nun font-semibold w-96 text-[16px] bg-red-500 rounded-lg mt-[10px] text-white p-3'>{PasswordErr}</p>
                    }
                </div>

                <div className='mt-[50px]'>
                    <button onClick={handleSignUp} className='bg-[#5F35F5] w-96 text-center rounded-full font-nun font-semibold text-white p-[20px] cursor-pointer '>Sign Up</button>
                </div>

                <div className='ml-[75px] mt-[35px]'>
                    <p className='text-[13px] text-[#03014C] font-sans'>Already  have an account ? <span className='font-sans font-bold text-[#EA6C00]'><Link to='/login'> Sign In</Link></span></p>
                </div>

            </div>
        </div>

        <div className='w-1/2'>
            <img className='w-full h-screen object-cover' src={registration} alt="" />
        </div>
    </div>
  )
}

export default Registration