import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { server } from '../server';
import axios from "axios";

const ActivationComponent = () => {
    //destructuring the activation token from the link
    const {activation_token}= useParams();
    const [error, setError] = useState(false);
    //we use useEffect , so when the page is rendeered or when the user enters the page itself the api should be called.
    useEffect(()=>{
        if(activation_token){
            const sendRequest = async ()=> {
                await axios.post(`${server}/activation`,{
                    activation_token,
                }).then((res)=>{
                    console.log(res);                    
                }).catch((err)=>{
                    console.log(err);
                    setError(err);                    
                });                
            };
            sendRequest();
        }
    },[]);
    
  return (
    <div style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}>
        {
            error ?(
                <p> Your token is Expired</p>
            ):(
                <p>Your account is created</p>
            )
        }
    </div>
  )
}

export default ActivationComponent