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

  hyva = () => {
    this.setState({
      hyva: this.state.hyva +1
    })
  }

  neutraali = () => {
    this.setState({
      neutraali: this.state.neutraali +1
    })
  }

  huono = () => {
    this.setState({
      huono: this.state.huono +1
    })
  }

  render () {
    const total = this.state.hyva + this.state.neutraali + this.state.huono

    const Button = (props) => {
      return (
        <>
          <button onClick={props.action}>{props.name}</button>
        </>
      )
    }

    const Palaute = () => {
      return (
        <div>
          <h2>anna palautetta</h2>
          <Button name={'hyvä'} action={this.hyva} />
          <Button name={'neutraali'} action={this.neutraali} />
          <Button name={'huono'} action={this.huono} />
        </div>
      )
    }

    const Keskiarvo = () => {
      const ka = ((this.state.hyva - this.state.huono) / (total ? total : 1)).toFixed(1)

      return (
        <>
          keskiarvo {ka}
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
        <div>
          {props.text} {props.num}
        </div>
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
          <Statistic text={'hyvä'} num={this.state.hyva} />
          <Statistic text={'neutraali'} num={this.state.neutraali} />
          <Statistic text={'huono'} num={this.state.huono} />
          <Statistic text={'keskiarvo'} num={Keskiarvo()} />
          <Statistic text={'positiivisia'} num={Positiivisia()} />
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