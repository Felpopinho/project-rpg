import express from 'express'
import 'dotenv/config'
import { userRouter } from './api/routes/usuarios.js';
import cors from 'cors';

const app = express();
const port = 3000 || process.env.PORT

app.use(express.json())
app.use("/", userRouter)
app.use(cors());

app.listen(port, ()=>{console.log(`http://localhost:${port}`)});