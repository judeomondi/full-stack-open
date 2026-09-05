const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    return response.json(persons)
})

app.get('/info', (request, response) => {
    return response.send(`Phonebook has info for ${persons.length} people\n${new Date().toString()}`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)
    if(person){
        return response.json(person)
    } else {
        return response.status(404).end(`person with id ${id} is not found`)
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(p => p.id !== id)
    return response.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * 100) + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    const name = body.name
    const number = body.number

    if(!name){
        return response.status(400).json({ error: 'name is missing' })
    }

    if(!number){
        return response.status(400).json({ error: 'number is missing' })
    }

    if(persons.find(person => person.name.toLowerCase() === name.toLowerCase())){
        return response.status(400).json({ error: 'name must be unique' })
    }

    const person = {
        id: generateId(),
        name: name,
        number: number
    }

    persons = persons.concat(person)
    return response.json(person)
})

const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`application is listening to port ${PORT}`)
})
