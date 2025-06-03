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
                sabpassiva: req.body.sabpassiva,
                intupassiva: req.body.intupassiva
            },
            mentalidade: {
                alinhamento:req.body.alinhamento,
                personalidade:req.body.personalidade,
                ideais:req.body.ideais,
                vinculos:req.body.vinculos,
            },
            pericias: req.body.pericias,
            status: {
                ca: req.body.ca,
                iniciativa: req.body.iniciativa,
                deslocamento: req.body.deslocamento,
                pv: req.body.pv,
                pvatual: req.body.pvatual,
                dadovida: req.body.dadovida,
                dadovidaatual: req.body.dadovidaatual,
                salvaguarda: req.body.salvaguarda,
                experiencia: req.body.experiencia,
                dados: req.body.dados,
                rolagens: req.body.rolagens
            },
            proficiencias:{
                armas: req.body.armas,
                armaduras: req.body.armaduras,
                idiomas: req.body.idiomas,
                ferramentas: req.body.ferramentas,
            },
            inventario: req.body.inventario
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