import React from 'react'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response.data })
      })
  }
  
  handleNameChange = (event) => {
    this.setState({newName: event.target.value})
  }

  handleNumberChange = (event) => {
    this.setState({newNumber: event.target.value})
  }

  handleFilterChange = (event) => {
    this.setState({filter: event.target.value})
  }

  addPerson = (event) => {
    event.preventDefault()
    
    if (this.state.persons.map(person => person.name).includes(this.state.newName)){
      this.updatePerson()
      return
    }

    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    personService
      .create(personObject)
      .then(response => {
        this.setState({
          persons: this.state.persons.concat(response.data),
          newName: '',
          newNumber: ''
        })
      })
  }

  destroyPerson = (id) => {
    if(window.confirm(`Poistetaanko ${this.state.persons.find(p => p.id === id).name}`)) {
      personService
        .destroy(id)
        .then(response => {
          this.setState({ persons: this.state.persons.filter(p => p.id !== id) })
        })
    }
  }

  updatePerson = () => {
    if (window.confirm(`${this.state.newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
      const person = this.state.persons.find(person => person.name === this.state.newName)
      const changedPerson = { ...person, number: this.state.newNumber }

      personService
        .update(person.id, changedPerson)
        .then(response => {
          this.setState({
            persons: this.state.persons.map(pers => pers.id !== person.id ? pers : changedPerson)
          })
        })
    }
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Filter filter={this.state.filter} handleFilter={this.handleFilterChange} />
        <div>
          <h3>Lisää uusi!</h3>
          <form onSubmit={this.addPerson}>
            <div>
              nimi: 
              <input 
                value={this.state.newName}
                onChange={this.handleNameChange}
              />
            </div>
            <div>
              numero:
              <input 
                value={this.state.newNumber}
                onChange={this.handleNumberChange}
              />
            </div>
            <div>
              <button type="submit">lisää</button>
            </div>
          </form>
        </div>
        <Numbers state={this.state} destroyPerson={this.destroyPerson} />
      </div>
    )
  }
}

export default App