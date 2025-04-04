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
            habilidades: {
                forca: req.body.forca,
                destreza: req.body.destreza,
                constituicao: req.body.constituicao,
                inteligencia: req.body.inteligencia,
                sabedoria: req.body.sabedoria,
                carisma: req.body.carisma
            },
            cra: {
                classe: req.body.classe,
                raca: req.body.raca,
                antecedente: req.body.antecedente,
            },
            identidade: {
                nome:req.body.nome,
                jogador:req.body.jogador,
                historia:req.body.historia,
                objetivo:req.body.objetivo,
            },
            caracteristicas: {
                idade:req.body.idade,
                peso:req.body.peso,
                aparencia:req.body.aparencia,
            },
            mentalidade: {
                alinhamento:req.body.alinhamento,
                personalidade:req.body.personalidade,
                ideais:req.body.ideais,
                vinculos:req.body.vinculos,
            }
        }

        await db.collection("personagens").add(values)
        return res.status(200).json("personagem criado com sucesso")
    } catch (error) {
        return res.status(500).json(error)
    }
}