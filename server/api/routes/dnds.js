import express from 'express'
import { addCollection, getAntecedentes, getClasses, getRacas } from '../controllers/dnd.js'

export const dndRouter = express.Router()

dndRouter.post('/addcollection', addCollection)

dndRouter.get("/dnd/classes", getClasses)
dndRouter.get("/dnd/classes", getRacas)
dndRouter.get("/dnd/classes", getAntecedentes)