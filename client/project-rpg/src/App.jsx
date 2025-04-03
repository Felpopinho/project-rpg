import { useEffect, useState } from 'react'
import { Box, ThemeProvider } from '@mui/material'
import { Login } from './Pages/Login.jsx'
import { Signin } from './Pages/Signin.jsx'
import { Home } from './Pages/Home.jsx'
import { FormPersonagem } from './Pages/FormPersonagem.jsx'
import axios from "axios"
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom'
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

  const url = import.meta.env.URL

  const [users, setUsers] = useState("")
  const [user, setUser] = useState("")
  const [logado,  setLogado] = useState(false)

  const getUsers = async () =>{
    try {
        await axios.get(baseURL+"/usuarios").then(res=>{
            res.data.forEach(usuario => {
                if(localStorage.getItem(usuario.email)!==null){
                    setUser([usuario])
                } else{
                    return
                }
            });
        })
    } catch (error) {
        console.log(error)
    }
  }
  const setLogin = ()=>{
    if(user !== ""){
      setLogado(true)
    } else{
      setLogado(false)
    }
  }

  const getMode = () =>{
    const tailwindMode = localStorage.getItem("tailwind-mode")
    if(tailwindMode === "dark"){
      document.querySelector("html").classList.add("dark")
    } else{
      document.querySelector("html").classList.remove("dark")
    }
  }

  const [classes, setClasses] = useState("")
  const [races, setRaces] = useState("")
  const [backgrounds, setBackgrounds] = useState("")

  const getClasses = async () =>{
    try {
        await axios.get("https://api.open5e.com/v1/classes/").then(res =>{
            setClasses(res.data)

        })
    } catch (error) {
        console.log(error)
    }
  }
  const getRaces = async () =>{
      try {
          await axios.get("https://api.open5e.com/v2/races/").then(res =>{
              setRaces(res.data)
          })
      } catch (error) {
          console.log(error)

      }
  }
  const getBackgrounds = async () =>{
      try {
          await axios.get("https://api.open5e.com/v2/backgrounds/").then(res =>{
              setBackgrounds(res.data)
          })
      } catch (error) {
          console.log(error)
      }
  }

  useEffect(()=>{
    getUsers()
    getMode()
    getClasses()
    getRaces()
    getBackgrounds()
  }, [])
  useEffect(()=>{
    setLogin()
  }, [user])


  return (
    <ThemeProvider theme={modo} defaultMode='light'>
    <div>
      <HashRouter>
        <Routes>
          <Route path={`/`} element={<Login logado={logado} user={user} setUser={setUser}/>}/>
          <Route path={`/signin`} element={<Signin setUser={setUser}/>}/>
          <Route path={`/home`} element={<Home user={user}/>}/>
          <Route path={`/form-personagem`} element={<FormPersonagem user={user} setUser={setUser} classes={classes} races={races} backgrounds={backgrounds}/>}/>
        </Routes>
      </HashRouter>
    </div>
    </ThemeProvider>
  )
}

export default App
