import express from 'express'
import { addUser, getUsers, logUser } from '../controllers/usuario.js'

export const userRouter = express.Router()

userRouter.get('/usuarios', getUsers)
userRouter.post('/usuarios', logUser)
userRouter.post('/usuarios/add', addUser)