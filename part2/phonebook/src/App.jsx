import { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm  from './components/PersonForm'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    const newContact = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if(persons.some(person => person.name === newName)){
      return alert(`${newName} is already added to phonebook`)
    }
    setPersons(persons.concat(newContact))
    setNewName('')
    setNewNumber('')
  }

  const onChangeName = (event) => {
    setNewName(event.target.value)
  }

  const onChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const onChangeFilter = (event) => {
    setNameFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} onChangeFilter={onChangeFilter}/>
      <h2>add a new</h2>
      <PersonForm addContact={addContact}
       newName={newName} 
       onChangeName={onChangeName}
       newNumber={newNumber}
       onChangeNumber={onChangeNumber}
       />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons}/>
    </div>
  )
}

export default App