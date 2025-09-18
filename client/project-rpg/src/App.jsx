import { useEffect, useState } from 'react'
import { Login } from './Pages/Login.jsx'
import { Signin } from './Pages/Signin.jsx'
import { Home } from './Pages/Home.jsx'
import { FormPersonagem } from './Pages/FormPersonagem.jsx'
import { Ficha } from './Pages/Ficha.jsx'
import axios from "axios"
import { Routes, Route, HashRouter } from 'react-router-dom'
import { useColorScheme } from '@mui/material/styles';

if(localStorage.getItem("historicoDados") === null){
  localStorage.setItem("historicoDados", JSON.stringify({result: []}))
}
if(localStorage.getItem("mui-mode") === null){
  localStorage.setItem("mui-mode", "light")
}


export const baseURL = 'https://projectrpg-api.vercel.app'

function App() {

  const {mode, setMode} = useColorScheme();

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

  const [personagens, setPersonagens] = useState("")
  const [actualPers, setActualPers] = useState("")

  const [classes, setClasses] = useState("")
  const [races, setRaces] = useState("")
  const [backgrounds, setBackgrounds] = useState("")
  const [equipamentos, setEquipamentos] = useState("")
  const [armaduras, setArmaduras] = useState("")
  const [armas, setArmas] = useState("")
  const [equipamentosAventura, setEquipamentosAventura] = useState("")
  const [ferramentas, setFerramentas] = useState("")

  const getClasses = async () =>{
    try {
        await axios.get(baseURL+"/dnd/classes").then(res =>{
            setClasses(res.data)
            console.log(res.data)
        })
    } catch (error) {
        console.log(error)
    }
  }
  const getRaces = async () =>{
      try {
          await axios.get(baseURL+"/dnd/racas").then(res =>{
              setRaces(res.data)
              console.log(res.data)
          })
      } catch (error) {
          console.log(error)

      }
  }
  const getBackgrounds = async () =>{
      try {
          await axios.get(baseURL+"/dnd/antecedentes").then(res =>{
              setBackgrounds(res.data)
              console.log(res.data)
          })
      } catch (error) {
          console.log(error)
      }
  }
  const getEquipamentos = async () =>{
    try {
      await axios.get(baseURL+"/dnd/equipamentos").then(res =>{
          console.log(res.data)
          setArmaduras(res.data[0].armaduras)
          setArmas(res.data[1].armas)
          setEquipamentosAventura(res.data[2]["equipamentos-aventura"])
          setFerramentas(res.data[3].ferramentas)
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
    equipamentos === "" ? getEquipamentos() : ""
  }, [])

  useEffect(()=>{
    setLogin()
  }, [user])


  return (
    
    <div>
      <HashRouter>
        <Routes>
          <Route path={`/`} element={<Login logado={logado} user={user} setUser={setUser} setMode={setMode}/>}/>
          <Route path={`/signin`} element={<Signin setUser={setUser}/>}/>
          <Route path={`/home/*`} element={<Home user={user} personagens={personagens} classes={classes} races={races} backgrounds={backgrounds} setPersonagens={setPersonagens} setActualPers={setActualPers} setMode={setMode}/>}/>
          <Route path={`/form-personagem`} element={<FormPersonagem user={user} setUser={setUser} classes={classes} races={races} backgrounds={backgrounds} setMode={setMode}/>}/>
          <Route path={`/ficha`} element={<Ficha user={user} pers={actualPers} classes={classes} races={races} backgrounds={backgrounds} setActualPers={setActualPers} armaduras={armaduras} armas={armas} equipamentosAventura={equipamentosAventura} ferramentas={ferramentas} setMode={setMode}/>}/>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
