import { Avatar, Box, Button, Divider, TextField, IconButton, Icon } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Personagem } from './Personagem.jsx'
import axios from 'axios'
import { baseURL } from '../App.jsx'
import { createTheme, useColorScheme } from '@mui/material/styles';

export function Home(props){
    const navigate = useNavigate()

    const {mode, setMode} = useColorScheme()

    const trocarTema = (t) =>{
      const html = document.querySelector("html")
      if(t === "dark"){
          html.classList.add("dark")
      }else{
          html.classList.remove("dark")
      }
      localStorage.setItem("tailwind-mode", t)
      setMode(t)
    }

    const verificarLogin = () =>{
        if(props.user === ""){
            navigate("/")
        } else{
            setUsername(props.user[0].nome)
            return
        }
    }

    const [username, setUsername] = useState("")
    const [personagens, setPersonagens] = useState("")
    const [nPersonagens, setNpersonagens] = useState([])
    const [avisoPers, setAvisoPers] = useState("")

    const getPersonagens = async () =>{
        try {
            await axios.post(baseURL+"/personagens", {
                userId: props.user[0].uid
            }).then(res =>{
                setPersonagens(res.data)
                setNpersonagens(res.data)
                if(!(res.data.length)){
                    setAvisoPers("Você ainda não criou nenhum personagem")
                }
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    const pesquisarPersonagens = (e) =>{
        setNpersonagens(personagens.filter((personagem)=>
            personagem.nome.toLowerCase().startsWith(e.target.value.toLowerCase())
        ))
        if(!(nPersonagens.length)) setAvisoPers("Nenhum personagem encontrado")
    }

    useEffect(()=>{
        verificarLogin()
    },[])
    useEffect(()=>{
        getPersonagens()
    }, [props.user])

    return(<div className='bg-white min-h-dvh dark:bg-gray-900'>
        <div className="flex w-full h-20 justify-between items-center p-4">
            <div className="flex justify-between w-1/4">
                <Avatar>{username.slice(0,1)}</Avatar>
                <h1 className='text-4xl text-black font-bold dark:text-white'>Bem vindo {username}</h1>
            </div>
            <div className="flex ">
                <h1 className='text-4xl text-black font-bold dark:text-white'>Fichas D&D</h1>
            </div>
            <div className='grid grid-cols-2 gap-x-5 '>
                <IconButton onClick={()=>{trocarTema("light")}} ><Icon>light_mode</Icon></IconButton>
                <IconButton onClick={()=>{trocarTema("dark")}}><Icon>dark_mode</Icon></IconButton>
            </div>
        </div>
        <Divider sx={{margin: "2vh 0"}}/>
        <div className='flex justify-between p-4'>
            <h1 className='text-4xl text-black font-bold dark:text-white'>Fichas de personagens</h1>
            <TextField sx={{width: "40%"}} label="Pesquisar personagens" onChange={(e)=>{pesquisarPersonagens(e)}}></TextField>
            <Button variant='contained' onClick={()=>{navigate("/form-personagem")}}>Criar personagem</Button>
        </div>
        <Divider sx={{margin: "2vh 0"}}/>
        <div className='grid grid-cols-2 gap-y-20 gap-x-20 p-10'>
            {nPersonagens.length? Array.from(nPersonagens).map(personagem =>(
                <Personagem key={personagem.uid} p={personagem}/>
            )) : <h1 className='text-black dark:text-white'>{avisoPers}</h1>}
        </div>
    </div>)
}