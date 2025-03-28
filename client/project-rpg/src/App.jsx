import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { Login } from './Pages/Login.jsx'
import { Signin } from './Pages/Signin.jsx'
import { Home } from './Pages/Home.jsx'
import { FormPersonagem } from './Pages/FormPersonagem.jsx'
import axios from "axios"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export const baseURL = 'https://projectrpg-api.vercel.app'

function App() {

  const [users, setUsers] = useState("")
  const [user, setUser] = useState("")
  const [logado,  setLogado] = useState(false)

  const getUser = () =>{
    Object.keys(localStorage).forEach(key =>{
      setUser(JSON.parse(localStorage.getItem(key)))
    })
    setLogado(true)
  }


  useEffect(()=>{
    getUser()
  }, [])


  return (
    <Box >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login logado={logado} user={user} setUser={setUser}/>}/>
          <Route path='/signin' element={<Signin setUser={setUser}/>}/>
          <Route path='/home' element={<Home user={user}/>}/>
          <Route path='/form-personagem' element={<FormPersonagem user={user}/>}/>
        </Routes>
      </BrowserRouter>
    </Box>
  )
}

export default App
