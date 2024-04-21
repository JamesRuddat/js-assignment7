const express = require('express')

const app = express()
const port = process.env.PORT || 3000

const router = require('express').Router()
const path = require('path')
const root = path.join(__dirname, '..', 'public')

app.use(express.json())
app.use(express.static('public'))
app.use('/api/todos', require('./api-routes'))

router.get('/', (request, response) => {
    response.sendFile('index.html', { root })
})

router.get('*', (request, response) => {
    response.status(404).sendFile('404.html', { root })
})

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))