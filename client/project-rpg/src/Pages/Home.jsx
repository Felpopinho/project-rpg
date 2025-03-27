import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export function Home(props){
    const navigate = useNavigate()
    return(<>

        {props.user === "" ? navigate("/") : <Box>
            
            <p>Home Page</p>
        
        </Box>}
        
    </>)
}