import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { Login } from './Login'
import axios from "axios"

function App() {

  const baseURL = 'https://projectrpg-api.vercel.app'
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
    <Login users={users}/>
  )
}

export default App
