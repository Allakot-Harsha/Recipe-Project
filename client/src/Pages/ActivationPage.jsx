import React from 'react'
import ActivationComponent from '../Components/ActivationComponent'
import { useParams } from 'react-router-dom'

const ActivationPage = () => {
    const {activation_token} = useParams();
  return (
    <div>
        <ActivationComponent activation_token={activation_token}/>
    </div>
  )
}

export default ActivationPage