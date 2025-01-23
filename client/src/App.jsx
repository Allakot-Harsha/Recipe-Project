import {BrowserRouter, Routes,Route} from "react-router-dom"
import "./App.css"
import { ActivationPage, Login, Signup } from "./Routes"
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path ="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/activation/:activation_token" element={<ActivationPage/>}/>
    </Routes>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition= "Bounce"
      />
    </BrowserRouter>
  )
}

export default App