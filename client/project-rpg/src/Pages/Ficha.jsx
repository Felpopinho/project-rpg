import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Avatar, Box, Button, Divider, TextField, IconButton, Icon, Checkbox, Input, LinearProgress, FormHelperText, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Menu, Tabs, Tab, Select, MenuItem, Alert, Snackbar, AlertTitle, Drawer, Switch, FormControlLabel, Modal } from '@mui/material'
import axios from 'axios'
import { red } from '@mui/material/colors'
import { baseURL } from '../App'

export function Ficha(props){

    const navigate = useNavigate()

    const verificarLogin = () =>{
        if(localStorage.getItem("personagem").length){
            props.setActualPers(JSON.parse(localStorage.getItem("personagem")))
        }else if(props.user === ""){
            return navigate("/")
        }else{
            return navigate("/home")
        }
    }

    const putPersonagem = async () =>{
        try {
            await axios.post(baseURL+"/personagens/update", {
                id: props.pers.uid,
                personagem: props.pers
            }).then(res =>{
                console.log(res.data)
                localStorage.setItem("personagem", JSON.stringify(props.pers))
            })
        } catch (error) {
            console.log(error)
        }
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl)
    const openMenu = (e) => {
        setAnchorEl(e.currentTarget);
      };

    const closeMenu = (e) =>{
        setAnchorEl(null);
        if(e === "delete"){
            openDialogDelete()
        } else if(e === "delete"){
            alterarImagem()
        } else{
            return
        }
    }

    const [dialogDelete, setDialogDelete] = useState(false)

    const closeDialogDelete = (n, id)=>{
        if(n === 1){
            setDialogDelete(false)
        } else{
            deletarPersonagem(id)
            navigate("/home")
        }
    }
    const openDialogDelete = () =>{
        setDialogDelete(true)
    }

    const deletarPersonagem = async (id) =>{
        try {
            await axios.post(baseURL+"/personagens/delete", {
                id: id
            }).then(res=>{
                console.log(res.data)
                props.getPersonagens()
            })
        } catch (error) {
            console.log(error)
        }
    }

    const [skills, setSkills] = useState("")

    const [skillMvalue, setSkillMvalue] = useState("")

    const getSkills = async () =>{
        try {
            await axios.get(baseURL+"/dnd/proficiencias").then(res=>{
                const result = res.data.filter(proficiencia => (
                    Object.entries(proficiencia)[0][0] === "habilidades"
                ))
                console.log(result[0].habilidades)
                setSkills(result[0].habilidades)
                
                
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
        props.setActualPers(prevState => ({
            ...prevState,
            habilidades: {
                ...props.pers.habilidades,
                [e.target.name]: Number(e.target.value)
            }
        }))
    }

    const [life, setLife] = useState(0)
    const [pontosVida, setPontosVida] = useState("")

    const setarPv = () =>{
        const n = 100/props.pers.status.pv
        const n2 = n*props.pers.status.pvatual
        setLife(n2)
    }

    const handleLife = (num) =>{
        console.log(life)
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
            setLife(parseInt(life+n2))
        }
        setPontosVida("")
    }

    const [pontosXp, setPontosXp] = useState("")

    const handleXp = (num) =>{
        const pontos = pontosXp.length ? Number(pontosXp) : 1

        if(num === 0){
            props.setActualPers(prevState =>({
                ...prevState,
                status: {
                    ...props.pers.status,
                    experiencia: props.pers.status.experiencia - pontos
                }
            }))
        } else{
            props.setActualPers(prevState =>({
                ...prevState,
                status: {
                    ...props.pers.status,
                    experiencia: props.pers.status.experiencia + pontos
                }
            }))
        }
        
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
    }

    const setNewProf = (e, n) =>{
        let nValue;
        console.log(e.target.value)
        if(n === 1){
            if(props.pers.pericias[e.target.id][1] === false){
                nValue = true
            } else{
                nValue = false
            }
            props.setActualPers(prevState => ({
                ...prevState,
                pericias: {
                    ...props.pers.pericias,
                    [e.target.id]: [props.pers.pericias[e.target.id][0], nValue, props.pers.pericias[e.target.id][2]]
                }
            }))
        } else{
            props.setActualPers(prevState => ({
                ...prevState,
                pericias: {
                    ...props.pers.pericias,
                    [e.target.id]: [parseInt(e.target.value), props.pers.pericias[e.target.id][1], props.pers.pericias[e.target.id][2]]
                }
            }))
        }
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

    const [tabValue, setTabValue] = useState("1")
    const handleTab = (e, v) =>{
        setTabValue(v)
    }

    const [sDadoValue, setSdadoValue] = useState(4)
    const handleSdado = (e) =>{
        setSdadoValue(e.target.value)
    }
    const [qDados, setQdados] = useState(0)
    const [soma, setSoma] = useState(0)
    const [resultDados, setResultDados] = useState(0)
    const [arrResultDados, setArrResultDados] = useState([])

    const [actualSoma, setActualSoma] = useState(0)

    const [resultTime, setResultTime] = useState(false)

    const rolarDados = (q, d, s, sd) =>{
        setActualSoma(s)
        let result = 0;
        let arrDados = []
        for (let i = 0; i < q; i++) {
            let dadoValue = Math.floor( 1 + d*Math.random())
            arrDados.push(dadoValue)
            if(sd === true){
                result = result + dadoValue
            } else{
                result = result > dadoValue ? result : dadoValue
            }
        }
        result = result + s
        let dadosJogados = `${q}d${d}+${s}`
        let dadosResult = `${arrDados} + ${s} = ${result}`

        if(Array.from(props.pers.status.dados).length > 20){

            const arrHistorico = props.pers.status.dados
            arrHistorico.shift()
            arrHistorico.push({
                djogados: dadosJogados, 
                dresult: dadosResult, 
                result: result
            })
            props.setActualPers(prevState => ({
                ...prevState,
                status: {
                    ...props.pers.status,
                    dados: arrHistorico
                }
            }))


        }else{
            props.setActualPers(prevState => ({
                ...prevState,
                status: {
                    ...props.pers.status,
                    dados: [
                        ...props.pers.status.dados,
                        {
                            djogados: dadosJogados, 
                            dresult: dadosResult, 
                            result: result
                        }
                    ]
                }
            }))
        }
        setArrResultDados(arrDados)
        setResultDados(result)
        setResultSnack(true)
        setResultTime(true)
    }

    const [resultSnack, setResultSnack] = useState(false)
    const handleCloseResult = () =>{
        setResultSnack(false)
        setTimeout(()=>{
            setResultTime(false)
        }, "500")
    }

    const [somarDados, setSomarDados] = useState(false)

    const [historico, setHistorico] = useState(false)

    const [mCriarRolagem, setMcriarRolagem] = useState(false)
    const [nomeDadoCriar, setNomeDadoCriar] = useState("")
    const [sDadoValueCriar, setSdadoValueCriar] = useState(4)
    const [qDadosCriar, setQdadosCriar] = useState(0)
    const [somaCriar, setSomaCriar] = useState(0)
    const [somarDadosCriar, setSomarDadosCriar] = useState(false)

    const handleCloseCriarRolagem = () =>{
        setSdadoValueCriar(4)
        setQdadosCriar(0)
        setSomaCriar(0)
        setSomarDadosCriar(false)
        setMcriarRolagem(false)
    }

    const criarRolagem = () =>{
        if(editRolagem===true){

            const arrRolagem = props.pers.status.rolagens
            arrRolagem[indexRolagem] = {
                nome: nomeDadoCriar,
                quantidade: qDadosCriar,
                tipo: sDadoValueCriar,
                soma: somaCriar,
                somadados: somarDadosCriar
            }

            props.setActualPers(prevState => ({
                ...prevState,
                status: {
                    ...props.pers.status,
                    rolagens: arrRolagem
                }
            }))
        }else{
            props.setActualPers(prevState => ({
                ...prevState,
                status: {
                    ...props.pers.status,
                    rolagens: [
                        ...props.pers.status.rolagens,
                        {
                            nome: nomeDadoCriar,
                            quantidade: qDadosCriar,
                            tipo: sDadoValueCriar,
                            soma: somaCriar,
                            somadados: somarDadosCriar
                        }
                    ]
                }
            }))
        }
        handleCloseCriarRolagem()
    }

    const [editRolagem, setEditRolagem] = useState(false)
    const [indexRolagem, setIndexRolagem] = useState("")
    const editarRolagem = (r) =>{
        setIndexRolagem(Array.from(props.pers.status.rolagens).indexOf(r))
        setEditRolagem(true)
        setNomeDadoCriar(r.nome)
        setSdadoValueCriar(r.tipo)
        setQdadosCriar(r.quantidade)
        setSomaCriar(r.soma)
        setSomarDadosCriar(r.somadados)
        setMcriarRolagem(true)
    }

    const deletarRolagem = (r) =>{
        const arrRolagem = props.pers.status.rolagens
        const index = arrRolagem.indexOf(r)
        arrRolagem.splice(index, 1)

        props.setActualPers(prevState => ({
            ...prevState,
            status: {
                ...props.pers.status,
                rolagens: arrRolagem
            }
        }))
    }

    const [modalCriar, setModalCriar] = useState(false)
    const [modalAdicionar, setModalAdicionar] = useState(false)

    const openModalItem = (n) =>{
        if(n === 0){
            setModalCriar(true)
        }else{
            setModalAdicionar(true)
        }
    }

    const closeModalItem = (n) =>{
        if(n === 0){
            setModalCriar(false)
        }else{
            setModalAdicionar(false)
        }
    }

    useEffect(()=>{
        props.pers === "" ? "" : setModificadores()
        props.pers === "" ? "" : setarNivel()
        props.pers === "" ? "" : setarPv()
        props.pers === "" ? "" : putPersonagem()
    }, [props.pers])

    useEffect(()=>{
        verificarLogin()
        getSkills()
    },[])

    const arrSkills = ["forca","destreza","constituicao","inteligencia","sabedoria","carisma"]

    return (<>
        {props.pers !== "" ? 
        <div className=' relative w-1/1 min-h-dvh p-10 max-[584px]:p-5'>

            <Dialog open={dialogDelete} onClose={closeDialogDelete}>
                <DialogTitle>{"Você tem certeza que deseja excluir seu personagem?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Lembre-se, após a exclusão seu personagem será excluido permanentemente e você sera redirecionado para a pagina principal
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{justifyContent: "space-between"}}>
                    <Button onClick={()=>{closeDialogDelete(1)}}>Cancelar</Button>
                    <Button color='error' onClick={()=>{closeDialogDelete(2, props.pers.uid)}}>Excluir</Button>
                </DialogActions>
            </Dialog>
            
            <div className='relative p-5 rounded-xl bg-gray-300 flex gap-5 dark:bg-gray-950 max-[800px]:flex-col'>
                <div className='absolute bg-white rounded-full top-2 left-2'>
                    <IconButton onClick={openMenu}><Icon>settings</Icon></IconButton>
                    <Menu anchorEl={anchorEl} open={open} onClose={closeMenu} >
                        <MenuItem onClick={()=>{closeMenu("delete")}}><Icon sx={{marginRight: "5px"}}>delete</Icon>Apagar</MenuItem>
                        <MenuItem><Icon sx={{marginRight: "5px"}}>image</Icon>Imagem</MenuItem>
                    </Menu>
                </div>
                <div className='grid grid-cols-[auto_auto_auto] gap-4 justify-items-start p-3 items-center font-bold text-lg bg-gray-200 rounded-lg dark:bg-gray-800'>
                    <div className='col-span-3 grid grid-cols-[100px_auto] gap-5 w-1/1 rounded-lg overflow-hidden'>
                        <div className='w-[100px] h-25 overflow-hidden rounded-lg'>
                            <img className='' src={'https://orbedosdragoes.com/wp-content/uploads/2017/06/DD5-Guerreiro_1.jpg'}/>
                        </div>
                        <Input sx={{fontSize: "2rem", height: "100%"}} name='identidade' id='nome' multiline maxRows={2} variant="filled" size='normal' className='text-xl' fullWidth defaultValue={props.pers.identidade.nome} onChange={(e)=>{setNewValues(e)}}/>
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
                    <h1 className='col-span-2 text-2xl text-center'>Tabela de XP</h1>
                    <div>
                        <TextField variant="filled" value={props.pers.status.experiencia} name="status" id="experiencia" label="Pontos de experiência" slotProps={{input: {readOnly: true,},}}/>
                    </div>
                    <div>
                        <TextField variant="filled" value={nivel} slotProps={{input: {readOnly: true,},}} label="Nivel"/>
                    </div>
                    <div className='col-span-2 flex justify-between items-center'>
                        <IconButton onClick={()=>{handleXp(0)}}><Icon>remove</Icon></IconButton>
                        <TextField variant="filled" fullWidth size='small' label="Pontos" value={pontosXp} onChange={(e)=>{setPontosXp(e.target.value)}}/>
                        <IconButton onClick={()=>{handleXp(1)}}><Icon>add</Icon></IconButton>
                    </div>
                    <FormHelperText className='col-span-2 self-end'>Valor padrão: 1</FormHelperText>
                </div>
            </div>
            <Divider sx={{ margin: "2% 0" }}/>
            <div className='w-1/1'>
                <Tabs variant='scrollable' scrollButtons allowScrollButtonsMobile value={tabValue} onChange={handleTab} sx={{margin: "2% 0"}}>
                    <Tab value={"1"} label="Principal"/>
                    <Tab value={"2"} label="Rolagem"/>
                    <Tab value={"3"} label="Inventario"/>
                    <Tab value={"4"} label="Habilidades"/>
                    <Tab value={"5"} label="Magias"/>
                </Tabs>
            </div>

            <div hidden={tabValue !== "1"} className='grid grid-cols-[auto_minmax(272px,_auto)_minmax(442px,_auto)_minmax(442px,_1fr)] justify-between gap-x-5 max-[1536px]:flex flex-wrap gap-y-5'>
                <div className='grid h-1/1 w-auto grid-rows-6 gap-15 pt-5 pb-10 pl-5 pr-5 justify-center items-center rounded-xl bg-gray-300 dark:bg-gray-950 max-[1536px]:flex max-[1536px]:w-1/1 max-[1536px]:h-auto max-[1536px]:order-1 max-[1216px]:flex-col max-[1216px]:w-auto max-[1216px]:max-w-auto max-[584px]:grid max-[584px]:grid-cols-[1fr_1fr_1fr] max-[584px]:grid-rows-[1fr_1fr] max-[584px]:w-1/1 max-[584px]:gap-y-10 max-[584px]:gap-x-4 max-[444px]:grid-cols-[1fr_1fr] max-[444px]:grid-rows-[1fr_1fr_1fr]'>
                    {arrSkills.map(skill =>(
                        <div key={skill} className='flex w-30 h-20 flex-col justify-center items-center bg-gray-100 outline-3 outline-black rounded-xl dark:bg-gray-800 dark:outline-white max-[584px]:w-25 max-[584px]:h-15 max-[584px]:place-self-center'>
                            <h1 className='text-center capitalize max-[584px]:text-sm'>{skill}</h1>
                            <div className='h-12 flex flex-col justify-between items-center relative max-[584px]:h-10'>
                                <input value={skillMvalue[skill]} name="" id={`${skill}M`} readOnly className='h-7 text-center text-2xl w-1/1 focus:border-0 outline-0 max-[584px]:text-lg'/>                
                                <input defaultValue={props.pers.habilidades[skill]} type="number" name={skill} onChange={(e)=>{setarHabilidade(e)}} className='w-16 h-8 -bottom-6 absolute outline-3 outline-purple-900 rounded-full text-center bg-gray-100  dark:bg-gray-800 focus:border-0'/>                
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex flex-col justify-between h-1/1 p-5 rounded-xl bg-gray-300 max-[1536px]:order-2 max-[1536px]:h-1/1 max-[584px]:w-1/1 dark:bg-gray-950'>
                    <div className='grid grid-cols-[auto_minmax(100px,_1fr)_auto_auto] items-center justify-between gap-x-3'>
                        <h1 className='text-xs'>Dado</h1>
                        <h1 className='text-xs grow-1'>Pericia</h1>
                        <h1 className='text-xs'>Proficiencia</h1>
                        <h1 className='text-xs'>outros</h1>
                    </div>
                    {skills === "" ? "" : Array.from(skills).map(skill => (
                        <div key={skill.nome} className='grid grid-cols-[auto_minmax(100px,_1fr)_auto_auto] items-center justify-between'>
                            <IconButton><Icon>casino</Icon></IconButton>
                            <h1 className='text-xs'>{skill.nome}</h1>
                            <Checkbox onChange={(e)=>{setNewProf(e, 1)}} name="pericias" id={`${skill["index"]}`} defaultChecked={props.pers.pericias[skill["index"]][1]}/>
                            <TextField sx={{width: "50px"}} name="pericias" id={`${skill["index"]}`} onChange={(e)=>{setNewProf(e, 2)}} defaultValue={props.pers.pericias[skill["index"]][0]} variant='standard' size='small' type='number'/>
                        </div>
                    ))}
                </div>
                <div className='bg-gray-300 p-7 rounded-xl h-1/1 gap-y-3 flex flex-col justify-between text-sm dark:bg-gray-950 max-[1536px]:order-3 max-[1536px]:min-w-442px max-[1216px]:min-w-1/1'>
                    <div className='grid grid-cols-6 grid-rows-[auto_1fr_1fr] gap-3 dark:bg-gray-950'>
                        <div className='flex col-span-6 gap-5 h-auto justify-between'>
                            <div className='overflow-hidden w-1/1 rounded-xl bg-gray-100 flex flex-col justify-between dark:bg-gray-800'>
                                <TextField fullWidth label="CA" variant="filled" name="status" id="ca" onChange={(e)=>{setNewValues(e)}} defaultValue={props.pers.status.ca} type='number'/>
                            </div>
                            <div className='overflow-hidden w-1/1 rounded-xl bg-gray-100 flex flex-col justify-between dark:bg-gray-800'>
                                <TextField fullWidth variant="filled" label="Iniciativa" name="status" id="iniciativa" onChange={(e)=>{setNewValues(e)}} defaultValue={props.pers.status.iniciativa} type='number'/>
                            </div>
                            <div className='overflow-hidden w-1/1 rounded-xl bg-gray-100 flex flex-col justify-between dark:bg-gray-800'>
                                <TextField fullWidth variant="filled" label="Deslocamento" name="status" id="deslocamento" onChange={(e)=>{setNewValues(e)}} defaultValue={props.pers.status.deslocamento} type='number'/>
                            </div>
                        </div>
                        <div className='col-span-6 p-5 gap-1 rounded-xl bg-gray-100 flex flex-col justify-between dark:bg-gray-800'>
                            <h1 className='w-1/1 text-center'>Pontos de vida</h1>
                            <div className="flex flex-col w-1/1 gap-1">
                                <div className='flex w-1/1 h-10 items-stretch items-center justify-center relative'>
                                    <LinearProgress color='error' variant="determinate" value={life} sx={{width: "100%", height: "100%", backgroundColor: props.pers.status.pvatual >= props.pers.status.pv ? "#aa2e25" : "#2f1a1a"}}/>
                                    <h1 className='absolute self-center text-white flex'><p className='w-10 text-end'>{props.pers.status.pvatual+" /"}</p><input type='number' defaultValue={props.pers.status.pv} name='status' id='pv' onChange={(e)=>{setNewValues(e)}} className='min-w-10 max-w-15 focus:outline-0 focus:b-0'/></h1>
                                </div>
                                <div className="w-1/1 flex">
                                    <IconButton onClick={()=>{handleLife(0)}}><Icon>remove</Icon></IconButton>
                                    <TextField variant="filled" margin="small" size="small" fullWidth label="Pontos" value={pontosVida} onChange={(e)=>{setPontosVida(e.target.value)}} type='number'/>
                                    <IconButton onClick={()=>{handleLife(1)}}><Icon>add</Icon></IconButton>
                                </div>
                                <FormHelperText>Valor padrão: 1</FormHelperText>
                            </div>
                        </div>
                        <div className='col-span-3 p-5 rounded-xl bg-gray-100 flex flex-col justify-between dark:bg-gray-800'>
                            <div className='flex items-center'>
                                <TextField fullWidth variant="filled" name="status" id="dadovida" onChange={(e)=>{setNewValues(e)}} label="total" type='number' defaultValue={props.pers.status.dadovida}/>
                            </div>
                            <div>
                                <TextField type='number' name="status" id="dadovidaatual" label="Dado de vida" onChange={(e)=>{setNewValues(e)}} defaultValue={props.pers.status.dadovidaatual} fullWidth variant='filled'/>
                            </div>
                        </div>
                        <div className='col-span-3 p-3 rounded-xl bg-gray-100 flex flex-col justify-between dark:bg-gray-800'>
                            <div className='grid grid-cols-[auto_auto_auto] items-center justify-between' >
                                <h1 className='col-span-3 text-center'>Sucessos</h1>
                                <Checkbox onChange={(e)=>{setNewChecked(e)}} disabled={props.pers.status.salvaguarda[0] > 1} name="0" id='suc-1' checked={props.pers.status.salvaguarda[0] > 0}/>
                                <Checkbox onChange={(e)=>{setNewChecked(e)}} disabled={props.pers.status.salvaguarda[0] < 1 || props.pers.status.salvaguarda[0] >= 3} name="0" id='suc-2' checked={props.pers.status.salvaguarda[0] > 1}/>
                                <Checkbox onChange={(e)=>{setNewChecked(e)}} disabled={props.pers.status.salvaguarda[0] < 2} name="0" id='suc-3' checked={props.pers.status.salvaguarda[0] > 2}/>
                            </div>
                            <div className='grid grid-cols-[auto_auto_auto] items-center justify-between'>
                                <h1 className='col-span-3 text-center'>Falhas</h1>
                                <Checkbox onChange={(e)=>{setNewChecked(e)}} disabled={props.pers.status.salvaguarda[1] > 1} name="1" id='fal-1' checked={props.pers.status.salvaguarda[1] > 0}/>
                                <Checkbox onChange={(e)=>{setNewChecked(e)}} disabled={props.pers.status.salvaguarda[1] < 1 || props.pers.status.salvaguarda[1] >= 3} name="1" id='fal-2' checked={props.pers.status.salvaguarda[1] > 1}/>
                                <Checkbox onChange={(e)=>{setNewChecked(e)}} disabled={props.pers.status.salvaguarda[1] < 2} name="1" id='fal-3' checked={props.pers.status.salvaguarda[1] > 2}/>
                            </div>
                            <FormHelperText>Salvaguarda contra a morte</FormHelperText>
                        </div>
                    </div>
                    <div className="flex flex-col justify-end gap-4 dark:bg-gray-950">
                        <div className="flex gap-2 justify-between">
                            <div className="overflow-hidden h-1/1 rounded-xl bg-gray-100 dark:bg-gray-800">
                                <TextField variant="filled" label="Inspiração" name="status" id="inspiracao" onChange={(e)=>{setNewValues(e)}} defaultValue={props.pers.status.inspiracao}/>
                            </div>
                            <div className="overflow-hidden h-1/1 rounded-xl bg-gray-100 dark:bg-gray-800">
                                <TextField variant="filled" label="Sabedoria p." name="caracteristicas" id="sabpassiva" onChange={(e)=>{setNewValues(e)}} defaultValue={props.pers.caracteristicas.sabpassiva}/>
                            </div>
                            <div className="overflow-hidden h-1/1 rounded-xl bg-gray-100 dark:bg-gray-800    ">
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
                <div className='grid grid-rows-[1fr_1fr_1fr_1fr_1fr] gap-y-5 p-5 w-1/1 rounded-xl bg-gray-300 dark:bg-gray-950 max-[1536px]:order-4'>
                    <div className='p-3 h-1/1 bg-gray-200 w-1/1 flex flex-col justify-between relative rounded-xl overflow-hidden dark:bg-gray-800'>
                        <TextField variant="standard" id='personalidade' name='mentalidade' label="Personalidade" multiline minRows={1} maxRows={4} defaultValue={props.pers.mentalidade.personalidade} onChange={(e)=>{setNewValues(e)}}/>
                    </div>
                    <div className='p-3 h-1/1 bg-gray-200 w-1/1 flex flex-col justify-between relative rounded-xl overflow-hidden dark:bg-gray-800'>
                        <TextField variant="standard" id='ideais' name='mentalidade' label="Ideais" multiline minRows={1} maxRows={4} defaultValue={props.pers.mentalidade.ideais} onChange={(e)=>{setNewValues(e)}}/>
                    </div>
                    <div className='p-3 h-1/1 bg-gray-200 w-1/1 flex flex-col justify-between relative rounded-xl overflow-hidden dark:bg-gray-800'>
                        <TextField variant="standard" id='vinculos' name='mentalidade' label="Vinculos" multiline minRows={1} maxRows={4} defaultValue={props.pers.mentalidade.vinculos} onChange={(e)=>{setNewValues(e)}}/>
                    </div>
                    <div className='p-3 h-1/1 bg-gray-200 w-1/1 flex flex-col justify-between relative rounded-xl overflow-hidden dark:bg-gray-800'>
                        <TextField variant="standard" id='aparencia' name='caracteristicas' label="Caracteristicas" multiline minRows={1} maxRows={4} defaultValue={props.pers.caracteristicas.aparencia} onChange={(e)=>{setNewValues(e)}}/>
                    </div>
                    <div className='p-3 h-1/1 bg-gray-200 w-1/1 flex flex-col justify-between relative rounded-xl overflow-hidden dark:bg-gray-800'>
                        <TextField variant="standard" id='historia' name='identidade' label="Historia" multiline minRows={1} maxRows={4} defaultValue={props.pers.identidade.historia} onChange={(e)=>{setNewValues(e)}}/>
                    </div>
                </div>
            </div>

            <div hidden={tabValue !== "2"} className='w-1/1'>
                <div className='grid grid-cols-[auto_auto_auto_auto_auto_1fr] w-1/1 justify-between gap-4 flex-wrap max-[1046px]:grid-cols-5 max-[618px]:grid-cols-6'>
                    <TextField className='max-[618px]:col-span-2' value={qDados} label="Quantidade" type='number' onChange={(e)=>{setQdados(e.target.value)}}/>
                    <Select className='max-[618px]:col-span-2' value={sDadoValue} onChange={handleSdado}>
                        <MenuItem value={4}>d4</MenuItem>
                        <MenuItem value={6}>d6</MenuItem>
                        <MenuItem value={8}>d8</MenuItem>
                        <MenuItem value={10}>d10</MenuItem>
                        <MenuItem value={12}>d12</MenuItem>
                        <MenuItem value={20}>d20</MenuItem>
                        <MenuItem value={100}>d100</MenuItem>
                    </Select>
                    <TextField className='max-[618px]:col-span-2' value={soma} label="Adicionar" type='number' onChange={(e)=>{setSoma(e.target.value)}}/>
                    <FormControlLabel className='max-[618px]:col-span-5' control={<Switch checked={somarDados} onChange={(e)=>{setSomarDados(e.target.checked)}}/>} label="Somar dados"/>
                    <IconButton className='max-[618px]:col-span-1 justify-self-end' size="large" color='primary' disabled={qDados === 0 || resultTime === true} sx={{width: "50px", height: "50px", marginLeft: "10px"}} onClick={()=>{rolarDados(parseInt(qDados), parseInt(sDadoValue), parseInt(soma), somarDados)}}><Icon fontSize="inherit">casino</Icon></IconButton>
                    <div className='max-w-[230px] justify-self-end h-1/1 max-[1046px]:col-span-5 max-[618px]:col-span-6'>
                        <Button sx={{height: "100%"}} fullWidth variant="contained" onClick={()=>{setMcriarRolagem(true)}}>Criar rolagem</Button>
                    </div>
                </div>
                <Divider sx={{margin: "2vh 0"}}/>
                <div className='flex flex-col overflow-y-scroll gap-y-4'>
                    <h1 className='text-3xl font-bold'>Suas rolagens</h1>
                    {props.pers.status.rolagens.lenght === 0 ? 
                        <h1>Você ainda não criou nenhuma rolagem</h1> :
                        Array.from(props.pers.status.rolagens).map(rolagem =>(
                            <div className='flex bg-gray-200 p-4 rounded-xl justify-between'>
                                <div>
                                    <h1 className='text-xl'>{rolagem.nome}</h1>
                                    <FormHelperText>{`${rolagem.quantidade}d${rolagem.tipo}+${rolagem.soma}`}</FormHelperText>
                                </div>
                                <div>
                                    <IconButton color='error' onClick={()=>{deletarRolagem(rolagem)}}><Icon fontSize="inherit">delete</Icon></IconButton>
                                    <IconButton onClick={()=>{editarRolagem(rolagem)}}><Icon fontSize="inherit">edit</Icon></IconButton>
                                    <IconButton color='primary' size="large" disabled={resultTime === true} onClick={()=>{rolarDados(parseInt(rolagem.quantidade), parseInt(rolagem.tipo), parseInt(rolagem.soma), rolagem.somadados)}}><Icon fontSize="inherit">casino</Icon></IconButton>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <Modal open={mCriarRolagem} onClose={()=>{handleCloseCriarRolagem()}}>
                    <div className='absolute top-1/2 left-1/2 -translate-1/2 w-auto h-auto bg-white p-8'>
                        <h1 className='text-2xl font-semibold mb-4'>{editRolagem===true?"Editar rolagem":"Criar rolagem"}</h1>
                        <div className='flex flex-col gap-y-5'>
                            <TextField value={nomeDadoCriar} label="Nome" type='text' onChange={(e)=>{setNomeDadoCriar(e.target.value)}}/>
                            <TextField value={qDadosCriar} label="Quantidade" type='number' onChange={(e)=>{setQdadosCriar(e.target.value)}}/>
                            <Select value={sDadoValueCriar} onChange={(e)=>{setSdadoValueCriar(e.target.value)}} label="Tipo">
                                <MenuItem value={4}>d4</MenuItem>
                                <MenuItem value={6}>d6</MenuItem>
                                <MenuItem value={8}>d8</MenuItem>
                                <MenuItem value={10}>d10</MenuItem>
                                <MenuItem value={12}>d12</MenuItem>
                                <MenuItem value={20}>d20</MenuItem>
                                <MenuItem value={100}>d100</MenuItem>
                            </Select>
                            <TextField value={somaCriar} label="Adicionar" type='number' onChange={(e)=>{setSomaCriar(e.target.value)}}/>
                            <FormControlLabel control={<Switch checked={somarDadosCriar} onChange={(e)=>{setSomarDadosCriar(e.target.checked)}}/>} label="Somar dados"/>
                        </div>
                        <div className='flex justify-between mt-4 gap-x-8'>
                            <Button variant='outlined' onClick={()=>{handleCloseCriarRolagem()}}>Cancelar</Button>
                            <Button variant='contained' onClick={()=>{criarRolagem()}} disabled={nomeDadoCriar === "" || qDadosCriar === 0}>Salvar</Button>
                        </div>
                    </div>
                </Modal>

                <Snackbar open={resultSnack} onClose={handleCloseResult}>
                    <Alert onClose={handleCloseResult} severity='info' >
                        <AlertTitle>Resultado</AlertTitle>
                        {`${arrResultDados} + ${actualSoma} = ${resultDados}`}
                    </Alert>
                </Snackbar>
            </div>

            <div hidden={tabValue !== "3"} className='w-1/1'>
                <Modal open={modalCriar} onClose={()=>{closeModalItem(0)}}>
                    <div className='absolute top-1/2 left-1/2 -translate-1/2 w-auto h-auto bg-white p-8'>
                        <h1>Criar item</h1>
                        <div>
                            <TextField value={nomeItemCriar} label="Nome" onChange={(e)=>{setNomeItemCriar(e.target.value)}}/>
                        </div>
                    </div>
                </Modal>
                <Modal open={modalAdicionar} onClose={()=>{closeModalItem(1)}}>
                    <div className='absolute top-1/2 left-1/2 -translate-1/2 w-auto h-auto bg-white p-8'>

                    </div>
                </Modal>
                <div className='flex gap-x-5'>
                    <TextField label="Pesquisar itens" fullWidth/>
                    <Button onClick={()=>{openModalItem(0)}} variant='outlined'>Criar</Button>
                    <Button onClick={()=>{openModalItem(1)}} variant='contained'>Adicionar</Button>
                </div>
                <div className=''>

                </div>
                <div className=''>
                    
                </div>
            </div>

            <div className='fixed top-5 right-5 bg-gray-200 rounded-full dark:bg-white'>
                <IconButton color='primary' size='large' onClick={()=>{setHistorico(true)}}>
                    <Icon fontSize='large'>history</Icon>
                </IconButton>
                <Drawer open={historico} onClose={()=>{setHistorico(false)}}>
                    <div className='w-100 flex flex-col bg-white h-[100%] p-2 max-[450px]:w-full'>
                        <h1 className='text-center p-2 text-2xl font-bold dark:text-white'>Histórico de dados</h1>
                        <div className='flex flex-col overflow-y-scroll gap-y-2 [&>*:first-child]:bg-purple-200'>
                            {Array.from(props.pers.status.dados).length === 0 ? (
                            <div>
                                <h1>Você ainda não rolou nenhum dado</h1>
                            </div>) : Array.from(props.pers.status.dados).reverse().map(result =>(
                                <div key={props.pers.status.dados.indexOf(result)} className="p-3 bg-gray-200 rounded-xl flex justify-between items-center">
                                    <div>
                                        <h1 className='text-xl font-semibold'>{result.djogados}</h1>
                                        <p>{result.dresult.replaceAll(",", ", ")}</p>
                                    </div>
                                    <div className='h-[100%] flex items-center justify-between'>
                                        <Divider orientation='vertical' sx={{height: "100%", margin: "0 8px"}}/>
                                        <h1 className='text-2xl'>{result.result}</h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Drawer>
            </div>
        </div> : ""}
    </>)
}