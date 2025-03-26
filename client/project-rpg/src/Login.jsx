import { useState } from 'react'
import { Box } from '@mui/material'
export function Login(props) {
  const [count, setCount] = useState(0)

  return (
    <Box>
        {Array.from(props.users).map(user =>{
            <p>{user.nome}</p>
        })}
    </Box>
  )
}