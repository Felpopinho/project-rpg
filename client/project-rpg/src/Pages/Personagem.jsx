import { Button, Icon, IconButton, Divider } from '@mui/material'
import { useEffect, useState } from 'react'

export function Personagem(props){

    return(<div className='w-1/1 grid grid-cols-2 bg-gray-100 rounded-2xl p-7 gap-4 dark:bg-gray-800'>

        <div className='w-1/1 col-span-2 font-bold'><h1 className='text-2xl text-black text-center dark:text-white'>{props.p.nome}</h1></div>
        <Divider sx={{ gridColumn: "1/3"}}/>
        <div className='max-h-70 overflow-hidden rounded-2xl'>
            <img className='w-1/1' src='https://orbedosdragoes.com/wp-content/uploads/2017/06/DD5-Guerreiro_1.jpg'/>
        </div>
        <div className=''>
            <p className='text-black dark:text-white'><span>Classe:</span> {props.p.classe}</p>
            <p className='text-black dark:text-white'><span>Raça:</span> {props.p.raca}</p>
            <p className='text-black dark:text-white'><span>Antecedente:</span> {props.p.antecendente}</p>
            <p className='text-black dark:text-white'>Criado em {props.p.data}</p>
        </div>
        <Divider sx={{ gridColumn: "1/3"}}/>
        <div className='flex justify-between col-span-2'>
            <Button variant='outlined'>Ficha</Button>
            <div>
                <IconButton><Icon>settings</Icon></IconButton>
                <IconButton><Icon>delete</Icon></IconButton>
            </div>
        </div>
        
    </div>)
}