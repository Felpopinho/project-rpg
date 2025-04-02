import { Button, Divider, FormControl, LinearProgress, MenuItem, NativeSelect, Select, TextField, InputLabel } from '@mui/material'
import axios from 'axios'
import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function FormPersonagem(props){

    const navigate = useNavigate()

    const arrSkills = ["Forca","Destreza","Constituicao","Inteligencia","Sabedoria","Carisma"]
    const [objSkills, setObjSkills] = useState({
        Forca: "",
        Destreza: "",
        Constituicao: "",
        Inteligencia: "",
        Sabedoria: "",
        Carisma: "",
    })

    const [loginSet, setLoginSet] = useState(false)

    const verificarLogin = () =>{
        if(props.user === ""){
            navigate("/")
        } else{
            return setLoginSet(true)
        }
    }

    const verificarInputs = () =>{
        let v = 0
        arrSkills.forEach(skill =>{
            if(document.getElementById(`${skill}M`).value){
                v = v+1
            }else{
                return
            }
        })
        if(v === 6){
            v = 0
            setIverificacao(true)
        } else{
            v = 0
            setIverificacao(false)
        }
    }

    const setarHabilidade = (e) =>{
        const name = e.target.name
        const cModificador = parseInt((Number(e.target.value)-10)/2)
        document.getElementById(`${name}M`).value = cModificador
        setObjSkills((prevState) => ({
            ...prevState,
            [name]: [cModificador,Number(e.target.value)]
        }))
        verificarInputs()
    }

    const [iVerificacao, setIverificacao] = useState(false)


    const [passo, setPasso] = useState(1)
    const [title, setTitle] = useState("Habilidades")

    const proxPasso = (n) =>{
        const npasso = passo+n
        setPasso(passo+n)
        if(npasso === 1){
            setTitle("Habilidades")
        }else if(npasso === 2){
            setTitle("Classe, Raça e Antecedente")
            setTimeout(()=>{
                setSdata(0, props.classes)
                setSdata(1, props.races)
                setSdata(2, props.backgrounds)
            }, "4000")
        } else{
            setTitle("Dados do personagem")
        }
    }

    const [classe, setClasse] = useState("")
    const [raca, setRaca] = useState("")
    const [antecedente, setAntecedente] = useState("")

    const arrData = [props.classes, props.races, props.backgrounds]

    const setSdata = (n, data) =>{
        const select = document.getElementById(`${n === 0 ? "selectClasses" : n === 1 ? "selectRacas" : "selectAntecedentes"}`)
        if(!(select.children.length >= 2 )){
            Array.from(data.results).forEach(result =>{
                const option = document.createElement("option")
                option.textContent = result.name
                select.appendChild(option)
            })
        }else{
            return
        }
    }

    const [dataSet, setDataSet] = useState(false)

    const setVdata = async (n, e) =>{
        let data
        arrData[n].results.forEach(result =>{
            if (result.name === e.target.value){
                n === 0 ? setClasse(result) : n === 1 ? setRaca(result) : setAntecedente(result)
                data = result
            }else{
                return
            }
        })
    }

    const [sAlinhamentoUm, setSalinhamentoUm] = useState('')
    const [sAlinhamentoDois, setSalinhamentoDois] = useState('')

    const handleAlinhamento = (e, n) =>{
        n === 1 ? setSalinhamentoUm(e.target.value) : setSalinhamentoDois(e.target.value)
    }

    const finalizarPers = () =>{
        console.log(objSkills)
        console.log(classe.name)
        console.log(raca.name)
        console.log(antecedente.name)
        console.log("objDados")
    }

    useEffect(()=>{
        loginSet === false ?  verificarLogin() : ""

    },[])

    return(<div className='h-dvh dark:bg-gray'>
    
        <h1 className='text-5xl text-bold p-5 text-black dark:text-white'>Criação de personagem</h1>
        <Divider sx={{margin: "2vh"}}/>
        <div className='flex flex-col justify-between items-center w-1/1 h-8/10'>
            <h1 className='text-3xl text-bold p-5 mb-4 w-full text-black dark:text-white'>{title}</h1>
            {passo === 1 ? (<Fragment>
                <div className='grid grid-cols-3 gap-20'>
                {arrSkills.map(skill =>(
                    <div key={skill} className='flex flex-col justify-center items-center h-1/1 w-1/1 bg-gray-100 outline-3 outline-black rounded-xl dark:bg-gray-800 dark:outline-white'>
                        <h1 className='text-center h-10% text-2xl m-4 text-black dark:text-white'>{skill}</h1>
                        <div className='flex flex-col justify-between items-center relative h-25 w-1/1'>
                            <input name="" id={`${skill}M`} readOnly className='w-20 h-2/3 top-0 absolute  text-center text-3xl text-black dark:text-white focus:border-0 outline-0 '/>                
                            <input type="number" name={skill} onChange={(e)=>{setarHabilidade(e)}} className='w-15 h-15 -bottom-6 absolute outline-3 outline-purple-900 rounded-full text-center bg-gray-100 text-black dark:text-white dark:bg-gray-800 focus:border-0'/>                
                        </div>
                    </div>
                ))}
                </div>
            </Fragment>) : passo === 2 ? (<Fragment>
                <div className='grid grid-cols-3 gap-20 w-9/10 h-8/10'>
                    <div className='flex flex-col justify-between w-1/1 p-10 bg-gray-100 rounded-2xl relative overflow-hidden dark:bg-gray-800'>
                        <h1 className='text-2xl text-bold text-black dark:text-white'>Classe</h1>
                        <LinearProgress sx={props.classes === "" ? {position: "absolute", width: "100%", top: '0', left: "0", display: "block"} : {display: "none"}}/>
                        <div>
                            <NativeSelect className='w-full' sx={{fontSize: "1.3rem"}} id='selectClasses' label="Classes" onChange={(e)=>{setVdata(0,e)}}><option></option></NativeSelect>
                            <div className='overflow-y-auto w-90% h-90 '>{ classe === "" ? "" :
                                    <h1 className='h-1/1 text-black dark:text-white'>Descricao: <span>{classe.desc.replaceAll("#","")}</span></h1>
                            }</div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between w-1/1 p-10 bg-gray-100 rounded-2xl relative overflow-hidden dark:bg-gray-800'>
                        <h1 className='text-2xl text-bold text-black dark:text-white'>Raça</h1>
                        <LinearProgress sx={props.races === "" ? {position: "absolute", width: "100%", top: '0', left: "0", display: "block"} : {display: "none"}}/>
                        <div>
                            <NativeSelect className='w-full' sx={{fontSize: "1.3rem"}} id='selectRacas' label="Raças" onChange={(e)=>{setVdata(1,e)}}><option></option></NativeSelect>
                            <div className='h-50 overflow-y-auto w-90% h-90'>{ raca === "" ? "" :
                                    <h1 className='h-1/1 text-black dark:text-white'>Descricao: <span>{raca.desc.replaceAll("#","")}</span></h1>
                            }</div>
                        </div>
                        
                    </div>
                    <div className='flex flex-col justify-between w-1/1 p-10 bg-gray-100 rounded-2xl relative overflow-hidden dark:bg-gray-800'>
                        <h1 className='text-2xl text-bold text-black dark:text-white'>Antecedente</h1>
                        <LinearProgress sx={props.backgrounds === "" ? {position: "absolute", width: "100%", top: '0', left: "0", display: "block"} : {display: "none"}}/>
                        <div>
                            <NativeSelect className='w-full' sx={{fontSize: "1.3rem"}} id='selectAntecedentes' label="Antecedentes" onChange={(e)=>{setVdata(2,e)}}><option></option></NativeSelect>
                            <div className='h-50 overflow-y-auto w-90% h-90'>{ antecedente === "" ? "" :
                                    <h1 className='h-1/1 text-black dark:text-white'>Descricao: <span>{antecedente.desc.replaceAll("#","")}</span></h1>
                            }</div>
                        </div>
                    </div>
                </div>
            </Fragment>) : (<Fragment>
                <div className='grid grid-cols-4 gap-5'>
                    <TextField label="Nome" className='col-span-2'></TextField>
                    <TextField label="Jogador" className='col-span-2'></TextField>
                    <TextField label="Idade"></TextField>
                    <TextField label="Peso"></TextField>
                    <FormControl className='flex'>
                        <InputLabel>Alinhamento</InputLabel>
                        <Select value={sAlinhamentoUm} label="Alinhamento" onChange={(e)=>{handleAlinhamento(e, 1)}}>
                            <MenuItem value={"o"}>Ordeiro</MenuItem>
                            <MenuItem value={"b"}>Bom</MenuItem>
                            <MenuItem value={"n"}>Neutro</MenuItem>
                            <MenuItem value={"m"}>Mau</MenuItem>
                            <MenuItem value={"c"}>Caotico</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className='flex'>
                        <InputLabel>Alinhamento</InputLabel>
                        <Select value={sAlinhamentoDois} label="Alinhamento" onChange={(e)=>{handleAlinhamento(e, 2)}}>
                            <MenuItem value={"O"}>Ordeiro</MenuItem>
                            <MenuItem value={"B"}>Bom</MenuItem>
                            <MenuItem value={"N"}>Neutro</MenuItem>
                            <MenuItem value={"M"}>Mau</MenuItem>
                            <MenuItem value={"C"}>Caotico</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField multiline rows={2} label="Caracteristicas" className='col-span-4'></TextField>
                    <TextField multiline rows={2} label="Personalidade" className='col-span-4'></TextField>
                    <TextField multiline rows={2} label="Ideais" className='col-span-4'></TextField>
                    <TextField multiline rows={2} label="Vinculos" className='col-span-4'></TextField>
                    <TextField multiline rows={4} label="Historia" className='col-span-4'></TextField>
                    <TextField multiline rows={3} label="Objetivo" className='col-span-4'></TextField>
                </div>
            </Fragment>)}
            <div className='flex p-5 w-2/3 justify-around'>
                <Button variant='outlined' onClick={()=>{proxPasso(-1)}}>Voltar</Button>
                <Button variant='contained' onClick={passo === 3 ? ()=>{finalizarPers()} : ()=>{proxPasso(1)}}>{passo === 3 ? "Finalizar" : "Proximo"}</Button>
            </div>
        </div>
    
    </div>)
}