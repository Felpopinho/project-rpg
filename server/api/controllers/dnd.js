export const getClasses = async (req, res) =>{
    try {
        const path = "../dnd-api/classes.json"
        await fetch(path).then(data=>{
            return res.status(200).json(data)
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const getRacas = async (req, res) =>{
    try {
        const path = "../dnd-api/racas.json"
        await fetch(path).then(data=>{
            return res.status(200).json(data)
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const getAntecedentes = async (req, res) =>{
    try {
        const path = "../dnd-api/antecedentes.json"
        await fetch(path).then(data=>{
            return res.status(200).json(data)
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}