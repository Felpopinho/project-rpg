import { useEffect, useState } from 'react'

export function Personagem(props){

    return(<div className='w-1/4'>

        <div className='w-1/1'>{props.p.nome}</div>
        <div className='w-1/2'>
            <img className='w-1/1' src='https://orbedosdragoes.com/wp-content/uploads/2017/06/DD5-Guerreiro_1.jpg'/>
        </div>
        <div>

        </div>
        
    </div>)
}