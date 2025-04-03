import express from 'express'
import 'dotenv/config'
import cors from 'cors';
import { userRouter } from './api/routes/usuarios.js';
import { persRouter } from './api/routes/personagens.js';


const app = express();
const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json());
app.use("/", userRouter);
app.use("/", persRouter);


app.listen(port, ()=>{console.log(`http://localhost:${port}`)});