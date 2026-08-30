import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm  from './components/PersonForm'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [addContactSucessNotification, setAddContactSuccessNotification] = useState(null)
  const [notificationClassName, setNotificationClassName] = useState('successfulNotification')

  const hook = () => {
      phonebookService
        .getAll()
        .then(initialContactList => {
          setPersons(initialContactList)
        })
  }

  useEffect(hook, [])

  const addContact = (event) => {
    event.preventDefault()
    const newContact = {
      name: newName,
      number: newNumber
    }
    if(persons.some(person => person.name === newName)){
      const confirmUpdate = window
        .confirm(`${newName} is already added to phonebook, replace the old number with a new one`)
      if(!confirmUpdate){
        setNewName('')
        setNewNumber('')
        return
      }
      const person = persons.find(p => p.name === newName)
      const updatedPerson = {...person, number: newNumber}
      phonebookService
        .update(person.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.name === newName ? returnedPerson : person))
          setNewName('')
          setNewNumber('')
          alert('contact replaced successfully')
        })
      return  
    }
    phonebookService
      .create(newContact)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotificationClassName('successfulNotification')
        setAddContactSuccessNotification('Added ' + returnedPerson.name)
        setTimeout(() => {
          setAddContactSuccessNotification(null)
        }, 5000)
      })
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

  const deleteContactOf = (id, name) => {

    const confirmDelete = window.confirm(`Delete ${name} ?`)
    if(!confirmDelete){
      return
    }

    phonebookService
      .deleteById(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        setNotificationClassName('errorNotification')
        setAddContactSuccessNotification(`Information of ${name} has already been removed from the server`)
        setTimeout(() => {
          setAddContactSuccessNotification(null)
        }, 5000)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addContactSucessNotification} className={notificationClassName}/>
      <Filter nameFilter={nameFilter} onChangeFilter={onChangeFilter}/>
      <h2>add a new</h2>
      <PersonForm addContact={addContact}
       newName={newName} 
       onChangeName={onChangeName}
       newNumber={newNumber}
       onChangeNumber={onChangeNumber}
       />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deleteContact={deleteContactOf}/>
    </div>
  )
}

export default App