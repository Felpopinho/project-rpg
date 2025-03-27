import { db } from "../db.js";

export const getPersonagens = (req, res) =>{

    try {
        const uid = req.body.userId

        db.collection("personagens").where("userId", "==", uid).get().then(snapshot =>{
        if (snapshot.empyt) return res.status(404).json("Nenhum personagem encontrado");
        const data = snapshot.docs.map(doc=>({
            ...doc.data(),
            uid: doc.id
        }));
        return res.status(200).json(data)
    })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const addPersonagem = (req, res) =>{
    try {
        
    } catch (error) {
        
    }
}