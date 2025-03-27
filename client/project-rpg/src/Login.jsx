import { useRef, useState } from 'react'
import { Box, FormControl, TextField, FormHelperText, InputLabel, Button, Typography } from '@mui/material'
import { baseURL } from "./App.jsx"

export function Login(props) {

    const ref = useRef()

    const logarConta = async (e) =>{
        e.preventDefault()

        const comment = ref.current

        try {
            await axios.post(baseURL+"/usuarios", {
                nome: e.nome,
                senha: e.senha
            }).then(res =>{

            })
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Box >
        <h1>Login</h1>
        <form ref={ref} onSubmit={(e)=>{logarConta(e)}}>
            <FormControl sx={{}}>
                <Box>
                    <TextField label="Nome" id="UserName" variant="outlined" required name="nome"/>
                </Box>
                <Box>
                    <TextField label="Senha" id="UserName" variant="outlined" required name="senha"/>
                </Box>
                <Button variant='contained' type='submit'>Enviar</Button>
            </FormControl>
        </form>
    </Box>
  )
}