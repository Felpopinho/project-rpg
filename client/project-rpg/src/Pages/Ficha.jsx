import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Avatar, Box, Button, Divider, TextField, IconButton, Icon, Checkbox, FormControlLabel, FormGroup, Input, Slider, LinearProgress } from '@mui/material'
import axios from 'axios'
import { red } from '@mui/material/colors'

export function Ficha(props){

    const navigate = useNavigate()

    const verificarLogin = () =>{
        if(props.user === ""){
            return navigate("/")
        }else if(localStorage.getItem("personagem").length){
            return props.setActualPers(JSON.parse(localStorage.getItem("personagem")))
        }else{
            return navigate("/home")
        }
    }

    const [skills, setSkills] = useState("")

    const [skillMvalue, setSkillMvalue] = useState("")

    const getSkills = async () =>{
        try {
            await axios.get("https://www.dnd5eapi.co/api/2014/skills/").then(res=>{
                setSkills(res.data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const setModificadores = () =>{

        setSkillMvalue({
            forca: parseInt((Number(props.pers.habilidades.forca)-10)/2),
            destreza: parseInt((Number(props.pers.habilidades.destreza)-10)/2),
            constituicao: parseInt((Number(props.pers.habilidades.constituicao)-10)/2),
            inteligencia: parseInt((Number(props.pers.habilidades.inteligencia)-10)/2),
            sabedoria: parseInt((Number(props.pers.habilidades.sabedoria)-10)/2),
            carisma: parseInt((Number(props.pers.habilidades.carisma)-10)/2)
        })
    }

    const setarHabilidade = (e) =>{
        const name = e.target.name
        const cModificador = parseInt((Number(e.target.value)-10)/2)
        document.getElementById(`${name}M`).value = cModificador
        setSkillMvalue((prevState) => ({
            ...prevState,
            [name]: cModificador
        }))
    }

    const [lifeProgress, setLife] = useState(0)

    const handleLife = (num) =>{
        const life = 40
        let n = 100/40
        if(num ===0){
            setLife(lifeProgress-n)
        }else{
            setLife(lifeProgress+n)
        }
    }

    useEffect(()=>{
        props.pers === "" ? "" : setModificadores()
    }, [props.pers])

    useEffect(()=>{
        verificarLogin()
        getSkills()
    },[])

    const arrSkills = ["forca","destreza","constituicao","inteligencia","sabedoria","carisma"]

    return (<>
    
        {props.pers !== "" ? <div className='w-1/1 p-15'>
            <div className='flex gap-x-20 h-[10%]'>
                <div className='w-25 h-25 overflow-hidden'>
                    <img className='' src='https://orbedosdragoes.com/wp-content/uploads/2017/06/DD5-Guerreiro_1.jpg'/>
                </div>
                <div className='grid grid-cols-3 justify-items-start items-center font-bold text-lg'>
                    <h1 className='text-black text-center dark:text-white'>Nome: <span className='font-light'>{props.pers.identidade.nome}</span></h1> 
                    <h1 className='text-black text-center dark:text-white'>Jogador: <span className='font-light'>{props.pers.identidade.jogador}</span></h1> 
                    <p className='text-black dark:text-white'>Classe: <span className='font-light'>{props.pers.cra.classe}</span></p>
                    <p className='text-black dark:text-white'>Raça: <span className='font-light'>{props.pers.cra.raca}</span></p>
                    <p className='text-black dark:text-white'>Alinhamento: <span className='font-light'>{props.pers.mentalidade.alinhamento}</span></p>
                    <p className='text-black dark:text-white'>Pontos de experiencia: <span className='font-light'>{"0"}</span></p>
                </div>
            </div>
            <Divider sx={{ margin: "2% 0" }}/>
            <div className='flex gap-x-10 h-[90vh]'>
                <div className='grid grid-rows-6 gap-15'>
                    {arrSkills.map(skill =>(
                        <div key={skill} className='flex w-30 h-20 flex-col justify-center items-center bg-gray-100 outline-3 outline-black rounded-xl dark:bg-gray-800 dark:outline-white'>
                            <h1 className='text-center text-black dark:text-white capitalize'>{skill}</h1>
                            <div className='h-12 flex flex-col justify-between items-center relative '>
                                <input value={skillMvalue[skill]} name="" id={`${skill}M`} readOnly className='h-10 text-center text-2xl text-black dark:text-white focus:border-0 outline-0 '/>                
                                <input value={props.pers.habilidades[skill]} type="number" name={skill} onChange={(e)=>{setarHabilidade(e)}} className='w-16 h-8 -bottom-6 absolute outline-3 outline-purple-900 rounded-full text-center bg-gray-100 text-black dark:text-white dark:bg-gray-800 focus:border-0'/>                
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
                            <Checkbox checked={props.pers.pericias[skill.index][0]}/>
                            <h1 className='grow text-xs'>{skill.name}</h1>
                            <TextField value={props.pers.pericias[skill.index][1]} variant='standard' size='small' sx={{width: "40px"}}/>
                        </div>
                    ))}
                </div>
                <div className='grid grid-cols-6 grid-rows-3 bg-gray-100 dark:bg-gray-800 p-10 rounded-xl gap-5'>
                    <div className='col-span-2'>
                        <h1 className='w-1/1 h-1/4'>Classe de armadura</h1>
                        <Input fullWidth value={props.pers.status.ca} type='number' variant='standard'/>
                    </div>
                    <div className='col-span-2'>
                        <h1 className='w-1/1 h-1/4'>Iniciativa</h1>
                        <Input fullWidth value={props.pers.status.iniciativa} type='number' variant='standard'/>
                    </div>
                    <div className='col-span-2'>
                        <h1 className='w-1/1 h-1/4'>Deslocamento</h1>
                        <Input fullWidth value={props.pers.status.deslocamento} type='number' variant='standard'/>
                    </div>
                    <div className='col-span-6'>
                        <h1 className='w-1/1 h-1/4'>Pontos de vida</h1>
                        <div className='flex h-10 items-stretch'>
                            <IconButton onClick={()=>{handleLife(0)}}><Icon>chevron_left</Icon></IconButton>
                            <LinearProgress color='red' variant="determinate" valueBuffer={47} value={lifeProgress} sx={{width: "100%", height: "100%", backgroundColor: "#2f1a1a"}}/>
                            <IconButton onClick={()=>{handleLife(1)}}><Icon>chevron_right</Icon></IconButton>
                        </div>
                    </div>
                    <div className='col-span-3'>
                        <div className='flex h-1/5 items-center'>
                            <p>Total</p>
                            <Input type='number' fullWidth variant='standard'/>
                        </div>
                        <div className='h-4/5'>
                            <Input type='number' fullWidth variant='standard'/>
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
                <div className='grid grid-rows-4 gap-y-5 p-5 rounded-xl bg-gray-100 dark:bg-gray-800'>
                    <div className='h-1/1 w-1/1 flex flex-col justify-between relative'>
                        <TextField  multiline rows={5} value={props.pers.mentalidade.personalidade} />
                        <p className='absolute bottom-0'>Personalidade</p>
                    </div>
                    <div className='h-1/1 w-1/1 flex flex-col justify-between relative'>
                        <TextField multiline rows={4} value={props.pers.mentalidade.ideais}/>
                        <p className='absolute bottom-0'>Ideais</p>
                    </div>
                    <div className='h-1/1 w-1/1 flex flex-col justify-between relative'>
                        <TextField multiline rows={4} value={props.pers.mentalidade.vinculos}/>
                        <p className='absolute bottom-0'>Vinculos</p>
                    </div>
                    <div className='h-1/1 w-1/1 flex flex-col justify-between relative'>
                        <TextField multiline rows={4} value={props.pers.caracteristicas.aparencia}/>
                        <p className='absolute bottom-0'>Caracteristicas</p>
                    </div>
                    <div className='h-1/1 w-1/1 flex flex-col justify-between relative'>
                        <TextField multiline rows={4} value={props.pers.identidade.historia} />
                        <p className='absolute bottom-0'>Historia</p>
                    </div>
                </div>
            </div>
        </div> : ""}
    
    </>)
}