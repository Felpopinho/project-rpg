import { Divider } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function FormPersonagem(props){

    const navigate = useNavigate()

    const verificarLogin = () =>{
        if(props.user === ""){
            navigate("/")
        } else{
            return
        }
    }

    const setarHabilidade = (e) =>{
        const cModificador = parseInt((Number(e.target.value)-10)/2)
        document.getElementById(`${e.target.name}M`).value = cModificador
    }

    useEffect(()=>{
        verificarLogin()
    },[])

    return(<div>
    
        <h1 className='text-5xl text-bold p-5'>Criação de personagem</h1>
        <Divider sx={{margin: "2vh"}}/>
        <div>
            <h1 className='text-3xl text-bold pl-5'>Habilidades</h1>
            <div className='grid grid-cols-3 gap-10'>
                <div className='flex flex-col justify-center items-center h-1/1 w-1/1'>
                    <h1 className='text-center h-10% text-2xl m-4'>Força</h1>
                    <div className='flex flex-col justify-center items-center relative h-25 w-1/1'>
                        <input type="number" name="" id="forcaM" readOnly className='w-20 h-1/1 top-0 absolute outline-3 rounded-xl text-center text-xl focus:border-0'/>                
                        <input type="number" name="forca" id="" onChange={(e)=>{setarHabilidade(e)}} className='w-12 h-10 -bottom-6 absolute outline-3 rounded-full text-center bg-white focus:border-0'/>                
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center h-1/1 w-1/1'>
                    <h1 className='text-center h-10% text-2xl m-4'>Destreza</h1>
                    <div className='flex flex-col justify-center items-center relative h-25 w-1/1'>
                        <input type="number" name="" id="destrezaM" readOnly className='w-20 h-1/1 top-0 absolute outline-3 rounded-xl text-center text-xl focus:border-0'/>                
                        <input type="number" name="destreza" id="" onChange={(e)=>{setarHabilidade(e)}} className='w-12 h-10 -bottom-6 absolute outline-3 rounded-full text-center bg-white focus:border-0'/>                
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center h-1/1 w-1/1'>
                    <h1 className='text-center h-10% text-2xl m-4'>Constituição</h1>
                    <div className='flex flex-col justify-center items-center relative h-25 w-1/1'>
                        <input type="number" name="" id="constituiçãoM" readOnly className='w-20 h-1/1 top-0 absolute outline-3 rounded-xl text-center text-xl focus:border-0'/>                
                        <input type="number" name="constituição" id="" onChange={(e)=>{setarHabilidade(e)}} className='w-12 h-10 -bottom-6 absolute outline-3 rounded-full text-center bg-white focus:border-0'/>                
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center h-1/1 w-1/1'>
                    <h1 className='text-center h-10% text-2xl m-4'>Inteligência</h1>
                    <div className='flex flex-col justify-center items-center relative h-25 w-1/1'>
                        <input type="number" name="" id="inteligênciaM" readOnly className='w-20 h-1/1 top-0 absolute outline-3 rounded-xl text-center text-xl focus:border-0'/>                
                        <input type="number" name="inteligência" id="" onChange={(e)=>{setarHabilidade(e)}} className='w-12 h-10 -bottom-6 absolute outline-3 rounded-full text-center bg-white focus:border-0'/>                
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center h-1/1 w-1/1'>
                    <h1 className='text-center h-10% text-2xl m-4'>Sabedoria</h1>
                    <div className='flex flex-col justify-center items-center relative h-25 w-1/1'>
                        <input type="number" name="" id="sabedoriaM" readOnly className='w-20 h-1/1 top-0 absolute outline-3 rounded-xl text-center text-xl focus:border-0'/>                
                        <input type="number" name="sabedoria" id="" onChange={(e)=>{setarHabilidade(e)}} className='w-12 h-10 -bottom-6 absolute outline-3 rounded-full text-center bg-white focus:border-0'/>                
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center h-1/1 w-1/1'>
                    <h1 className='text-center h-10% text-2xl m-4'>Carisma</h1>
                    <div className='flex flex-col justify-center items-center relative h-25 w-1/1'>
                        <input type="number" name="" id="carismaM" readOnly className='w-20 h-1/1 top-0 absolute outline-3 rounded-xl text-center text-xl focus:border-0'/>                
                        <input type="number" name="carisma" id="" onChange={(e)=>{setarHabilidade(e)}} className='w-12 h-10 -bottom-6 absolute outline-3 rounded-full text-center bg-white focus:border-0'/>                
                    </div>
                </div>
            </div>
            
        </div>
    
    </div>)
}