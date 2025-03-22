import { db } from "../db.js";

export const getUsers = (req, res) =>{
        db.collection('usuarios').get().then(snapshot =>{
        const data = snapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
        }));
        return res.status(200).json(data)
    })
}

export const addUser = async (req, res) => {
    try {
        const values = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            desc: req.body.desc
        }
        const docRef = await db.collection('usuarios').add(values)
        return res.status(200).json(`Documento adicionado com id: ${docRef.id}`)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}