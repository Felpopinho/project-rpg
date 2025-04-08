import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Avatar, Box, Button, Divider, TextField, IconButton, Icon, Checkbox, FormControlLabel, FormGroup, Input, Slider, LinearProgress, FormHelperText, ThemeProvider } from '@mui/material'
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

    const setNewValues = (e) =>{
        let nValue;
        if(Number(e.target.value)===true){
            nValue = Number(e.target.value)
        }else{
            nValue = e.target.value
        }
        props.setActualPers(prevState => ({
            ...prevState,
            [e.target.name]: {
                ...props.pers[e.target.name],
                [e.target.id]:nValue
            }
        }))
        console.log(props.pers[e.target.name][e.target.id])
    }
    const setNewChecked = (e) =>{
        const name = parseInt(e.target.name)

        if(!(e.target.checked)){
            props.setActualPers(prevState =>({
                ...prevState,
                status: {
                    ...props.pers.status,
                    salvaguarda: name === 0 ? [parseInt(e.target.id.slice(4,5))-1, props.pers.status.salvaguarda[1]] : [props.pers.status.salvaguarda[0], parseInt(e.target.id.slice(4,5))-1]
                }
            }))
        } else{
            props.setActualPers(prevState =>({
                ...prevState,
                status: {
                    ...props.pers.status,
                    salvaguarda: name === 0 ? [parseInt(e.target.id.slice(4,5)), props.pers.status.salvaguarda[1]] : [props.pers.status.salvaguarda[0], parseInt(e.target.id.slice(4,5))]
                }
            }))
        }  
        console.log(props.pers.status.salvaguarda[parseInt(e.target.name)])
        
    }

    const [nivel, setNivel] = useState(1)

    const setarNivel = () =>{
        const xp = parseInt(props.pers.status.experiencia)
        if(xp < 300){
            setNivel(1)
        } else if(xp < 900){
            setNivel(2)
        } else if(xp < 2700){
            setNivel(3)
        } else if(xp < 6500){
            setNivel(4)
        } else if(xp < 14000){
            setNivel(5)
        } else if(xp < 23000){
            setNivel(6)
        } else if(xp < 34000){
            setNivel(7)
        } else if(xp < 48000){
            setNivel(8)
        } else if(xp < 64000){
            setNivel(9)
        } else if(xp < 85000){
            setNivel(10)
        } else if(xp < 10000){
            setNivel(11)
        } else if(xp < 120000){
            setNivel(12)
        } else if(xp < 140000){
            setNivel(13)
        } else if(xp < 165000){
            setNivel(14)
        } else if(xp < 195000){
            setNivel(15)
        } else if(xp < 225000){
            setNivel(16)
        } else if(xp < 265000){
            setNivel(17)
        } else if(xp < 305000){
            setNivel(18)
        } else if(xp < 355000){
            setNivel(19)
        } else{
            setNivel(20)
        }
    }

    useEffect(()=>{
        setarNivel()
    }, [props.pers.status.experiencia])

    useEffect(()=>{
        props.pers === "" ? "" : setModificadores()
    }, [props.pers])

    useEffect(()=>{
        verificarLogin()
        getSkills()
    },[])

    const arrSkills = ["forca","destreza","constituicao","inteligencia","sabedoria","carisma"]

    return (<>
        {props.pers !== "" ? <div className='w-1/1 p-10'>
            <div className='p-5 rounded-xl bg-gray-300 flex gap-x-5 dark:bg-gray-950'>
                <div className='grid grid-cols-[auto_auto_auto] gap-4 justify-items-start p-3 items-center font-bold text-lg bg-gray-200 rounded-lg dark:bg-gray-800'>
                    <div className='col-span-3 grid grid-cols-[100px_auto] gap-5 w-1/1 rounded-lg overflow-hidden'>
                        <div className='w-[100px] h-25 overflow-hidden rounded-lg'>
                            <img className='' src='https://orbedosdragoes.com/wp-content/uploads/2017/06/DD5-Guerreiro_1.jpg'/>
                        </div>
                        <Input  sx={{fontSize: "2rem", height: "100%"}} variant="filled" size='normal' className='text-xl' fullWidth defaultValue={props.pers.identidade.nome}/>
                    </div>
                    <div className='rounded-lg overflow-hidden'>
                        <TextField label="Jogador" variant="filled" size='small' name="identidade" id="jogador" onChange={(e)=>{setNewValues(e)}} defaultValue={props.pers.identidade.jogador}/>
                    </div> 
                    <div className='rounded-lg overflow-hidden'>
                        <TextField label="Classe" variant="filled" size='small' name="cra" id="classe" onChange={(e)=>{setNewValues(e)}} defaultValue={props.pers.cra.classe}/>
                    </div>
                    <div className='rounded-lg overflow-hidden'>
                        <TextField label="Raça" variant="filled" size='small' name="cra" id="raca" onChange={(e)=>{setNewValues(e)}} defaultValue={props.pers.cra.raca}/>
                    </div>
                    <div className='rounded-lg overflow-hidden'>
                        <TextField label="Alinhamento" variant="filled" size='small' name="mentalidade" id="alinhamento" onChange={(e)=>{setNewValues(e)}} defaultValue={props.pers.mentalidade.alinhamento}/>
                    </div>
                    <div className='rounded-lg overflow-hidden'>
                        <TextField label="Idade" variant="filled" size='small' name="caracteristicas" id="peso" onChange={(e)=>{setNewValues(e)}} defaultValue={props.pers.caracteristicas.peso}/>
                    </div>
                    <div className='rounded-lg overflow-hidden'>
                        <TextField label="Peso" variant="filled" size='small' name="caracteristicas" id="idade" onChange={(e)=>{setNewValues(e)}} defaultValue={props.pers.caracteristicas.idade}/>
                    </div>
                </div>
                <div className='grid grid-cols-[auto_auto] gap-5 bg-gray-200 rounded-lg p-3 dark:bg-gray-800'>
                    <div>
                        <TextField variant="filled" defaultValue={props.pers.status.experiencia} name="status" id="experiencia" onChange={(e)=>{setNewValues(e)}} label="Pontos de experiência"/>
                    </div>
                    <div>
                        <TextField variant="filled" value={nivel} slotProps={{input: {readOnly: true,},}} label="Nivel"/>
                    </div>
                    <div className='col-span-2 flex justify-between items-center'>
                        <IconButton><Icon>chevron_left</Icon></IconButton>
                        <TextField variant="filled" fullWidth size='small' label="Pontos"/>
                        <IconButton><Icon>chevron_right</Icon></IconButton>
                    </div>
                    <FormHelperText className='col-span-2 self-end'>Coloque o numero de pontos e clique em alguma seta</FormHelperText>
                </div>
            </div>
            <Divider sx={{ margin: "2% 0" }}/>
            <div className='flex justify-between gap-x-5'>
                <div className='grid h-1/1 grid-rows-6 w-1/10 gap-15 pt-10 pb-10 pl-5 pr-5 justify-center items-center rounded-xl bg-gray-300 dark:bg-gray-950'>
                    {arrSkills.map(skill =>(
                        <div key={skill} className='flex w-30 h-20 flex-col justify-center items-center bg-gray-100 outline-3 outline-black rounded-xl dark:bg-gray-800 dark:outline-white'>
                            <h1 className='text-center  capitalize'>{skill}</h1>
                            <div className='h-12 flex flex-col justify-between items-center relative '>
                                <input value={skillMvalue[skill]} name="" id={`${skill}M`} readOnly className='h-10 text-center text-2xl  focus:border-0 outline-0 '/>                
                                <input value={props.pers.habilidades[skill]} type="number" name={skill} onChange={(e)=>{setarHabilidade(e)}} className='w-16 h-8 -bottom-6 absolute outline-3 outline-purple-900 rounded-full text-center bg-gray-100  dark:bg-gray-800 focus:border-0'/>                
                            </div>
                        </div>
                    ))}
                </div>
                <div className='grid grid-cols-1 h-1/1 p-10 w-2/10 rounded-xl bg-gray-300 dark:bg-gray-950'>
                    <div className='flex justify-between h-10 items-center gap-x-5'>
                        <h1 className='text-xs'>Dado</h1>
                        <h1 className='text-xs grow-1'>Pericia</h1>
                        <h1 className='text-xs'>Proficiencia</h1>
                        <h1 className='text-xs'>outros</h1>
                    </div>
                    {skills === "" ? "" : Array.from(skills.results).map(skill => (
                        <div key={skill.name} className='grid grid-cols-[auto_1fr_auto_auto] h-10 items-center justify-between'>
                            <IconButton><Icon>casino</Icon></IconButton>
                            <h1 className='text-xs'>{skill.name}</h1>
                            <Checkbox onChange={(e)=>{setNewProf(e)}} name={`per`} id={skill.index.replaceAll("-", "")} defaultChecked={props.pers.pericias[skill.index.replaceAll("-", "")][1]}/>
                            <TextField sx={{width: "50px"}} name="pericias" id={`${skill.index.replaceAll("-", "")[0]}`} onChange={(e)=>{setNewValues(e)}} defaultValue={props.pers.pericias[skill.index.replaceAll("-", "")][0]} variant='standard' size='small' type='number'/>
                        </div>
                    ))}
                </div>
                <div className='w-3/10 bg-gray-300 h-1/1 p-7 rounded-xl text-sm dark:bg-gray-950 '>
                    <div className='grid grid-cols-6 h-1/2 grid-rows-[auto_auto_auto] gap-3 mb-5 dark:bg-gray-950'>
                        <div className='col-span-2 overflow-hidden rounded-xl bg-gray-100 flex flex-col justify-between dark:bg-gray-800'>
                            <TextField fullWidth variant="filled" label="CA" name="status" id="ca" onChange={(e)=>{setNewValues(e)}} defaultValue={props.pers.status.ca} type='number'/>
                        </div>
                        <div className='col-span-2 overflow-hidden rounded-xl bg-gray-100 flex flex-col justify-between dark:bg-gray-800'>
                            <TextField fullWidth variant="filled" label="Iniciativa" name="status" id="iniciativa" onChange={(e)=>{setNewValues(e)}} defaultValue={props.pers.status.iniciativa} type='number'/>
                        </div>
                        <div className='col-span-2 overflow-hidden rounded-xl bg-gray-100 flex flex-col justify-between dark:bg-gray-800'>
                            <TextField fullWidth variant="filled" label="Deslocamento" name="status" id="deslocamento" onChange={(e)=>{setNewValues(e)}} defaultValue={props.pers.status.deslocamento} type='number'/>
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
                                    <TextField variant="filled" margin="small" size="small" fullWidth label="Pontos" value={pontosVida} onChange={(e)=>{setPontosVida(e.target.value)}} type='number'/>
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
                            <div className='grid grid-cols-[1fr_auto_auto_auto] items-center justify-between' >
                                <h1 className='grow'>Sucessos</h1>
                                <Checkbox onChange={(e)=>{setNewChecked(e)}} disabled={props.pers.status.salvaguarda[0] > 1} name="0" id='suc-1' checked={props.pers.status.salvaguarda[0] > 0}/>
                                <Checkbox onChange={(e)=>{setNewChecked(e)}} disabled={props.pers.status.salvaguarda[0] < 1 || props.pers.status.salvaguarda[0] >= 3} name="0" id='suc-2' checked={props.pers.status.salvaguarda[0] > 1}/>
                                <Checkbox onChange={(e)=>{setNewChecked(e)}} disabled={props.pers.status.salvaguarda[0] < 2} name="0" id='suc-3' checked={props.pers.status.salvaguarda[0] > 2}/>
                            </div>
                            <div className='grid grid-cols-[1fr_auto_auto_auto] grid-flow-row items-center justify-between'>
                                <h1 className='grow'>Falhas</h1>
                                <Checkbox onChange={(e)=>{setNewChecked(e)}} disabled={props.pers.status.salvaguarda[1] > 1} name="1" id='fal-1' checked={props.pers.status.salvaguarda[1] > 0}/>
                                <Checkbox onChange={(e)=>{setNewChecked(e)}} disabled={props.pers.status.salvaguarda[1] < 1 || props.pers.status.salvaguarda[1] >= 3} name="1" id='fal-2' checked={props.pers.status.salvaguarda[1] > 1}/>
                                <Checkbox onChange={(e)=>{setNewChecked(e)}} disabled={props.pers.status.salvaguarda[1] < 2} name="1" id='fal-3' checked={props.pers.status.salvaguarda[1] > 2}/>
                            </div>
                            <FormHelperText>Salvaguarda contra a morte</FormHelperText>
                        </div>
                    </div>
                    <div className="h-1/2 rounded-xl flex flex-col gap-4 dark:bg-gray-950">
                        <div className="flex gap-2">
                            <div className="overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                                <TextField variant="filled" label="Inspiração" name="status" id="inspiracao" onChange={(e)=>{setNewValues(e)}} defaultValue={props.pers.status.inspiracao}/>
                            </div>
                            <div className="overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                                <TextField variant="filled" label="Sabedoria p." name="caracteristicas" id="sabpassiva" onChange={(e)=>{setNewValues(e)}} defaultValue={props.pers.caracteristicas.sabpassiva}/>
                            </div>
                            <div className="overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800    ">
                                <TextField variant="filled" label="Intuição p." name="caracteristicas" id="intupassiva" onChange={(e)=>{setNewValues(e)}} defaultValue={props.pers.caracteristicas.intupassiva}/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-center text-xl">Proficiências</h1>
                            <div className="bg-gray-100 relative rounded-xl overflow-hidden dark:bg-gray-800">
                                <TextField variant="filled" label="Armas" fullWidth name="proficiencias" id="armas" onChange={(e)=>{setNewValues(e)}} defaultValue={props.pers.proficiencias.armas}/>
                            </div>
                            <div className="bg-gray-100 relative rounded-xl overflow-hidden dark:bg-gray-800">
                                <TextField variant="filled" label="Armaduras" fullWidth name="proficiencias" id="armaduras" onChange={(e)=>{setNewValues(e)}} defaultValue={props.pers.proficiencias.armaduras}/>
                            </div>
                            <div className="bg-gray-100 relative rounded-xl overflow-hidden dark:bg-gray-800">
                                <TextField variant="filled" label="Idiomas" fullWidth name="proficiencias" id="idiomas" onChange={(e)=>{setNewValues(e)}} defaultValue={props.pers.proficiencias.idiomas}/>
                            </div>
                            <div className="bg-gray-100 relative rounded-xl overflow-hidden dark:bg-gray-800">
                                <TextField variant="filled" label="Ferramentas" fullWidth name="proficiencias" id="ferramentas" onChange={(e)=>{setNewValues(e)}} defaultValue={props.pers.proficiencias.ferramentas}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid grid-rows-4 gap-y-5 p-5 h-1/1 w-4/10 rounded-xl bg-gray-300 dark:bg-gray-950'>
                    <div className='h-1/1 bg-gray-100 w-1/1 flex flex-col justify-between relative rounded-xl overflow-hidden dark:bg-gray-800'>
                        <TextField variant="filled" id='personalidade' name='mentalidade' label="Personalidade" multiline minRows={3} maxRows={6} defaultValue={props.pers.mentalidade.personalidade} onChange={(e)=>{setNewValues(e)}}/>
                    </div>
                    <div className='h-1/1 bg-gray-100 w-1/1 flex flex-col justify-between relative rounded-xl overflow-hidden dark:bg-gray-800'>
                        <TextField variant="filled" id='ideais' name='mentalidade' label="Ideais" multiline minRows={3} maxRows={6} defaultValue={props.pers.mentalidade.ideais} onChange={(e)=>{setNewValues(e)}}/>
                    </div>
                    <div className='h-1/1 bg-gray-100 w-1/1 flex flex-col justify-between relative rounded-xl overflow-hidden dark:bg-gray-800'>
                        <TextField variant="filled" id='vinculos' name='mentalidade' label="Vinculos" multiline minRows={3} maxRows={6} defaultValue={props.pers.mentalidade.vinculos} onChange={(e)=>{setNewValues(e)}}/>
                    </div>
                    <div className='h-1/1 bg-gray-100 w-1/1 flex flex-col justify-between relative rounded-xl overflow-hidden dark:bg-gray-800'>
                        <TextField variant="filled" id='aparencia' name='caracteristicas' label="Caracteristicas" multiline minRows={3} maxRows={6} defaultValue={props.pers.caracteristicas.aparencia} onChange={(e)=>{setNewValues(e)}}/>
                    </div>
                    <div className='h-1/1 bg-gray-100 w-1/1 flex flex-col justify-between relative rounded-xl overflow-hidden dark:bg-gray-800'>
                        <TextField variant="filled" id='historia' name='identidade' label="Historia" multiline minRows={3} maxRows={6} defaultValue={props.pers.identidade.historia} onChange={(e)=>{setNewValues(e)}}/>
                    </div>
                </div>
            </div>
        </div> : ""}
    </>)
}