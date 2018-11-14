import React from 'react'

class Filter extends React.Component {
  render() {
    return (
      <div>
        rajaa näytettäviä
        <input
          value={this.props.filter}
          onChange={ event => this.props.handleFilter(event) }
        />
      </div>
    )
  }
}

export default Filter