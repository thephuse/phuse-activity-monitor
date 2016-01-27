import React, { Component, PropTypes } from 'react'
import md5 from 'md5'

const styles = {
  listItem : {

  },
  avatar : {
    borderRadius : '50%'
  },
  name : {

  },
  statsList : {

  }
}

class User extends Component {

  render() {
    const {
      id,
      email,
      first_name,
      last_name,
      total,
      billable_total
    } = this.props

    let gravatar = `https://www.gravatar.com/avatar/${md5(email)}`

    return (
      <li style={styles.listItem}>
        <img style={styles.avatar} src={gravatar} />
        <span style={styles.name}>{first_name} {last_name}</span>
        <ul style={styles.statsList}>
          <li>All: {total.toFixed(2)}</li>
          <li>Billable: {billable_total.toFixed(2)}</li>
          <li>Percent: {Math.round(billable_total/total*100)}</li>
        </ul>
      </li>
    )
  }

}

export default User
