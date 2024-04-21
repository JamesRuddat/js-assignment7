const { MongoClient, ObjectId } = require('mongodb')
const { url } = process.env.MONGODB_URL || require('./secrets/mongodb.json')
const client = new MongoClient(url)

const getCollection = async (dbName, collectionName) => {
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection(collectionName)
        return collection
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error
    }
};

module.exports = { getCollection, ObjectId }