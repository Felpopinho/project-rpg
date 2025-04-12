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

    const timestamp = admin.firestore.FieldValue.serverTimestamp()
    const data = timestamp.toDate()
    const dataString = data.toLocaleString()

    try {
        const values = {
            data: dataString,
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
                sabpassiva: req.body.sabpassiva,
                intupassiva: req.body.intupassiva
            },
            mentalidade: {
                alinhamento:req.body.alinhamento,
                personalidade:req.body.personalidade,
                ideais:req.body.ideais,
                vinculos:req.body.vinculos,
            },
            pericias: {
                acrobatics: [req.body.acrobatics[0], req.body.acrobatics[1], "destreza"],
                animalhandling: [req.body.animalhandling[0], req.body.animalhandling[1], "sabedoria"],
                arcana: [req.body.arcana[0], req.body.arcana[1], "inteligencia"],
                athletics: [req.body.athletics[0], req.body.athletics[1], "forca"],
                deception: [req.body.deception[0], req.body.deception[1], "carisma"],
                history: [req.body.history[0], req.body.history[1], "inteligenci"],
                insight: [req.body.insight[0], req.body.insight[1], "sabedoria"],
                intimidation: [req.body.intimidation[0], req.body.intimidation[1], "carisma"],
                investigation: [req.body.investigation[0], req.body.investigation[1], "inteligencia"],
                medicine: [req.body.medicine[0], req.body.medicine[1], "sabedoria"],
                nature: [req.body.nature[0], req.body.nature[1], "inteligencia"],
                perception: [req.body.perception[0], req.body.perception[1], "sabedoria"],
                performance: [req.body.performance[0], req.body.performance[1], "carisma"],
                persuasion: [req.body.persuasion[0], req.body.persuasion[1], "carisma"],
                religion: [req.body.religion[0], req.body.religion[1], "inteligencia"],
                sleightofhand: [req.body.sleightofhand[0], req.body.sleightofhand[1], "destreza"],
                stealth: [req.body.stealth[0], req.body.stealth[1], "destreza"],
                survival: [req.body.survival[0], req.body.survival[1], "sabedoria"],
            },
            status: {
                ca: req.body.ca,
                iniciativa: req.body.iniciativa,
                deslocamento: req.body.deslocamento,
                pv: req.body.pv,
                pvatual: req.body.pvatual,
                dadovida: req.body.dadovida,
                dadovidaatual: req.body.dadovidaatual,
                salvaguarda: req.body.salvaguarda,
                experiencia: req.body.experiencia
            },
            proficiencias:{
                armas: req.body.armas,
                armaduras: req.body.armaduras,
                idiomas: req.body.idiomas,
                ferramentas: req.body.ferramentas,
            }
        }

        await db.collection("personagens").add(values)
        return res.status(200).json("Personagem criado com sucesso")
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const updatePersonagem = async (req, res) =>{
    try {
        const values = {
            id: req.body.id,
            personagem: req.body.personagem
        }
    
        await db.collection("personagens").doc(values.id).update(values.personagem)
        return res.status(200).json("Personagem atualizado com sucesso")
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const deletePersonagem = async (req,res) =>{
    try {
        const values = {
            id: req.body.id
        }

        await db.collection("personagens").doc(values.id).delete()
        return res.status(200).json("Personagem excluido com sucesso")
    } catch (error) {
        console.log(error)
    }
}