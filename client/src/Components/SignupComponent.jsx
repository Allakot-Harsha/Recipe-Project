import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { server } from '../server';
import axios from "axios"
import {Link, useNavigate} from "react-router-dom";

const SignupComponent=()=> {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit =(e)=>{
        e.preventDefault();
        const config ={
            headers: {"Content-type" : "multipart/form-data"},
        };
        const newForm= new FormData();
        newForm.append("name", fullname);
        newForm.append("email",email);
        newForm.append("password",password);
        axios.post(`${server}/create-user`,newForm, config).then((res) => {
            if (res.data.success === true){
                navigate("/login");
            }
        })
        .catch((err) => console.log(err));
        
        
    }
  return (
    <div className='min-h-screen bg-emerald-200 flex flex-col justify-center py-12  sm:px-6 lg:px-8'>
        <div className="sm: mx-auto sm:w-full sm:max-w-md">
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-700'>Let's create an Account</h2>
        </div>
        <div className="mt-8 sm:w-full sm:mx-auto sm:max-w-md">
            <div className="bg-gray-700 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form className='space-y-6'>
                <div>
                        <label className='block text-sm font-medium text-white' htmlFor='fullname'>
                            Full Name</label>
                            <div className='mt-1'>
                                <input className='appearance-none block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 sm:text-sm' type='fullname' name='fullname' required autoComplete='fullname' placeholder='Fullname' value={fullname} 
                                onChange={(e)=>setFullname(e.target.value)}/>
                            </div>
                    </div>
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
                        <div className='text-sm'>
                            <a href='login' className='font-medium  text-white hover:text-gray-300 p-10'>Already have an account</a>
                        </div>
                    </div>
                    </div>
                    <button type='submit' className='group relative justify-center w-full h-[40px] flex py-2 px-4 border-transparent text-sm  font-medium
                    rounded-md bg-orange-400 text-white hover:bg-orange-500' onClick={handleSubmit}>Sign Me Up!</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignupComponent        