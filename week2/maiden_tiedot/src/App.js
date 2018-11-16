import React from 'react'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      maat: [],
      search: ''
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ maat: response.data })
      })
  }

  handleSearchChange = (event) => {
    this.setState({ search: event.target.value })
  }

  whatToShow = () => {
    var x = this.state.search.length === 0 ?
      this.state.maat :
      this.state.maat.filter(maa => maa.name.toLowerCase().includes(this.state.search.toLowerCase()))
    switch(true) {
      case ( x.length === 0):
        console.log('zero')
        return (<div></div>)
      case ( x.length === 1):
        console.log('nice one')
        return(this.justOne(x[0]))
      case (x.length < 10):
        console.log('below 10')
        return(this.belowTen(x))
      default:
        console.log('too many')
        return(this.tooMany())
    }
  }

  justOne = (props) => {
    console.log(props)

    return(
      <div>
        <h1>{props.name}</h1>
        <p>capital: {props.capital}</p>
        <p>population: {props.population}</p>
        <img src={props.flag} width={300} alt={"The flag of " + props.name} />
      </div>
    )
  }

  belowTen = (props) => {
    console.log(props)
    return(
      <div>
        {props.map(maa => <this.Maa key={maa.alpha2Code} maa={maa} />)}
      </div>
    )
  }

  Maa = ({ maa }) => {
    return (
      <div onClick={ () => this.setState({ search: maa.name }) }>
        {maa.name}
      </div>
    )
  }

  tooMany = () => {
    return(
      <div>
        too many matches, specify another filter
      </div>
    )
  }

  render() {
    return (
      <div>
        <div>
          find countries:
          <input 
            value={this.state.search}
            onChange={this.handleSearchChange}
          />
        </div>
        {this.whatToShow()}
      </div>
    )
  }
}

export default App
