import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'

import personService from './services/persons'

const Persons = (props) => {



  return(
    <div>
      <h2>Numbers</h2>
      {props.peopleToShow().map(person => <div key={person.name}> {person.name} {person.number} <button onClick={() => props.deleteContact(person.id, person.name)}> delete this nephew</button> </div>)}
    </div>
    
  )

}

const Filter = (props) => {

  return(
    <div>
      filter shown with: 
       <input  value={props.filter} onChange={props.handleFilterChange}/>
    </div>
    
  )
}


const Notification = (props) => {
  if(props.message === null){
    return null;
  } 
  return (
    <div className="notifikaatio">
      {props.message}
    </div>
  )
}
const Error = (props) => {
  if(props.message === null){
    return null;
  } 
  return (
    <div className="errori">
      {props.message}
    </div>
  )
}


const PersonForm = (props) => {
  return(
    <div>
     <h2> Add a new </h2>
      <form onSubmit={props.addNewPerson}>
        <div>
          name: <input 
          value={props.newName}
          onChange={props.handleNameChange}
           />
        </div>
        <div>number: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
    
  )

}

/*
name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' 

*/

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setNewFilter] = useState('');
  const [ notMessage, setNotMessage] = useState(null);
  const [ errorMessage, setErrMessage] = useState(null);

/*
  useEffect(() => {
    console.log("efekti");
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log("promise fulfilled!")
        console.log("response data:", response.data);
        setPersons(response.data);
      })

  }, [])
*/

  useEffect(() => {
    console.log("efekti");
    personService.returnAll()
      .then(response => {
        console.log("promise fulfilled!")
        console.log("response data:", response.data);
        setPersons(response.data);
      })

  }, [])


  const deleteContact = (id, name) => {

    const result = window.confirm(`rly wanna delete dis badboi right here? (${name})`);

    if(result){
      personService.deletePerson(id)
      .then(response1 => {personService.returnAll()
      .then(response2 => {
        console.log("responsedata of returnAll:", response2.data)
        setPersons(response2.data);
        setNotMessage(`${name} deleted from phonebook!`);
        setTimeout(() => {setNotMessage(null)}, 2000);
      })
    }).catch(err => {
      console.log("deletointi epäoinnistui: ", err);

      if(err.response.status === 404){
        setErrMessage("Resource not found (404). Could not delete contact because it has already been deleted!")
        setTimeout(() => {setErrMessage(null)}, 2000);
      }
    }).then(result => {
      personService.returnAll()
      .then(response => {
        setPersons(response.data);
        console.log("local contacts synced with server");
      }
      )
    })
    }
 

  }
    

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const getContactsFromServer = () => {
    personService.returnAll()
      .then(response => {
        console.log("kaikki kontaktit: ", response.data)
        setPersons(response.data);
        return response.data;
      }  
      )
  }

  const addNewPerson = (event) => {
    event.preventDefault();

    const personName = {name: newName, number: newNumber};
    const mappedNames = persons.map(person => person.name);
    console.log("mapitetutnimet: ", mappedNames);

    if(mappedNames.includes(personName.name)){
      console.log("nimi on jo listoilla!");
      //window.alert(`${personName.name} is already added to phonenook`)

      const result = window.confirm(`already added to the phonebook, replace old number with new one?`)

      if(result){
        const indeksi = mappedNames.indexOf(personName.name) + 1;
        personService.replacePerson(indeksi, personName)
        .then(result1 => personService.returnAll()
        .then(result2 => {
          setPersons(result2.data)
          setNotMessage(`${personName.name}'s phonenumber updated!`);
          setTimeout(() => {setNotMessage(null)}, 2000);
        }))
        .catch(error => {
          console.log("numeron muutos epäonnistui!", error.response.status);
          if(error.response.status === 404){
            setErrMessage("Resource not found on the server (404). Can't change number because contact has already been deleted!")
            setTimeout(() => {setErrMessage(null)}, 5000);
          }

        });
      }

    } else {
      
      console.log("axios palvelin POST...");
      personService.addPerson(personName)
        .then(response => {
          console.log("server response: ", response);
          console.log("addperson data:", response.data);
          personName.id = response.data.id;
          setPersons(persons.concat(personName));
          setNotMessage(`${personName.name} added to the phonebook!`);
          setTimeout(() => {setNotMessage(null)}, 2000);
        })
        .catch(error => {
          console.log("error henkilön lisäämisessä");
        })
      
    }

    setNewName('');
    setNewNumber('');
  }


  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);

  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    console.log("filtteri:", filter);
  }

  const subStringCheck = (string, substring) => {

    if(string.includes(substring)){
      console.log("string:", string, "substring:", substring)
      console.log("substring inside string");
      return true;
    } else {
      console.log("no substring inside string");
      return false;
    }

  }

  const peopleToShow = () => {

    if(filter === ''){
      return persons;
    } else {
      
      console.log("filltteröinti: ", persons.filter(person => subStringCheck(person.name, filter)))
      const filteredPeople = persons.filter(person => subStringCheck(person.name, filter)) 
      return filteredPeople;   
    }
    

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notMessage} />
      <Error message={errorMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm addNewPerson={addNewPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <Persons peopleToShow={peopleToShow} deleteContact={deleteContact} />
    </div>
  )

}


export default App;
