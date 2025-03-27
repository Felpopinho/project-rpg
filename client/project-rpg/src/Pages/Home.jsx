import { Box } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function Home(props){
    const navigate = useNavigate()

    const verificarLogin = () =>{
        if(props.user === ""){
            navigate("/")
        } else{
            return
        }
    }

    useEffect(()=>{
        verificarLogin()
    },[])
    return(<Box>
            
        <h1>Bem vindo {props.user[0].nome}</h1>
        
        
    </Box>)
}