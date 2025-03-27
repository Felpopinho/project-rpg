import { useRef, useState } from 'react'
import { Box, FormControl, TextField, FormHelperText, InputLabel, Button, Typography } from '@mui/material'
import { baseURL } from "../App.jsx"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export function Signin(props) {

    const ref = useRef()
    const navigate = useNavigate()

    const criarConta = async (e) =>{
            e.preventDefault()
    
            const d = ref.current
    
            try {
                await axios.post(baseURL+"/usuarios/add", {
                    nome: d.nome.value,
                    email: d.email.value,
                    senha: d.senha.value
                }).then(async res =>{
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
                })})
            } catch (error) {
                console.log(error)
            }
        }

    return(<Box className="signin">
        <h1>Sign in</h1>
        <form ref={ref} onSubmit={(e)=>{criarConta(e)}}>
            <FormControl sx={{}}>
                <Box>
                    <TextField label="Nome" variant="outlined" required name="nome" fullWidth/>
                </Box>
                <Box>
                    <TextField label="Email" variant="outlined" required name="email" fullWidth/>
                </Box>
                <Box>
                    <TextField label="Senha" variant="outlined" required name="senha" fullWidth/>
                </Box>
                <Button variant='contained' type='submit'>Enviar</Button>
                <Button variant='contained' onClick={()=>{navigate("/")}}>Logar conta</Button>
            </FormControl>
        </form>
    </Box>)
}