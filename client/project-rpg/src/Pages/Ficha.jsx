import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Avatar, Box, Button, Divider, TextField, IconButton, Icon, Checkbox, FormControlLabel, FormGroup, Input, Slider, LinearProgress, FormHelperText } from '@mui/material'
import axios from 'axios'
import { red } from '@mui/material/colors'
import { baseURL } from '../App'

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

    const putPersonagem = async () =>{
        try {
            await axios.put(baseURL+"/personagens/update", {
                id: props.pers.uid,
                personagem: props.pers
            }).then(res =>{
                console.log(res.data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        putPersonagem()
    }, [props.pers])

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

    const [life, setLife] = useState(100)
    const [pontosVida, setPontosVida] = useState("")

    const handleLife = (num) =>{
        const pontos = pontosVida.length ? Number(pontosVida) : 1
        let n = 100/props.pers.status.pv
        let n2 = n * pontos
        if(num === 0){
            props.setActualPers(prevState => ({
                ...prevState,
                status: {
                  ...props.pers.status,
                  pvatual: props.pers.status.pvatual - pontos
                }
            }))
            setLife(life-n2)
        }else{
            props.setActualPers(prevState => ({
                ...prevState,
                status: {
                  ...props.pers.status,
                  pvatual: props.pers.status.pvatual + pontos
                }
            }))
            setLife(life+n2)
        }
        setPontosVida("")
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
            <div className='flex justify-between gap-x-5'>
                <div className='grid h-1/1 grid-rows-6 w-1/10 gap-15 pt-10 pb-10 pl-5 pr-5 justify-center items-center rounded-xl bg-gray-200 dark:bg-gray-950'>
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
                <div className='grid grid-cols-1 h-1/1 p-10 w-2/10 rounded-xl bg-gray-200 dark:bg-gray-950'>
                    <div className='flex justify-between h-10 items-center gap-x-5'>
                        <h1 className='text-xs'>Dado</h1>
                        <h1 className='text-xs'>Proficiencia</h1>
                        <h1 className='text-xs grow-1'>Pericia</h1>
                        <h1 className='text-xs'>outros</h1>
                    </div>
                    {skills === "" ? "" : Array.from(skills.results).map(skill => (
                        <div key={skill.name} className='flex h-10 items-center gap-x-5'>
                            <IconButton><Icon>casino</Icon></IconButton>
                            <Checkbox checked={props.pers.pericias[skill.index.replaceAll("-", "")][1]}/>
                            <h1 className='grow text-xs'>{skill.name}</h1>
                            <TextField value={props.pers.pericias[skill.index.replaceAll("-", "")][0]} variant='standard' size='small' sx={{width: "40px"}}/>
                        </div>
                    ))}
                </div>
                <div className='w-3/10 bg-gray-200 h-1/1 p-7 rounded-xl text-sm dark:bg-gray-950 '>
                    <div className='grid grid-cols-6 h-1/2 grid-rows-[100px_180px_150px] gap-3 mb-5 dark:bg-gray-950'>
                        <div className='col-span-2 p-5 rounded-xl bg-gray-100 flex flex-col justify-between dark:bg-gray-800'>
                            <h1 className='w-1/1'>CA</h1>
                            <Input fullWidth value={props.pers.status.ca} type='number' variant='standard'/>
                        </div>
                        <div className='col-span-2 p-5 rounded-xl bg-gray-100 flex flex-col justify-between dark:bg-gray-800'>
                            <h1 className='w-1/1'>Iniciativa</h1>
                            <Input fullWidth value={props.pers.status.iniciativa} type='number' variant='standard'/>
                        </div>
                        <div className='col-span-2 p-5 rounded-xl bg-gray-100 flex flex-col justify-between dark:bg-gray-800'>
                            <h1 className='w-1/1'>Deslocamento</h1>
                            <Input fullWidth value={props.pers.status.deslocamento} type='number' variant='standard'/>
                        </div>
                        <div className='col-span-6 p-5 gap-1 rounded-xl bg-gray-100 flex flex-col justify-between dark:bg-gray-800'>
                            <h1 className='w-1/1 text-center'>Pontos de vida</h1>
                            <div className="flex flex-col w-1/1 gap-1">
                                <div className='flex w-1/1 h-10 items-stretch items-center justify-center relative'>
                                    
                                    <LinearProgress color='red' variant="determinate" value={life} sx={{width: "100%", height: "100%", backgroundColor: props.pers.status.pvatual >= props.pers.status.pv ? "#ef5350" : "#2f1a1a"}}/>
                                    
                                    <h1 className='absolute self-center text-white'>{props.pers.status.pvatual}/{props.pers.status.pv}</h1>
                                </div>
                                <div className="w-1/1 flex">
                                    <IconButton onClick={()=>{handleLife(0)}}><Icon>chevron_left</Icon></IconButton>
                                    <TextField variant="filled" margin="small" fullWidth label="Pontos" value={pontosVida} onChange={(e)=>{setPontosVida(e.target.value)}} type='number'/>
                                    <IconButton onClick={()=>{handleLife(1)}}><Icon>chevron_right</Icon></IconButton>
                                </div>
                                <FormHelperText>Coloque um numero de pontos e clique em alguma seta</FormHelperText>
                            </div>
                        </div>
                        <div className='col-span-3 p-5 rounded-xl bg-gray-100 flex flex-col justify-between dark:bg-gray-800'>
                            <div className='flex items-center'>
                                <p>Total</p>
                                <Input type='number' value={props.pers.status.dadovida} fullWidth variant='standard'/>
                            </div>
                            <div>
                                <Input type='number' value={props.pers.status.dadovidaatual} fullWidth variant='standard'/>
                                <FormHelperText className=''>Dado de vida</FormHelperText>
                            </div>
                        </div>
                        <div className='col-span-3 p-5 rounded-xl bg-gray-100 flex flex-col justify-between dark:bg-gray-800'>
                            <div className='flex items-center'>
                                <h1 className='grow'>Sucessos</h1>
                                <Checkbox checked={props.pers.status.salvaguarda[0] === 1}/>
                                <Checkbox checked={props.pers.status.salvaguarda[0] === 2}/>
                                <Checkbox checked={props.pers.status.salvaguarda[0] === 3}/>
                            </div>
                            <div className='flex items-center'>
                                <h1 className='grow'>Falhas</h1>
                                <Checkbox checked={props.pers.status.salvaguarda[1] === 1}/>
                                <Checkbox checked={props.pers.status.salvaguarda[1] === 2}/>
                                <Checkbox checked={props.pers.status.salvaguarda[1] === 3}/>
                            </div>
                            <FormHelperText>Salvaguarda contra a morte</FormHelperText>
                        </div>
                    </div>
                    <div className="h-1/2 rounded-xl flex flex-col gap-4 dark:bg-gray-950">
                        <div className="flex gap-2">
                            <div className="p-3 rounded-xl bg-gray-100">
                                <TextField label="Inspiração" value={props.pers.status.inspiracao}/>
                            </div>
                            <div className="p-3 rounded-xl bg-gray-100">
                                <TextField label="Sabedoria p." value={props.pers.caracteristicas.sabpassiva}/>
                            </div>
                            <div className="p-3 rounded-xl bg-gray-100">
                                <TextField label="Intuição p." value={props.pers.caracteristicas.intupassiva}/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-center text-xl">Proficiências</h1>
                            <div className="bg-gray-100 relative">
                                <TextField variant="filled" label="Armas" fullWidth value={props.pers.proficiencias.armas}/>
                            </div>
                            <div className="bg-gray-100 relative">
                                <TextField variant="filled" label="Armaduras" fullWidth value={props.pers.proficiencias.armaduras}/>
                            </div>
                            <div className="bg-gray-100 relative">
                                <TextField variant="filled" label="Idiomas" fullWidth value={props.pers.proficiencias.idiomas}/>
                            </div>
                            <div className="bg-gray-100 relative">
                                <TextField variant="filled" label="Ferramentas" fullWidth value={props.pers.proficiencias.ferramentas}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid grid-rows-4 gap-y-5 p-5 h-1/1 w-4/10 rounded-xl bg-gray-200 dark:bg-gray-950'>
                    <div className='h-1/1 w-1/1 flex flex-col justify-between relative rounded-xl p-5 dark:bg-gray-800'>
                        <TextField variant="filled" label="Personalidade" multiline rows={3} value={props.pers.mentalidade.personalidade} />
                    </div>
                    <div className='h-1/1 w-1/1 flex flex-col justify-between relative rounded-xl p-5 dark:bg-gray-800'>
                        <TextField variant="filled" label="Ideais" multiline rows={3} value={props.pers.mentalidade.ideais}/>
                    </div>
                    <div className='h-1/1 w-1/1 flex flex-col justify-between relative rounded-xl p-5 dark:bg-gray-800'>
                        <TextField variant="filled" label="Vinculos" multiline rows={3} value={props.pers.mentalidade.vinculos}/>
                    </div>
                    <div className='h-1/1 w-1/1 flex flex-col justify-between relative rounded-xl p-5 dark:bg-gray-800'>
                        <TextField variant="filled" label="Caracteristicas" multiline rows={3} value={props.pers.caracteristicas.aparencia}/>
                    </div>
                    <div className='h-1/1 w-1/1 flex flex-col justify-between relative rounded-xl p-5 dark:bg-gray-800'>
                        <TextField variant="filled" label="Historia" multiline rows={3} value={props.pers.identidade.historia} onChange={()=>{setActualPers(props.pers.identidade.historia)}}/>
                    </div>
                </div>
            </div>
        </div> : ""}
    
    </>)
}