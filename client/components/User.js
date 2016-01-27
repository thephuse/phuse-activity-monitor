import React, { Component, PropTypes } from 'react'

class User extends Component {

  render() {
    const {
      id,
      first_name,
      last_name,
      total,
      billable_total
    } = this.props

    return (
      <li>
        <span>{first_name} {last_name}</span>
        <span>All: {total.toFixed(2)}</span>
        <span>Billable: {billable_total.toFixed(2)}</span>
        <span>Percent: {Math.round(billable_total/total*100)}</span>
      </li>
    )
  }

}

export default User
