import { Button, Divider, FormControl, LinearProgress, MenuItem, NativeSelect, Select, TextField, InputLabel } from '@mui/material'
import axios from 'axios'
import { Fragment, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { baseURL } from '../App.jsx'

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

    const ref = useRef()

    const [loginSet, setLoginSet] = useState(false)

    const verificarLogin = () =>{
        if(props.user === ""){
            navigate("/")
        } else{
            return setLoginSet(true)
        }
    }

    const [iVerificacao, setIverificacao] = useState(false)

    const verificarInputs = () =>{
        if(passo === 1){
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
        } else if(passo === 2){
            if(classe === "" || raca === "" || antecedente === ""){
                setIverificacao(false)
            } else{
                setIverificacao(true)
            }
        } else{
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


    const [passo, setPasso] = useState(1)
    const [title, setTitle] = useState("Habilidades")

    const proxPasso = (n) =>{
        const npasso = passo+n
        setPasso(passo+n)
        if(npasso === 1){
            setTitle("Habilidades")
            verificarInputs()
        }else if(npasso === 2){
            setIverificacao(false)
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

    const[selectClass, setSelectClass] = useState(false)
    const[selectRaces, setSelectRaces] = useState(false)
    const[selectBackgrounds, setSelectBackgrounds] = useState(false)

    const arrData = [props.classes, props.races, props.backgrounds]

    const setSdata = (n, data) =>{
        const select = document.getElementById(`${n === 0 ? "selectClasses" : n === 1 ? "selectRacas" : "selectAntecedentes"}`)
        if(!(select.children.length >= 2 )){
            Array.from(data.results).forEach(result =>{
                const option = document.createElement("option")
                option.textContent = result.name
                select.appendChild(option)
                n === 0 ? setSelectClass(true) : n === 1 ? setSelectRaces(true) : setSelectBackgrounds(true)
            })
        }else{
            return
        }
    }

    const [dataSet, setDataSet] = useState(false)

    const setVdata = async (n, e) =>{
        arrData[n].results.forEach(result =>{
            if (result.name === e.target.value){
                n === 0 ? setClasse(result) : n === 1 ? setRaca(result) : setAntecedente(result)
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

    const finalizarPers = async (e) =>{

        e.preventDefault()

        const d = ref.current


        const rAlinhamento = (d.AlinhamentoUm.value+d.AlinhamentoDois.value).toUpperCase()

        try {
            await axios.post(baseURL+"/personagens/add", {
                userId: props.user[0].uid,
                forca: objSkills.Forca[1],
                destreza: objSkills.Destreza[1],
                constituicao: objSkills.Constituicao[1],
                inteligencia: objSkills.Inteligencia[1],
                sabedoria: objSkills.Sabedoria[1],
                carisma: objSkills.Carisma[1],
                classe: classe.name,
                raca: raca.name,
                antecedente: antecedente.name,
                nome: d.Nome.value,
                jogador: d.Jogador.value,
                historia: d.Historia.value,
                objetivo: d.Objetivo.value,
                idade: d.Idade.value,
                peso: d.Peso.value,
                aparencia: d.Aparencia.value,
                alinhamento: rAlinhamento,
                personalidade: d.Personalidade.value,
                ideais: d.Ideais.value,
                vinculos: d.Vinculos.value
            }).then(res =>{
                navigate("/home")
                console.log(res.data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        loginSet === false ?  verificarLogin() : ""
    },[])
    useEffect(()=>{
        verificarInputs()
    }, [classe, raca, antecedente])

    return(<div className='h-dvh dark:bg-gray'>
        <h1 className='text-5xl text-bold p-5 text-black dark:text-white'>Criação de personagem</h1>
        <Divider sx={{margin: "2vh"}}/>
        <form className="h-8/10 w-1/1" action="" ref={ref} onSubmit={(e)=>{finalizarPers(e)}}>
        <div className='flex flex-col justify-between items-center w-1/1 h-full'>
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
                        <LinearProgress sx={selectClass === false ? {position: "absolute", width: "100%", top: '0', left: "0", display: "block"} : {display: "none"}}/>
                        <div>
                            <NativeSelect className='w-full' sx={selectClass === false ? {display: "none"} : {fontSize: "1.3rem", display: "block"}} id='selectClasses' label="Classes" onChange={(e)=>{setVdata(0,e)}}><option></option></NativeSelect>
                            <div className='overflow-y-auto w-90% h-90 '>{ classe === "" ? "" :
                                    <h1 className='h-1/1 text-black dark:text-white'>Descricao: <span>{classe.desc.replaceAll("#","")}</span></h1>
                            }</div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between w-1/1 p-10 bg-gray-100 rounded-2xl relative overflow-hidden dark:bg-gray-800'>
                        <h1 className='text-2xl text-bold text-black dark:text-white'>Raça</h1>
                        <LinearProgress sx={selectRaces === false ? {position: "absolute", width: "100%", top: '0', left: "0", display: "block"} : {display: "none"}}/>
                        <div>
                            <NativeSelect className='w-full' sx={selectRaces === false ? {display: "none"} : {fontSize: "1.3rem", display: "block"}} id='selectRacas' label="Raças" onChange={(e)=>{setVdata(1,e)}}><option></option></NativeSelect>
                            <div className='h-50 overflow-y-auto w-90% h-90'>{ raca === "" ? "" :
                                    <h1 className='h-1/1 text-black dark:text-white'>Descricao: <span>{raca.desc.replaceAll("#","")}</span></h1>
                            }</div>
                        </div>
                        
                    </div>
                    <div className='flex flex-col justify-between w-1/1 p-10 bg-gray-100 rounded-2xl relative overflow-hidden dark:bg-gray-800'>
                        <h1 className='text-2xl text-bold text-black dark:text-white'>Antecedente</h1>
                        <LinearProgress sx={selectBackgrounds === false ? {position: "absolute", width: "100%", top: '0', left: "0", display: "block"} : {display: "none"}}/>
                        <div>
                            <NativeSelect className='w-full' sx={selectBackgrounds === false ? {display: "none"} : {fontSize: "1.3rem", display: "block"}} id='selectAntecedentes' label="Antecedentes" onChange={(e)=>{setVdata(2,e)}}><option></option></NativeSelect>
                            <div className='h-50 overflow-y-auto w-90% h-90'>{ antecedente === "" ? "" :
                                    <h1 className='h-1/1 text-black dark:text-white'>Descricao: <span>{antecedente.desc.replaceAll("#","")}</span></h1>
                            }</div>
                        </div>
                    </div>
                </div>
            </Fragment>) : (<Fragment>
                <div className='grid grid-cols-4 gap-5'>
                    <TextField required label="Nome" name="Nome" className='col-span-2'></TextField>
                    <TextField required label="Jogador" name="Jogador" className='col-span-2'></TextField>
                    <TextField label="Idade" name="Idade"></TextField>
                    <TextField label="Peso" name="Peso"></TextField>
                    <FormControl className='flex'>
                        <InputLabel>Alinhamento</InputLabel>
                        <Select required id='selectAlinhamentoUm' value={sAlinhamentoUm} label="Alinhamento" name='AlinhamentoUm' onChange={(e)=>{handleAlinhamento(e, 1)}}>
                            <MenuItem value={"o"}>Ordeiro</MenuItem>
                            <MenuItem value={"b"}>Bom</MenuItem>
                            <MenuItem value={"n"}>Neutro</MenuItem>
                            <MenuItem value={"m"}>Mau</MenuItem>
                            <MenuItem value={"c"}>Caotico</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className='flex'>
                        <InputLabel>Alinhamento</InputLabel>
                        <Select required value={sAlinhamentoDois} label="Alinhamento" name="AlinhamentoDois" onChange={(e)=>{handleAlinhamento(e, 2)}}>
                            <MenuItem value={"O"}>Ordeiro</MenuItem>
                            <MenuItem value={"B"}>Bom</MenuItem>
                            <MenuItem value={"N"}>Neutro</MenuItem>
                            <MenuItem value={"M"}>Mau</MenuItem>
                            <MenuItem value={"C"}>Caotico</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField multiline rows={2} label="Aparência" name="Aparencia" className='col-span-4'></TextField>
                    <TextField multiline rows={2} label="Personalidade" name="Personalidade" className='col-span-4'></TextField>
                    <TextField multiline rows={2} label="Ideais" name="Ideais" className='col-span-4'></TextField>
                    <TextField multiline rows={2} label="Vinculos" name="Vinculos" className='col-span-4'></TextField>
                    <TextField multiline rows={4} label="Historia" name="Historia" className='col-span-4'></TextField>
                    <TextField multiline rows={3} label="Objetivo" name="Objetivo" className='col-span-4'></TextField>
                </div>
            </Fragment>)}
            <div className='flex p-5 w-2/3 justify-around'>
                <Button variant='outlined' onClick={()=>{proxPasso(-1)}}>Voltar</Button>
                {passo === 3 ? <Button variant='contained' type='submit'>finalizar</Button>:
                <Button disabled={iVerificacao === false} variant='contained' onClick={()=>{proxPasso(1)}}>Proximo</Button>}
            </div>
        
        </div>
        </form>
    
    </div>)
}