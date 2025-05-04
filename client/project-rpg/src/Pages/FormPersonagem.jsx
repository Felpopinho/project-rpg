import { Button, Divider, FormControl, LinearProgress, MenuItem, NativeSelect, Select, TextField, InputLabel, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
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
            },"2000")
        } else{
            setTitle("Dados do personagem")
        }
    }

    const [classe, setClasse] = useState("")
    const [raca, setRaca] = useState("")
    const [antecedente, setAntecedente] = useState("")
    const [pWeapons, setPweapons] = useState("")
    const [pArmor, setParmor] = useState("")
    const [pTools, setPtools] = useState("")

    const[selectClass, setSelectClass] = useState(false)
    const[selectRaces, setSelectRaces] = useState(false)
    const[selectBackgrounds, setSelectBackgrounds] = useState(false)

    const arrData = [props.classes, props.races, props.backgrounds]

    const setSdata = (n, data) =>{
        const select = document.getElementById(`${n === 0 ? "selectClasses" : n === 1 ? "selectRacas" : "selectAntecedentes"}`)
        if(!(select.children.length >= 2 )){
            Array.from(data).forEach(result =>{
                const option = document.createElement("option")
                option.textContent = result[Object.entries(result)[0][0]].nome
                select.appendChild(option)
                n === 0 ? setSelectClass(true) : n === 1 ? setSelectRaces(true) : setSelectBackgrounds(true)
            })
        }else{
            return
        }
    }

    const setVdata = async (n, e) =>{
        arrData[n].forEach(result =>{
            if (result[Object.entries(result)[0][0]].nome === e.target.value){
                if(n === 0){
                    setClasse(result[Object.entries(result)[0][0]])
                    setPweapons(result[Object.entries(result)[0][0]].proficiencias.armas)
                    setParmor(result[Object.entries(result)[0][0]].proficiencias.armaduras)
                    setPtools(result[Object.entries(result)[0][0]].proficiencias.ferramentas)
                } else if(n === 1){
                    setRaca(result[Object.entries(result)[0][0]])
                } else{
                    setAntecedente(result[Object.entries(result)[0][0]])
                }
            }else{
                return
            }
        })
    }

    const [sAlinhamento, setSalinhamento] = useState('')

    const handleAlinhamento = (e) =>{
        setSalinhamento(e.target.value)
    }

    const finalizarPers = async (e) =>{

        e.preventDefault()

        const d = ref.current

        console.log(pWeapons)
        console.log(pArmor)
        console.log(pTools)

        try {
            await axios.post(baseURL+"/personagens/add", {
                userId: props.user[0].uid,
                forca: objSkills.Forca[1],
                destreza: objSkills.Destreza[1],
                constituicao: objSkills.Constituicao[1],
                inteligencia: objSkills.Inteligencia[1],
                sabedoria: objSkills.Sabedoria[1],
                carisma: objSkills.Carisma[1],
                classe: classe.nome,
                raca: raca.nome,
                antecedente: antecedente.nome,
                nome: d.Nome.value,
                jogador: d.Jogador.value,
                historia: d.Historia.value,
                objetivo: d.Objetivo.value,
                idade: d.Idade.value,
                peso: d.Peso.value,
                aparencia: d.Aparencia.value,
                sabpassiva: 0,
                intupassiva: 0,
                alinhamento: sAlinhamento,
                personalidade: d.Personalidade.value,
                ideais: d.Ideais.value,
                vinculos: d.Vinculos.value,
                pericias: {
                    acrobacia: ["", false, "destreza"],
                    adestraranimais: ["", false, "sabedoria"],
                    arcanismo: ["", false, "inteligencia"],
                    atletismo: ["", false, "forca"],
                    enganacao: ["", false, "carisma"],
                    historia: ["", false, "inteligenci"],
                    intuicao: ["", false, "sabedoria"],
                    intimidacao: ["", false, "carisma"],
                    investigacao: ["", false, "inteligencia"],
                    medicina: ["", false, "sabedoria"],
                    natureza: ["", false, "inteligencia"],
                    percepcao: ["", false, "sabedoria"],
                    atuacao: ["", false, "carisma"],
                    persuasao: ["", false, "carisma"],
                    religiao: ["", false, "inteligencia"],
                    prestidigitacao: ["", false, "destreza"],
                    furtividade: ["", false, "destreza"],
                    sobrevivencia: ["", false, "sabedoria"],
                },
                ca: 10,
                iniciativa: objSkills.Destreza[0],
                deslocamento: 9,
                pv: 0,
                pvatual: 0,
                dadovida: 0,
                dadovidaatual: 0,
                salvaguarda: [0, 0],
                experiencia: 0,
                armas: pWeapons,
                armaduras: pArmor,
                idiomas: "",
                ferramentas: pTools,
                dados: []
            }).then(res =>{
                console.log(res.data)
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    const backHome = () =>{
        navigate("/home")
    }

    const [dialog, setDialog] = useState(false)

    const closeDialog = ()=>{
        setDialog(false)
        navigate("/home")
    }
    const openDialog = () =>{
        setDialog(true)
    }

    useEffect(()=>{
        loginSet === false ?  verificarLogin() : ""
    },[])
    useEffect(()=>{
        verificarInputs()
    }, [classe, raca, antecedente])

    return(<div className='h-dvh dark:bg-gray'>
        <h1 className='text-5xl text-bold p-5 text-black dark:text-white max-[570px]:text-4xl max-[440px]:text-3xl'>Criação de personagem</h1>
        <Divider sx={{margin: "2vh"}}/>
        <form className="h-8/10 w-1/1 max-[760px]:h-65/100" action="" ref={ref} onSubmit={(e)=>{finalizarPers(e)}}>
        <div className='flex flex-col justify-between items-center w-1/1 h-full'>
            <h1 className='text-3xl text-bold p-5 w-full text-black dark:text-white max-[570px]:text-2xl'>{title}</h1>
            {passo === 1 ? (<Fragment>
                <div className='grid grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr] w-1/1 max-w-160 h-auto p-10 gap-20 max-[760px]:grid-cols-[1fr_1fr] max-[760px]:grid-rows-[1fr_1fr_1fr] max-[760px]:gap-10 max-[440px]:gap-x-5'>
                {arrSkills.map(skill =>(
                    <div key={skill} className='flex flex-col justify-center items-center size-1/1 bg-gray-100 outline-3 outline-black rounded-xl dark:bg-gray-800 dark:outline-white'>
                        <h1 className='text-center h-10% text-2xl m-4 text-black dark:text-white max-[760px]:text-base'>{skill}</h1>
                        <div className='flex flex-col justify-between items-center relative h-25 w-1/1 max-[760px]:h-15'>
                            <input name="" id={`${skill}M`} readOnly className='w-1/1 h-2/3 top-0 absolute  text-center text-3xl text-black dark:text-white focus:border-0 outline-0 max-[760px]:text-xl'/>                
                            <input type="number" name={skill} onChange={(e)=>{setarHabilidade(e)}} className='w-15 h-15 -bottom-6 absolute outline-3 outline-purple-900 rounded-full text-center bg-gray-100 text-black dark:text-white dark:bg-gray-800 focus:border-0 max-[760px]:h-10'/>                
                        </div>
                    </div>
                ))}
                </div>
            </Fragment>) : passo === 2 ? (<Fragment>
                <div className='grid grid-cols-3 gap-20 w-9/10 h-8/10 max-[1100px]:flex max-[1100px]:flex-col max-[1100px]:h-auto max-[1100px]:justify-start'>
                    <div className='flex flex-col justify-between w-1/1 p-10 bg-gray-100 rounded-2xl relative overflow-hidden dark:bg-gray-800'>
                        <h1 className='text-2xl text-bold text-black dark:text-white'>Classe</h1>
                        <LinearProgress sx={selectClass === false ? {position: "absolute", width: "100%", top: '0', left: "0", display: "block"} : {display: "none"}}/>
                        <div>
                            <NativeSelect className='w-full' sx={selectClass === false ? {display: "none"} : {fontSize: "1.3rem", display: "block"}} id='selectClasses' label="Classes" onChange={(e)=>{setVdata(0,e)}}><option></option></NativeSelect>
                            <div className='overflow-y-auto w-90% h-90 pt-2 max-[560px]:text-sm'>{ classe === "" ? "" :
                                    <h1 className='h-1/1 text-black dark:text-white'>Descricao: <span>{classe.descricao}</span></h1>
                            }</div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between w-1/1 p-10 bg-gray-100 rounded-2xl relative overflow-hidden dark:bg-gray-800'>
                        <h1 className='text-2xl text-bold text-black dark:text-white'>Raça</h1>
                        <LinearProgress sx={selectRaces === false ? {position: "absolute", width: "100%", top: '0', left: "0", display: "block"} : {display: "none"}}/>
                        <div>
                            <NativeSelect className='w-full' sx={selectRaces === false ? {display: "none"} : {fontSize: "1.3rem", display: "block"}} id='selectRacas' label="Raças" onChange={(e)=>{setVdata(1,e)}}><option></option></NativeSelect>
                            <div className='h-50 overflow-y-auto w-90% h-90 p-2 max-[560px]:text-sm'>{ raca === "" ? "" :
                                    <h1 className='h-1/1 text-black dark:text-white'>Descricao: <span>{raca.descricao}</span></h1>
                            }</div>
                        </div>
                        
                    </div>
                    <div className='flex flex-col justify-between w-1/1 p-10 bg-gray-100 rounded-2xl relative overflow-hidden dark:bg-gray-800'>
                        <h1 className='text-2xl text-bold text-black dark:text-white'>Antecedente</h1>
                        <LinearProgress sx={selectBackgrounds === false ? {position: "absolute", width: "100%", top: '0', left: "0", display: "block"} : {display: "none"}}/>
                        <div>
                            <NativeSelect className='w-full' sx={selectBackgrounds === false ? {display: "none"} : {fontSize: "1.3rem", display: "block"}} id='selectAntecedentes' label="Antecedentes" onChange={(e)=>{setVdata(2,e)}}><option></option></NativeSelect>
                            <div className='h-50 overflow-y-auto w-90% h-90 p-2 max-[560px]:text-sm'>{ antecedente === "" ? "" :
                                    <h1 className='h-1/1 text-black dark:text-white'>Descricao: <span>{antecedente.descricao}</span></h1>
                            }</div>
                        </div>
                    </div>
                </div>
            </Fragment>) : (<Fragment>
                <div className='grid grid-cols-[1fr_1fr_1fr_1fr] gap-5 p-10'>
                    <TextField required label="Nome" name="Nome" className='col-span-2 max-[670px]:col-span-4'></TextField>
                    <TextField required label="Jogador" name="Jogador" className='col-span-2 max-[670px]:col-span-4'></TextField>
                    <TextField label="Idade" name="Idade" className='max-[670px]:col-span-2'></TextField>
                    <TextField label="Peso" name="Peso" className='max-[670px]:col-span-2'></TextField>
                    <FormControl className='flex max-[670px]:col-span-2'>
                        <InputLabel>Alinhamento</InputLabel>
                        <Select required id='selectAlinhamentoUm' value={sAlinhamento} label="Alinhamento" name='AlinhamentoUm' onChange={(e)=>{handleAlinhamento(e, 1)}}>
                            <MenuItem value={"Leal e bom"}>Leal e bom</MenuItem>
                            <MenuItem value={"Neutro e bom"}>Neutro e Bom</MenuItem>
                            <MenuItem value={"Caótico e bom"}>Caótico e Bom</MenuItem>
                            <MenuItem value={"Leal e neutro"}>Leal e Neutro</MenuItem>
                            <MenuItem value={"Neutro"}>Neutro</MenuItem>
                            <MenuItem value={"Caótico e neutro"}>Caótico e Neutro</MenuItem>
                            <MenuItem value={"Leal e mau"}>Leal e Mau</MenuItem>
                            <MenuItem value={"Neutro e mau"}>Neutro e Mau</MenuItem>
                            <MenuItem value={"Caotico e mau"}>Caótico e Mau</MenuItem>
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
                {passo === 1 ? <Button variant='outlined' disabled={passo !== 1} onClick={()=>{backHome()}}>Sair</Button> :  
                <Button variant='outlined' disabled={passo === 1} onClick={()=>{proxPasso(-1)}}>Voltar</Button>}
                
                {passo === 3 ? <Button variant='contained' type='submit' onClick={openDialog}>finalizar</Button> :
                <Button disabled={iVerificacao === false} variant='contained' onClick={()=>{proxPasso(1)}}>Proximo</Button>}

                <Dialog open={dialog} onClose={closeDialog}>
                    <DialogTitle>{"O seu personagem está sendo criado"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Lembre-se a conclusão da sua ficha ainda não está perfeita. Após a criação entre e edite as informações para deixa-la 100%
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeDialog}>Entendi</Button>
                    </DialogActions>
                </Dialog>
            </div>
        
        </div>
        </form>
    
    </div>)
}