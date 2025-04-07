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
    const date = new Date(timestamp.seconds*1000)

    try {
        const values = {
            data: date.toLocaleDateString("pt-BR"),
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
                sabpassiva: "",
                intupassiva: ""
            },
            mentalidade: {
                alinhamento:req.body.alinhamento,
                personalidade:req.body.personalidade,
                ideais:req.body.ideais,
                vinculos:req.body.vinculos,
            },
            pericias: {
                acrobatics: ["",false, "destreza"],
                animalhandling: ["",false, "sabedoria"],
                arcana: ["",false, "inteligencia"],
                athletics: ["",false, "forca"],
                deception: ["",false, "carisma"],
                history: ["",false, "inteligenci"],
                insight: ["",false, "sabedoria"],
                intimidation: ["",false, "carisma"],
                investigation: ["",false, "inteligencia"],
                medicine: ["",false, "sabedoria"],
                nature: ["",false, "inteligencia"],
                perception: ["",false, "sabedoria"],
                performance: ["",false, "carisma"],
                persuasion: ["",false, "carisma"],
                religion: ["",false, "inteligencia"],
                sleightofhand: ["",false, "destreza"],
                stealth: ["",false, "destreza"],
                survival: ["",false, "sabedoria"],
            },
            status: {
                ca: 10,
                iniciativa: 0,
                deslocamento: 9,
                pv: 0,
                pvatual: 0,
                dadovida: 0,
                dadovidaatual: 0,
                salvaguarda: [0, 0],
                experiencia: 0
            },
            proficiencias:{
                armas: "",
                armaduras: "",
                idiomas: "",
                ferramentas: "",
            }
        }

        await db.collection("personagens").add(values)
        return res.status(200).json("personagem criado com sucesso")
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
        return res.status(200).json("personagem atualizado com sucesso")
    } catch (error) {
        return res.status(500).json(error)
    }
}