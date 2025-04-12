import express from 'express'
import { getPersonagens, addPersonagem, updatePersonagem, deletePersonagem } from '../controllers/personagem.js'

export const persRouter = express.Router()

persRouter.post('/personagens', getPersonagens)
persRouter.post('/personagens/add', addPersonagem)
persRouter.put('/personagens', updatePersonagem)
persRouter.post('/personagens/delete', deletePersonagem)