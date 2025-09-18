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
            props.setActualPers("")
            localStorage.removeItem("personagem")
            return
        }
    }

    const [username, setUsername] = useState("")
    const [nPersonagens, setNpersonagens] = useState([])
    const [avisoPers, setAvisoPers] = useState("")

    const getPersonagens = async () =>{
        try {
            await axios.post(baseURL+"/personagens", {
                userId: props.user[0].uid
            }).then(res =>{
                if(!(res.data.length)){
                    return setAvisoPers("Você ainda não criou nenhum personagem")
                }
                props.setPersonagens(res.data)
                setNpersonagens([res.data])
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    const pesquisarPersonagens = (e) =>{
        setNpersonagens(props.personagens.filter((personagem)=>
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

    return(<div className='min-h-dvh'>
        <div className="flex w-full text-nowrap h-20 justify-between items-center p-4 max-md:grid grid-rows-2 grid-cols-2 h-auto place-content-between gap-5">
            <div className="flex gap-x-5 max-md:col-span-2 justify-self-center">
                <Avatar>{username.slice(0,1)}</Avatar>
                <h1 className='text-4xl text-black font-bold max-md:text-3xl dark:text-white '>Bem vindo {username}</h1>
            </div>
            <div className="flex max-md:col-start-2 row-start-2 justify-self-end">
                <h1 className='text-4xl text-black font-bold max-md:text-3xl dark:text-white '>Fichas D&D</h1>
            </div>
            <div className='grid grid-cols-2 gap-x-5 max-md:flex'>
                <IconButton onClick={()=>{trocarTema("light")}} ><Icon>light_mode</Icon></IconButton>
                <IconButton onClick={()=>{trocarTema("dark")}}><Icon>dark_mode</Icon></IconButton>
            </div>
        </div>
        <Divider sx={{margin: "2vh 0"}}/>
        <div className='flex justify-between items-center p-4 gap-x-10 max-lg:grid grid-cols-2 items-center gap-y-5'>
            <h1 className='text-4xl text-black font-bold dark:text-white text-nowrap max-lg:col-start-1 max-md:text-3xl'>Fichas</h1>
            <TextField fullWidth label="Pesquisar personagens" className='max-lg:col-span-2' onChange={(e)=>{pesquisarPersonagens(e)}}></TextField>
            <div className='flex self-stretch max-lg:col-start-2 row-start-1 justify-self-end'>
                <Button loading={!(props.classes.length) && !(props.races.length) && !(props.backgrounds.length)} variant='contained' onClick={()=>{navigate("/form-personagem")}}><Icon>note_add</Icon></Button> 
            </div>
        </div>
        <Divider sx={{margin: "2vh 0"}}/>
        <div className='grid grid-cols-2 gap-y-20 gap-x-20 p-10 max-lg:grid-cols-1'>
            {nPersonagens.length ? <Personagem personagens={nPersonagens} setActualPers={props.setActualPers} getPersonagens={getPersonagens} avisoPers={avisoPers}/> : <h1 className='text-black text-3xl dark:text-white'>{avisoPers}</h1>}
        </div>
    </div>)
}