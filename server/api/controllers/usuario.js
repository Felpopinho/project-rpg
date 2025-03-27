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
        }
        const docRef = await db.collection('usuarios').add(values)
        return res.status(200).json(`Usuario criado com sucesso`)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

export const logUser = async (req, res) =>{

    try {
        const values ={
            nome: req.body.nome,
            senha: req.body.senha
        }

        db.collection('usuarios')
        .where('nome','==',values.nome).where('senha','==',values.senha)
        .get().then(snapshot =>{
            if (snapshot.empyt) return res.status(404).json("Usuario não encontrado");

            const data = snapshot.docs.map(doc => ({
                ...doc.data(),
                uid: doc.id
            }))
            return res.status(200).json(data)
        })

    } catch (error) {
        return res.status(500).json(error)
    }
}