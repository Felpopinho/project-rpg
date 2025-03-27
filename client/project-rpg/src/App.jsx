import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { Login } from './Login'
import axios from "axios"

export const baseURL = 'https://projectrpg-api.vercel.app'

function App() {

  const [users, setUsers] = useState("")

  const getUser = async () =>{
    try {
      await axios.get(baseURL+'/usuarios').then(res=>{
        setUsers(res.data)
        console.log(res.data)
      })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(()=>{
    getUser()
  }, [])

  return (
    <Box className="app">
      <Login users={users}/>
    </Box>
  )
}

export default App
