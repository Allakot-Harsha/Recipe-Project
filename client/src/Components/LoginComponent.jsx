import React, { useState } from 'react'
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { server } from '../server';
import {toast}  from 'react-toastify';
import {useNavigate} from "react-router-dom";



const LoginComponent = () => {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();//we can only use Usenavigate with its instance, that's why we create instance

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(email, password);
        
        await axios.post(`${server}/login-user`,{
            email,
            password,
        },
    {
        withCredentials: true,
    }).then((res)=>{
        toast.success('login successfull');
        //window.location.reload();//forcefully reloading the page
        navigate("/");
    }).catch((err)=>{
        toast.error(err.message);
        console.log(err);
        
    });
    }
  return (
    <div className='min-h-screen bg-emerald-200 flex flex-col justify-center py-12  sm:px-6 lg:px-8'>
        <div className="sm: mx-auto sm:w-full sm:max-w-md">
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-700'>What's Cooking Today?</h2>
        </div>
        <div className="mt-8 sm:w-full sm:mx-auto sm:max-w-md">
            <div className="bg-gray-700 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form className='space-y-6' onSubmit={handleSubmit}>
                    <div>
                        <label className='block text-sm font-medium text-white' htmlFor='email'>
                            Email Address</label>
                            <div className='mt-1'>
                                <input className='appearance-none block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 sm:text-sm' type='email' name='email' required autoComplete='email' placeholder='Email' value={email} 
                                onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-white' htmlFor='password'>
                            Password</label>
                            <div className='mt-1 relative'>
                                <input className='appearance-none block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 sm:text-sm '
                                value={password} onChange={(e)=>setPassword(e.target.value)} type={visible?"text":"password"} name='password' required autoComplete='current-password' placeholder='Password'/>
                                {
                                    visible ? (
                                    <AiOutlineEye 
                                    className='absolute right-2 top-2 cursor-pointer text-white' size={25}
                                    onClick={()=>setVisible(false)}/>
                                ):(
                                <AiOutlineEyeInvisible 
                                className='absolute right-2 top-2 cursor-pointer  text-white' size={25}
                                onClick={()=>setVisible(true)}/>
                                    )
                                }
                            </div>
                    </div>
                    <div>
                    <div className='px-2 py-2 rounded-md flex items-center justify-center'>
                        <div className='flex items-center'>
                            <input
                            type='checkbox'
                            name='remember-me'
                            id='remember-me'
                            className='h-4 w-4 text-white border-gray-300 rounded'/>
                            <label htmlFor='remember-me'
                            className='ml-2 block text-sm text-white' >Remember me</label>
                        </div>
                        <div className='text-sm'>
                            <a href='=/forgot-password' className='font-medium  text-white hover:text-gray-300 p-10'>Forgot your Password?</a>
                        </div>
                    </div>
                    </div>
                    <button type='submit' className='group relative justify-center w-full h-[40px] flex py-2 px-4 border-transparent text-sm  font-medium
                    rounded-md bg-orange-400 text-white hover:bg-orange-500'>Let's Cook</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default LoginComponent