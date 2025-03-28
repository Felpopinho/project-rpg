import { db } from "../db.js";

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
            data: FieldValue.serverTimestamp(),
            forca: req.body.forca,
            destreza: req.body.destreza,
            constituicao: req.body.constituicao,
            inteligencia: req.body.inteligencia,
            sabedoria: req.body.sabedoria,
            carisma: req.body.carisma,
            classe: req.body.classe,
            raca: req.body.raca,
            antecedente: req.body.antecedente,
            nome: req.body.nome,
            jogador: req.body.jogador,
            personalidade: req.body.personalidade,
            ideais: req.body.ideais,
            alinhamento: req.body.alinhamento,
            fraquezas: req.body.fraquezas,
            historia: req.body.historia,
            objetivo: req.body.objetivo,
        }

        await db.collection("personagens").add(values)
        return res.status(200).json("personagem criado com sucesso")
    } catch (error) {
        return res.status(500).json(error)
    }
}