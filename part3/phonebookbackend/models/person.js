const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
console.log('Connection to : ', url)

mongoose.connect(url, {family: 4})
    .then(result => {
        console.log('connected to MongoDB')
    }).catch(error => {
        console.log('Error connecting to MongoDB', error)
    })


const personSchema = new mongoose.Schema({
    name : String,
    number : String
})


personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.__v
        delete returnedObject._id
    }
})

module.exports = mongoose.model('Person', personSchema)