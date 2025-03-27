import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { Login } from './Pages/Login.jsx'
import { Signin } from './Pages/Signin.jsx'
import { Home } from './Pages/Home.jsx'
import axios from "axios"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export const baseURL = 'https://projectrpg-api.vercel.app'

function App() {

  const [users, setUsers] = useState("")

  const [user, setUser] = useState("")

  const getUser = async () =>{
    try {
      await axios.get(baseURL+'/usuarios').then(res=>{
        setUsers(res.data)
        console.log(res.data)
      })
    } catch (e) {
      console.log(e)
    }
  }

  //useEffect(()=>{
  //  getUser()
  //}, [])

  return (
    <Box className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login setUser={setUser}/>}/>
          <Route path='/signin' element={<Signin setUser={setUser}/>}/>
          <Route path='/home' element={<Home user={user}/>}/>
        </Routes>
      </BrowserRouter>
    </Box>
  )
}

export default App
