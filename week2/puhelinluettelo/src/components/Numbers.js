import React from 'react'

const Numbers = ({ state }) => {
  return (
    <div>
      <h3>Numerot</h3>
      <table>
        <tbody>
            {personsToShow(state).map(person => <Person key={person.name} person={person} />)}
        </tbody>
      </table>
    </div>
  )
}

const Person = ({ person }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
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