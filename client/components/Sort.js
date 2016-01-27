import React, { Component, PropTypes } from 'react'
import { sortBy } from '../actions'
import sortByValues from '../helpers/sortByValues'

class Sort extends Component {

  setSortBy(value) {
    const { dispatch } = this.props
    dispatch(sortBy(value))
  }

  render() {
    return (
      <ul>
        {sortByValues.map(sort => {
          return (
            <li key={sort.value}>
              <button onClick={this.setSortBy.bind(this, sort.value)}>{sort.title}</button>
            </li>
          )
        })}
      </ul>
    )
  }

}

Sort.propTypes = {
  sortBy : PropTypes.oneOf(sortByValues.map(i => i.value)),
  dispatch : PropTypes.func.isRequired
}

export default Sort
