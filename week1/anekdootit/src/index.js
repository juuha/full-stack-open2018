import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: Array(this.props.anecdotes.length).fill(0)
    }
  }

  randAnec = () => () => {
    const curr = this.state.selected
    let max = this.props.anecdotes.length
    let rand
    do {
      rand = Math.floor(Math.random() * max)
    } while (curr === rand)

    this.setState({
      selected: rand
    })
  }

  vote = () => () => {
    const kopio = [...this.state.votes]
    kopio[this.state.selected]++

    this.setState({
      votes: kopio
    })
  }

  mostVoted = () => {
    return (
      this.state.votes.reduce((maxindex, votesAtIndex, index) => {
        return (votesAtIndex > this.state.votes[maxindex] ? index : maxindex)
      }, 0))
  }

  render() {

    const Anecdote = (props) => {
      return (
        <div>
          {this.props.anecdotes[props.selected]} <br />
          has {this.state.votes[props.selected]} votes
        </div>
      )
    }

    const Button = (props) => {
      return (
        <>
          <button onClick={props.action}>{props.text}</button>
        </>
      )
    }

    return (
      <div>
        <Anecdote selected={this.state.selected} />
        <Button action={this.vote()} text={"vote"} />
        <Button action={this.randAnec()} text={"next anecdote"} />
        <h3>anecdote with most votes:</h3>
        <Anecdote selected={this.mostVoted()} />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)