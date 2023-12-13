import React, { useState } from 'react'
import login from '../../assets/login.png'
import google from '../../assets/google.png'
import { Link, useNavigate } from 'react-router-dom'
import { RiEyeFill,RiEyeCloseFill } from 'react-icons/ri'
import { getAuth,signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup  } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { userLoginInfo } from '../../Slices/userSlice'

const Login = () => {
    const dispatch = useDispatch();
    const auth = getAuth();
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const [success,setSuccess] = useState('');
    const [error,setError] = useState('');

    const [ShowPassword,SetShowPassword] = useState(false)
    const [Password,SetPassword] = useState('');
    const [PasswordErr,SetPasswordErr] = useState('');
    const handlePassword = (e)=>{
        SetPassword(e.target.value);
        SetPasswordErr('');
    }

    const [Email,SetEmail] = useState('');
    const [EmailErr,SetEmailErr] = useState('');
    const handleEmail = (e)=>{
        SetEmail(e.target.value);
        SetEmailErr('')
    }

    const handleGoogleSignIn = () =>{
        signInWithPopup(auth, provider)
        .then(() => {
            setTimeout(()=>{
                navigate('/home')
            },2000)
        }).catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
        });
    }

    const handleSignIn = ()=>{
        console.log('registration done');
        if (!Email) {
            SetEmailErr('Email is Required');
        }else{
            if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email)){
                SetEmailErr('Email is Invalid');
            }
        }
        if (!Password) {
            SetPasswordErr('Password is Required')
        }

        if (Email && Password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email)) {
            signInWithEmailAndPassword(auth, Email, Password)
            .then((user) => {
            toast.success('Logged In')
            console.log(user.user, 'user');
            dispatch(userLoginInfo(user))
            localStorage.setItem('userLoginInfo',JSON.stringify((user)))
            setError('');
            setTimeout(()=>{
                navigate('/home')
            },2000)
        })
            .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            if (errorCode.includes('auth/invalid-credential')) {
                setError('Please provide your right email and password');
            }
        });
        }
    }


  return (
    <div className='flex'>
        <div className='w-1/2'>

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

            <div className='mt-[220px] ml-[150px]'>
                <h2 className='text-[#03014C] font-sans font-bold text-[34px] ml-[35px]'>Login to your account!</h2>

                <div onClick={handleGoogleSignIn} className='px-[34px] mt-[30px] mr-[500px] cursor-pointer'> 
                    <div className='flex px-[30px] py-[24px] rounded-lg shadow-lg'>
                        <img className='object-contain' src={google} alt="" />
                        <p className='px-[10px] font-sans text-[14px] font-semibold cursor-pointer text-[#03014C]'>Login with Google</p>
                    </div>
                    {
                        error && 
                        <p className='font-nun font-semibold w-96 text-[16px] bg-red-500 rounded-lg mt-[10px] text-white p-3'>{error}</p>
                    }
                </div>

                <div className='relative mt-[60px] w-96 ml-[35px]'>
                    <input onChange={handleEmail} value={Email} className='w-full border-b border-[#b8bacf] outline-none py-[26px] text-[16px] text-[#11175D] font-semibold' type="text" />
                    <p className='absolute top-[-10px] bg-white text-[13px] font-nun font-sembold tracking-[1px]'>Email Address</p>
                    {
                        EmailErr && 
                        <p className='font-nun font-semibold w-96 text-[16px] bg-red-500 rounded-lg mt-[10px] text-white p-3'>{EmailErr}</p>
                    }
                </div>
                
                <div className='relative mt-[60px] w-96 ml-[35px]'>
                    <input onChange={handlePassword} value={Password} className='w-full border-b border-[#b8bacf] outline-none py-[26px] text-[16px] text-[#11175D] font-semibold' type={ ShowPassword ? 'text': 'password' } />
                    <p className='absolute top-[-10px] bg-white text-[13px] font-nun font-sembold tracking-[1px]'>Password</p>
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

                <div className='mt-[50px] ml-[35px]'>
                    <button onClick={handleSignIn} className='bg-[#5F35F5] w-96 text-center rounded-full font-nun font-semibold text-white p-[20px] cursor-pointer '>Login to Continue</button>
                </div>

                <div className='ml-[55px] mt-[35px]'>
                    <p className='text-[13px] text-[#03014C] font-sans'>Don't have an account ? <span className='font-sans font-bold text-[#EA6C00]'> <Link to='/registration'> Sign Up</Link></span></p>
                </div>
                
                <div className='ml-[55px] mt-[10px]'>
                    <p className='font-sans font-bold text-[#EA6C00] text-[13px]'> <Link to='/forgotpassword'> Forgot Password</Link></p>
                </div>

            </div>

        </div>

        <div className='w-1/2'>
            <img className='w-full h-screen object-cover' src={login} alt=""/>
        </div>
    </div>
  )
}

export default Login