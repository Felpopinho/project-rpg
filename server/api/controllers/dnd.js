import { db } from "../db.js"

export const addCollection = async (req, res) =>{
    try {
        const values = {
            chave: req.body.key,
            data: req.body.data
        }

        for (let i = 0; i < values.data.length; i++) {
            const element = values.data[i];
            console.log(element)
            //const docId = element.nome.toLowerCase().replaceAll(" ","-")
            await db.collection(`${values.chave}`).doc(Object.entries(element)[0][0]).set(element)
            console.log("documento adicionado")
        }
        return res.status(200).json("funcionou")
        
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const getClasses = async (req, res) =>{
    try {
        await db.collection("classes").get().then(snpashot =>{
            const data = snpashot.docs.map(doc =>({
                ...doc.data(),
                uid: doc.id
            }))
            return res.status(200).json(data)
        })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}
export const getRacas = async (req, res) =>{
    try {
        await db.collection("racas").get().then(snpashot =>{
            const data = snpashot.docs.map(doc =>({
                ...doc.data(),
                uid: doc.id
            }))
            return res.status(200).json(data)
        })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}
export const getAntecedentes = async (req, res) =>{
    try {
        await db.collection("antecedentes").get().then(snpashot =>{
            const data = snpashot.docs.map(doc =>({
                ...doc.data(),
                uid: doc.id
            }))
            return res.status(200).json(data)
        })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}