import React from 'react'

const Kurssi = ({ kurssi }) => {
  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto kurssi={kurssi} />
      <Yhteensa kurssi={kurssi} />
    </div>
  )
}

const Otsikko = ({ kurssi }) => {
  return (
    <h1>{kurssi.nimi}</h1>
  )
}

const Sisalto = ({ kurssi }) => {
  return (
    <div>
      {kurssi.osat.map( osa => <Osa key={osa.id} osa={osa} />)}
    </div>
  )
}

const Osa = (props) => {
  return (
    <p>{props.osa.nimi} {props.osa.tehtavia}</p>
  )
}

const Yhteensa = ({ kurssi }) => {
  var yht = kurssi.osat.reduce( (summa, osa) => {
    return summa + osa.tehtavia
  }, 0)

  return (
    <div>
      Yhteensä {yht} tehtävää
    </div>
  )
}

export default Kurssi