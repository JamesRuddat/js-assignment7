const router = require('express').Router()

const { getCollection } = require('./list-db')

const dbName = 'List-API'
const collectionName = 'Todos'

router.get('/', async (_, response) => {
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
    const collection = await getCollection(dbName, collectionName)
    const todo = await collection.findOne({ _id: new ObjectId(id) })
    const complete = !todo.complete
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { complete } })
})

module.exports = router