const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://edu9988:${password}@theheckiscluster.koc4dxg.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if( process.argv.length === 3 ){
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
    .catch(error => {
        console.log('find() error:', error.message)
    })
}
else if( process.argv.length === 5 ){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook!`)
        mongoose.connection.close()
    })
    .catch(error => {
        console.log('save() error:', error.message)
    })
}
else{
    console.log(`Nothing to do with ${process.argv.length} args`)
    mongoose.connection.close()
}
