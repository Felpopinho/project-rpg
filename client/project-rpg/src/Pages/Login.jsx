import { useRef, useState } from 'react'
import { Box, FormControl, TextField, FormHelperText, InputLabel, Button, Typography } from '@mui/material'
import { baseURL } from "../App.jsx"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export function Login(props) {

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
                    navigate("/home")
                } else{
                    console.log("Usuario não encontrado")
                }
            })
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <Box>
        <h1>Login</h1>
        <form ref={ref} onSubmit={(e)=>{logarConta(e)}}>
            <FormControl sx={{}}>
                <Box sx={{marginBottom: "10px"}}>
                    <TextField label="Nome" variant="outlined" required name="nome" fullWidth/>
                </Box>
                <Box sx={{marginBottom: "10px"}}>
                    <TextField label="Senha" variant="outlined" required name="senha" fullWidth/>
                </Box>
                <Button variant='contained' type='submit' sx={{marginBottom: "10px"}}>Enviar</Button>
                <Button variant='contained' onClick={()=>{navigate("/signin")}}>Criar conta</Button>
            </FormControl>
        </form>
    </Box>
  )
}