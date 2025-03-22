import express from 'express'
import { addUser, getUsers } from '../controllers/usuario.js'

export const userRouter = express.Router()

userRouter.get('/usuarios', getUsers)
userRouter.post('/usuarios/add', addUser)