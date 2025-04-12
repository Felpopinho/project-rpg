import { Button, Icon, IconButton, Divider, Menu, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, HashRouter, Routes, Route } from 'react-router-dom'
import { Ficha } from './Ficha'
import axios from 'axios'
import { baseURL } from '../App'

export function Personagem(props){

    const navigate = useNavigate()

    const navFicha = (pers) =>{
        localStorage.setItem("personagem", JSON.stringify(pers))
        props.setActualPers(pers)
        navigate("/ficha")
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl)
    const openMenu = (e) => {
        setAnchorEl(e.currentTarget);
      };

    const closeMenu = (id, e) =>{
        setAnchorEl(null);
        if(e === "delete"){
            deletarPersonagem(id)
        } else if(e === "delete"){
            alterarImagem()
        } else{
            return
        }
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


    return(<>{Array.from(props.personagens[0]).map(pers => (<div key={pers.uid} className='w-1/1 grid grid-cols-2 bg-gray-100 rounded-2xl p-7 gap-4 dark:bg-gray-800'>

        <div className='w-1/1 col-span-2 font-bold'><h1 className='text-2xl text-black text-center dark:text-white'>{pers.identidade.nome}</h1></div>
        <Divider sx={{ gridColumn: "1/3"}}/>
        <div className='max-h-70 overflow-hidden rounded-2xl'>
            <img className='w-1/1' src='https://orbedosdragoes.com/wp-content/uploads/2017/06/DD5-Guerreiro_1.jpg'/>
        </div>
        <div className=''>
            <p className='text-black dark:text-white'><span>Classe:</span> {pers.cra.classe}</p>
            <p className='text-black dark:text-white'><span>Raça:</span> {pers.cra.raca}</p>
            <p className='text-black dark:text-white'><span>Antecedente:</span> {pers.cra.antecedente}</p>
            <p className='text-black dark:text-white'>Criado em {pers.data.Data}</p>
        </div>
        <Divider sx={{ gridColumn: "1/3"}}/>
        <div className='flex justify-between col-span-2'>
            <Button variant='outlined' onClick={()=>{navFicha(pers)}}>Ficha</Button>
            <div>
                <IconButton onClick={openMenu}><Icon>settings</Icon></IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={closeMenu} anchorOrigin={{vertical: 'top', horizontal: 'left',}} transformOrigin={{vertical: 'top',horizontal: 'left', }}>
                    <MenuItem onClick={()=>{closeMenu(pers.uid, "delete")}}><Icon sx={{marginRight: "5px"}}>delete</Icon>Apagar</MenuItem>
                    <MenuItem onClick={()=>{closeMenu(pers.uid, "image")}}><Icon sx={{marginRight: "5px"}}>image</Icon>Imagem</MenuItem>
                </Menu>
            </div>
        </div>
        
    </div>))}</>)
}