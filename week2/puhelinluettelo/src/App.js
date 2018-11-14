import React from 'react'
import Numbers from './components/Numbers'
import Filter from './components/Filter'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
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
      alert('Sama nimi ei saa toistua.')
      return
    }

    const person = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    const persons = this.state.persons.concat(person)

    this.setState({ persons })
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
        <Numbers state={this.state} />
      </div>
    )
  }
}

export default App