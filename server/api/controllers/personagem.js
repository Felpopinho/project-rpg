import { db } from "../db.js";
import admin from 'firebase-admin'

export const getPersonagens = (req, res) =>{

    try {
        const values = {
            idUser: req.body.userId
        }

        db.collection("personagens").where("userId", "==", values.idUser).get().then(snapshot =>{
        if (snapshot.empyt) return res.status(404).json("Nenhum personagem encontrado");
        
        const data = []
        snapshot.forEach(doc=>{
            data.push({uid: doc.id, ...doc.data()})
        });
        return res.status(200).json(data)
    })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const addPersonagem = async (req, res) =>{
    try {
        const values = {
            data: admin.firestore.FieldValue.serverTimestamp(),
            userId: req.body.userId,
            habilidades: [
                req.body.forca,
                req.body.destreza,
                req.body.constituicao,
                req.body.inteligencia,
                req.body.sabedoria,
                req.body.carisma
            ],
            cra: [
                req.body.classe,
                req.body.raca,
                req.body.antecedente,
            ],
            identidade: [
                req.body.nome,
                req.body.jogador,
                req.body.historia,
                req.body.objetivo,
            ],
            caracteristicas: [
                req.body.idade,
                req.body.peso,
                req.body.aparencia,
            ],
            mentalidade: [
                req.body.alinhamento,
                req.body.personalidade,
                req.body.ideais,
                req.body.vinculos,
            ]
        }

        await db.collection("personagens").add(values)
        return res.status(200).json("personagem criado com sucesso")
    } catch (error) {
        return res.status(500).json(error)
    }
}