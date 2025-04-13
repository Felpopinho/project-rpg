import { useEffect, useState } from 'react'
import { Box, ThemeProvider } from '@mui/material'
import { Login } from './Pages/Login.jsx'
import { Signin } from './Pages/Signin.jsx'
import { Home } from './Pages/Home.jsx'
import { FormPersonagem } from './Pages/FormPersonagem.jsx'
import { Ficha } from './Pages/Ficha.jsx'
import axios from "axios"
import { Routes, Route, HashRouter } from 'react-router-dom'
import modo from './theme.js'

if(localStorage.getItem("historicoDados") === null){
  localStorage.setItem("historicoDados", JSON.stringify({result: []}))
}
if(localStorage.getItem("mui-mode") === null){
  localStorage.setItem("mui-mode", "light")
}


export const baseURL = 'https://projectrpg-api.vercel.app'

function App() {

  const [users, setUsers] = useState("")
  const [user, setUser] = useState("")
  const [logado,  setLogado] = useState(false)

  if(localStorage.getItem("historicoDados") === null){
    localStorage.setItem("historicoDados", JSON.stringify({result: []}))
  }

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

  const [personagens, setPersonagens] = useState("")
  const [actualPers, setActualPers] = useState("")

  const [classes, setClasses] = useState("")
  const [races, setRaces] = useState("")
  const [backgrounds, setBackgrounds] = useState("")

  const [formDisabled, setFormDisabled] = useState(0)

  const getClasses = async () =>{
    try {
        await axios.get("https://api.open5e.com/v1/classes/").then(res =>{
            setClasses(res.data)
            setFormDisabled(formDisabled + 1)
            console.log(res.data)
        })
    } catch (error) {
        console.log(error)
    }
  }
  const getRaces = async () =>{
      try {
          await axios.get("https://api.open5e.com/v2/races/").then(res =>{
              setRaces(res.data)
              setFormDisabled(formDisabled + 1)
          })
      } catch (error) {
          console.log(error)

      }
  }
  const getBackgrounds = async () =>{
      try {
          await axios.get("https://api.open5e.com/v2/backgrounds/").then(res =>{
              setBackgrounds(res.data)
              setFormDisabled(formDisabled + 1)
          })
      } catch (error) {
          console.log(error)
      }
  }

  useEffect(()=>{
    getUsers()
    getMode()
    classes === "" ? getClasses() : ""
    races === "" ? getRaces() : ""
    backgrounds === "" ? getBackgrounds() : ""
  }, [])

  useEffect(()=>{
    setLogin()
  }, [user])


  return (
    
    <div>
      <HashRouter>
        <Routes>
          <Route path={`/`} element={<Login logado={logado} user={user} setUser={setUser}/>}/>
          <Route path={`/signin`} element={<Signin setUser={setUser}/>}/>
          <Route path={`/home/*`} element={<Home user={user} personagens={personagens} setPersonagens={setPersonagens} formDisabled={formDisabled} setActualPers={setActualPers}/>}/>
          <Route path={`/form-personagem`} element={<FormPersonagem user={user} setUser={setUser} classes={classes} races={races} backgrounds={backgrounds}/>}/>
          <Route path={`/ficha`} element={<Ficha user={user} pers={actualPers} classes={classes} races={races} backgrounds={backgrounds} setActualPers={setActualPers}/>}/>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
