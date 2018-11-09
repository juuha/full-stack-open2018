import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  nappi = (palaute) => () => {
    const apu = {
      hyva: this.state.hyva,
      neutraali: this.state.neutraali,
      huono: this.state.huono
    }

    apu[palaute]++

    this.setState({
      hyva: apu.hyva,
      neutraali: apu.neutraali,
      huono: apu.huono
    })
  }

  render () {
    const total = this.state.hyva + this.state.neutraali + this.state.huono

    const Button = (props) => {
      return (
        <>
          <button onClick={this.nappi(props.action)} actionname={props.action} >{props.name}</button>
        </>
      )
    }

    const Palaute = () => {
      return (
        <div>
          <h2>anna palautetta</h2>
          <Button name={'hyvä'} action={'hyva'} />
          <Button name={'neutraali'} action={'neutraali'} />
          <Button name={'huono'} action={'huono'} />
        </div>
      )
    }

    const Keskiarvo = () => {
      const ka = ((this.state.hyva - this.state.huono) / (total ? total : 1)).toFixed(1)

      return (
        <>
          {ka}
        </>
      )
    }

    const Positiivisia = () => {
      const pos = (this.state.hyva / (total ? total : 1) * 100).toFixed(1)
      
      return (
        <>
          {pos} %
        </>
      )
    }

    const Statistic = (props) => {
      return (
        <tbody>
          <tr>
            <td>{props.text}</td> 
            <td>{props.num}</td>
          </tr>
        </tbody>
      )
    }

    const Statistics = () => {
      if (!total) {
        return (
          <div>
            <p>ei yhtään palautetta annettu</p>
          </div>
        )
      }

      return (
        <div>
          <h2>statistiikka</h2>
          <table>
            <Statistic text={'hyvä'} num={this.state.hyva} />
            <Statistic text={'neutraali'} num={this.state.neutraali} />
            <Statistic text={'huono'} num={this.state.huono} />
            <Statistic text={'keskiarvo'} num={Keskiarvo()} />
            <Statistic text={'positiivisia'} num={Positiivisia()} />
          </table>
        </div>
      )
    }

    return (
      <div>
        <Palaute />
        <Statistics />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)