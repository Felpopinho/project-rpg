import express from 'express'
import { addCollection, getAntecedentes, getClasses, getProficiencias, getRacas } from '../controllers/dnd.js'

export const dndRouter = express.Router()

dndRouter.post('/addcollection', addCollection)

dndRouter.get("/dnd/classes", getClasses)
dndRouter.get("/dnd/racas", getRacas)
dndRouter.get("/dnd/antecedentes", getAntecedentes)
dndRouter.get("/dnd/proficiencias", getProficiencias)