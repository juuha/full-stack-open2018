import React from 'react'

const Numbers = ({ state, destroyPerson }) => {
  return (
    <div>
      <h3>Numerot</h3>
      <table>
        <tbody>
            {personsToShow(state).map(person => <Person key={person.name} person={person} destroyPerson={destroyPerson} />)}
        </tbody>
      </table>
    </div>
  )
}

const Person = ({ person, destroyPerson }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td>
        <button onClick={ () => destroyPerson(person.id) }>
          poista
        </button>
      </td>
    </tr>
  )
}

const personsToShow = (state) => {
  return (
    state.persons.filter(person => {
      return person.name.toLocaleLowerCase().includes(state.filter)
    })
  )
}

export default Numbers