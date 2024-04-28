const router = require('express').Router()

const { getCollection } = require('./list-db')

const dbName = 'List-API'
const collectionName = 'Todos'

router.get('/', async (request, response) => {
    const collection = await getCollection(dbName, collectionName)
    const todos = await collection.find({}).toArray()
    response.json(todos)
})

router.post('/', async (request, response) => {
    const { item, complete } = request.body;
    const collection = await getCollection(dbName, collectionName)
    const result = await collection.insertOne({ item, complete })
})

router.put('/:id', async (request, response) => {
    const { id } = request.params
    const { complete } = request.body
    
    try {
        const collection = await getCollection(dbName, collectionName)
        const result = await collection.updateOne({ _id: id }, { $set: { complete: !complete} })
    } 
    catch (error) {
        console.error("Error updating todo:", error)
        response.status(500).json({ message: "Error updating todo" })
    }
})

module.exports = router