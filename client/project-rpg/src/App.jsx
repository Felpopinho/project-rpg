import { useEffect, useState } from 'react'
import { Box, ThemeProvider } from '@mui/material'
import { Login } from './Pages/Login.jsx'
import { Signin } from './Pages/Signin.jsx'
import { Home } from './Pages/Home.jsx'
import { FormPersonagem } from './Pages/FormPersonagem.jsx'
import axios from "axios"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createTheme, useColorScheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const modo = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#f44336',
    },
  },
  colorSchemes:{
    dark:true
  },
});

export const baseURL = 'https://projectrpg-api.vercel.app'

function App() {

  const [users, setUsers] = useState("")
  const [user, setUser] = useState("")
  const [logado,  setLogado] = useState(false)

  //const getUser = () =>{
  //  Object.keys(localStorage).forEach(key =>{
  //    setUser(JSON.parse(localStorage.getItem(key)))
  //  })
  //  setLogado(true)
  //}
  const getMode = () =>{
    const tailwindMode = localStorage.getItem("tailwind-mode")
    if(tailwindMode === "dark"){
      document.querySelector("html").classList.add("dark")
    } else{
      document.querySelector("html").classList.remove("dark")
    }
  }
//
//
  useEffect(()=>{
  //  getUser()
      getMode()
  }, [])


  return (
    <ThemeProvider theme={modo} defaultMode='light'>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login logado={logado} user={user} setUser={setUser}/>}/>
          <Route path='/signin' element={<Signin setUser={setUser}/>}/>
          <Route path='/home' element={<Home user={user}/>}/>
          <Route path='/form-personagem' element={<FormPersonagem user={user} setUser={setUser}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </ThemeProvider>
  )
}

export default App
