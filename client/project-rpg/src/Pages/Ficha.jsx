import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Avatar, Box, Button, Divider, TextField, IconButton, Icon, Checkbox, FormControlLabel, FormGroup, Input } from '@mui/material'
import axios from 'axios'

export function Ficha(props){

    const navigate = useNavigate()

    const verificarLogin = () =>{
        if(props.user === ""){
            navigate("/")
        }else{
            return
        }
    }

    const [skills, setSkills] = useState("")

    const [skillValue, setSkillValue] = useState("")
    const [skillMvalue, setSkillMvalue] = useState("")

    const getSkills = async () =>{
        try {
            await axios.get("https://www.dnd5eapi.co/api/2014/skills/").then(res=>{
                setSkills(res.data)
                console.log(props.pers)
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        verificarLogin()
        getSkills()
    },[])

    const arrSkills = ["forca","destreza","constituicao","inteligencia","sabedoria","carisma"]

    return (<>
    
        {props.pers !== "" ? <div className='w-1/1 p-15'>
            <div className='flex gap-x-20'>
                <div className='w-25 h-25 overflow-hidden'>
                    <img className='' src='https://orbedosdragoes.com/wp-content/uploads/2017/06/DD5-Guerreiro_1.jpg'/>
                </div>
                <div className='grid grid-cols-6 justify-items-start items-center font-bold'>
                    <h1 className='text-2xl text-black text-center dark:text-white col-span-3'>Nome: <span className='font-light'>{props.pers.identidade.nome}</span></h1> 
                    <h1 className='text-2xl text-black text-center dark:text-white col-span-3'>Jogador: <span className='font-light'>{props.pers.identidade.jogador}</span></h1> 
                    <p className='text-lg text-black dark:text-white col-span-2'>Classe: <span className='font-light'>{props.pers.cra.classe}</span></p>
                    <p className='text-lg text-black dark:text-white col-span-2'>Raça: <span className='font-light'>{props.pers.cra.raca}</span></p>
                    <p className='text-lg text-black dark:text-white col-span-2'>Antecedente: <span className='font-light'>{props.pers.cra.antecedente}</span></p>
                </div>
            </div>
            <Divider sx={{ margin: "3vh 0" }}/>
            <div className='flex gap-x-10'>
                <div className='grid grid-rows-6 gap-10 w-1/8'>
                    {arrSkills.map(skill =>(
                        <div key={skill} className='flex flex-col justify-center items-center w-1/1 bg-gray-100 outline-3 outline-black rounded-xl dark:bg-gray-800 dark:outline-white'>
                            <h1 className='text-center text-black dark:text-white capitalize'>{skill}</h1>
                            <div className='flex flex-col justify-between items-center relative w-1/1 h-1/1'>
                                <input value={skillValue} name="" id={`${skill}M`} readOnly className=' top-0 absolute  text-center text-3xl text-black dark:text-white focus:border-0 outline-0 '/>                
                                <input value={skillMvalue} type="number" name={skill} onChange={(e)=>{setarHabilidade(e)}} className='w-16 h-10 -bottom-6 absolute outline-3 outline-purple-900 rounded-full text-center bg-gray-100 text-black dark:text-white dark:bg-gray-800 focus:border-0'/>                
                            </div>
                        </div>
                    ))}
                </div>
                <div className='grid grid-cols-1'>
                    <div className='flex justify-between h-10 items-center gap-x-5'>
                        <h1 className='text-xs'>Dado</h1>
                        <h1 className='text-xs'>Proficiencia</h1>
                        <h1 className='text-xs grow-1'>Pericia</h1>
                        <h1 className='text-xs'>outros</h1>
                    </div>
                    {skills === "" ? "" : Array.from(skills.results).map(skill => (
                        <div key={skill.name} className='flex h-10 items-center gap-x-5'>
                            <IconButton><Icon>casino</Icon></IconButton>
                            <Checkbox />
                            <h1 className='grow text-xs'>{skill.name}</h1>
                            <TextField variant='standard' size='small' sx={{width: "40px"}}/>
                        </div>
                    ))}
                </div>
                <div className='grid grid-cols-6 grid-rows-3 bg-gray-100 dark:bg-gray-800 p-10 rounded-xl gap-5'>
                    <div className='col-span-2'>
                        <h1 className='w-1/1 h-1/4'>Classe de armadura</h1>
                        <Input fullWidth type='number' variant='standard' sx={{height: "75%", fontSize: "2rem"}}/>
                    </div>
                    <div className='col-span-2'>
                        <h1 className='w-1/1 h-1/4'>Iniciativa</h1>
                        <Input fullWidth type='number' variant='standard' sx={{height: "75%", fontSize: "2rem"}}/>
                    </div>
                    <div className='col-span-2'>
                        <h1 className='w-1/1 h-1/4'>Deslocamento</h1>
                        <Input fullWidth type='number' variant='standard' sx={{height: "75%", fontSize: "2rem"}}/>
                    </div>
                    <div className='col-span-6'>
                        
                    </div>
                    <div className='col-span-3'>
                        <div className='flex h-1/5 items-center'>
                            <p>Total</p>
                            <Input type='number' fullWidth variant='standard'/>
                        </div>
                        <div className='h-4/5'>
                            <Input type='number' fullWidth variant='standard' sx={{height: "75%", fontSize: "2rem"}}/>
                            <h1 className='h-1/4'>Dado de vida</h1>
                        </div>
                    </div>
                    <div className='col-span-3 '>
                        <div className='flex h-2/5 items-center'>
                            <h1 className='grow'>Sucessos</h1>
                            <Checkbox/>
                            <Checkbox/>
                            <Checkbox/>
                        </div>
                        <div className='flex h-2/5 items-center'>
                            <h1 className='grow'>Falhas</h1>
                            <Checkbox/>
                            <Checkbox/>
                            <Checkbox/>
                        </div>
                        <p className='h-1/5'>Salvaguarda contra a morte</p>
                    </div>
                </div>
            </div>
        </div> : ""}
    
    </>)
}