import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'


// importing pages and components
import './App.css'
import Main from './pages/Main'
import Register from './pages/register'
import Login from './pages/login'
import Dashboard from './pages/Dashboard'
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

function AppRoutes() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const loginWithToken = async (token_stored) => {
    console.log("🔑 Trying token login with token:", token_stored)

    try {
      const res = await axios.post("http://localhost:3000/tokenlogin", { token: token_stored })
      if (res.data?.user) {
        console.log("✅ Token login successful. User:", res.data.user)
        setUser(res.data.user)
        // navigate("/")
      } else {
        console.log("❌ Token login failed. No user returned.")
        navigate("/login")
      }
    } catch (e) {
      console.error("🚨 Login failed with token:", e)
      navigate("/login")
    }
  }

  useEffect(() => {
    const token_stored = localStorage.getItem("token")
    if (token_stored) {
      loginWithToken(token_stored)
    } else {
      console.log("⚠️ No token found in localStorage")
    }
  }, [])

  useEffect(() => {
    console.log("👤 Current user state is:", user)
  }, [user])

  const register = async (username, email, password) => {
    console.log("📝 Attempting register with:", { username, email })
    try {
      const res = await axios.post("http://localhost:3000/register", { username, email, password })
      console.log("✅ Register response:", res.data)

      localStorage.setItem("token", res.data?.token)
      console.log("📦 Saved token to localStorage:", res.data?.token)

      setUser(res.data.user) // if backend returns user along with token
      console.log("👤 User saved after register:", res.data.user)

      navigate("/")
    } catch (err) {
      console.error("🚨 Register failed:", err.response?.data?.message)
      document.querySelector("#exist").style.display = "block"
      document.querySelector("#exist_text").textContent = err.response?.data?.message || "Error"
    }
  }

  const login = async (username, password) => {
    console.log("🔐 Attempting login with:", { username })
    try {
      const res = await axios.post("http://localhost:3000/login", { username, password })
      console.log("✅ Login response:", res.data)

      localStorage.setItem("token", res.data.token)
      console.log("📦 Saved token to localStorage:", res.data.token)

      setUser(res.data.user) // if backend returns user
      console.log("👤 User saved after login:", res.data.user)

      navigate("/")
    } catch (err) {
      console.error("🚨 Login failed:", err.response?.data?.message)
      document.querySelector("#exist").style.display = "block"
      document.querySelector("#exist_text").textContent = err.response?.data?.message || "Error"
    }
  }

  const setUserOut = () => {
    setUser(null)
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <Routes>
      <Route path="/" element={<Main user={user} setUserOut={setUserOut} />} />
      <Route path="/register" element={<Register register={register} user={user} />} />
      <Route path="/login" element={<Login login={login} user={user} />} />
      <Route path="/Dashboard" element={<Dashboard user={user} />} />
    </Routes>
  )
}

export default App
