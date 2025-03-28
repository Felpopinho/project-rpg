import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function FormPersonagem(props){

    const navigate = useNavigate()

    const verificarLogin = () =>{
        if(props.user === ""){
            navigate("/")
        } else{
            setUsername(props.user[0].nome)
            return
        }
    }

    useEffect(()=>{
        verificarLogin()
    },[])

    return(<>
    
    
    
    </>)
}