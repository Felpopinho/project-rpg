import { Avatar, Box, Button, Divider, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Personagem } from './Personagem.jsx'
import axios from 'axios'
import { baseURL } from '../App.jsx'

export function Home(props){
    const navigate = useNavigate()

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

    const getPersonagens = async () =>{
        try {
            await axios.get(baseURL+"/personagens").then(res =>{
                setPersonagens(res.data)
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(()=>{
        verificarLogin()
        getPersonagens()
    },[])

    return(<div>
        <div className="flex w-full h-20 justify-between items-center p-4">
            <div className="flex justify-between w-1/4">
                <Avatar>{username.slice(0,1)}</Avatar>
                <h1 className='text-4xl font-bold'>Bem vindo {username}</h1>
            </div>
            <div className="flex ">
                <h1 className='text-4xl font-bold'>Fichas D&D</h1>
            </div>
        </div>
        <Divider sx={{margin: "2vh 0"}}/>
        <div className='flex justify-between p-4'>
            <h1 className='text-4xl font-bold'>Fichas de personagens</h1>
            <TextField sx={{width: "40%"}} label="Pesquisar personagens"></TextField>
            <Button variant='contained' color='secondary'>Criar personagem</Button>
        </div>
        <Divider sx={{margin: "2vh 0"}}/>
        <div>
            {Array.from(personagens).map(personagem =>(
                <Personagem p={personagem}/>
            ))}
        </div>
    </div>)
}