import { useRef, useState, useEffect } from 'react'
import { Box, FormControl, TextField, FormHelperText, InputLabel, Button, Typography, IconButton, Icon } from '@mui/material'
import { baseURL } from "../App.jsx"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export function Login(props) {

    const trocarTema = (t) =>{
        const html = document.getElementById("html")
        if(t === "dark"){
            html.classList.add("dark")
        } else{
            html.classList.remove("dark")
        }
        props.setMode(t)
        localStorage.setItem("tailwind-mode", t)
    }

    const ref = useRef()
    const navigate = useNavigate()

    const logarConta = async (e) =>{
        e.preventDefault()

        const d = ref.current

        try {
            await axios.post(baseURL+"/usuarios", {
                nome: d.nome.value,
                senha: d.senha.value
            }).then(res =>{
                if(res.data.length){
                    props.setUser(res.data)
                    localStorage.setItem(res.data[0].email, JSON.stringify(res.data))
                    navigate("/home")
                } else{
                    console.log("Usuario não encontrado")
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getLogin = () =>{
        if(props.logado === true) navigate("/home")
    }

    useEffect(()=>{
        getLogin()
    }, [props.logado])

  return (
    <div className='w-dvw h-dvh flex justify-center items-center flex-col relative'>
        <div className='flex flex-col justify-between align-center bg-gray-100 p-10 rounded-2xl dark:bg-gray-800'>
            <h1 className='text-4xl font-bold text-center mb-6 text-black dark:text-white'>Login</h1>
            <form ref={ref} onSubmit={(e)=>{logarConta(e)}} className='grid grid-rows-4 gap-5'>
                <div>
                    <TextField label="Nome" variant="outlined" required name="nome" fullWidth/>
                </div>
                <div>
                    <TextField label="Senha" variant="outlined" required name="senha" fullWidth/>
                </div>
                <Button variant='contained' type='submit'>Enviar</Button>
                <Button variant='outlined' onClick={()=>{navigate("/signin")}}>Criar conta</Button>
            </form>
        </div>
        <div className='absolute bottom-5 grid grid-cols-2 gap-x-5 '>
            <IconButton onClick={()=>{trocarTema("light")}} ><Icon>light_mode</Icon></IconButton>
            <IconButton onClick={()=>{trocarTema("dark")}}><Icon>dark_mode</Icon></IconButton>
        </div>
    </div>
  )
}