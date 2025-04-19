import express from 'express'
import { getClasses, getRacas, getAntecedentes } from '../controllers/dnd.js'

export const dndRouter = express.Router()

dndRouter.get('/dnd/classes', getClasses)
dndRouter.get('/dnd/racas', getRacas)
dndRouter.get('/dnd/antecedentes', getAntecedentes)