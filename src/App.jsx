import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'

// importing axios to send request to the backend server
import axios from 'axios';



// importing pages and components
import './App.css'
import Main from './pages/Main'
import Register from './pages/register'
import Login from './pages/login'

function App() {
  const [count, setCount] = useState(0)
  // let navigate = useNavigate();
  const register = async (username, email, password) => {
    let newUser = {
      username,
      email,
      password
    }
    await axios.post('http://localhost:3000/register', newUser, {
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        //  idr token undefined aa rha ha solve kro is issue ko
        console.log(res.data, res.data.token)
        localStorage.setItem("token", res.data.token)
        // navigate("/")
      })
      .catch(err => {
        // alert(err.response.data.message)

        document.querySelector("#exist").style.display = "none"
        document.querySelector("#exist").style.display = "block"
        document.querySelector("#exist_text").textContent = err.response.data.message
      })
  }

  const login = async (username, password) => {
    let user = {
      username,
      password
    }
    await axios.post("http://localhost:3000/login", user, {
      headers : {
        "content-type" : "application/json"
      }
    })
      .then(res => {
        console.log(res.data)
        localStorage.setItem("token", res.data.token)
        navigate("/")
      })
      .catch(err => {
        document.querySelector("#exist").style.display = "none"
        document.querySelector("#exist").style.display = "block"
        document.querySelector("#exist_text").textContent = err.response.data.message
      })
    }
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Register" element={<Register register={register} />} />
          <Route path="/login" element={<Login login={login} />} />
        </Routes>
      </BrowserRouter>

    )
  }

  export default App
