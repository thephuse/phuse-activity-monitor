import React, { Component, PropTypes } from 'react'
import Radium from 'radium'
import md5 from 'md5'

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
        <span style={Object.assign({}, styles.inlineUserDetail, styles.avatarContainer)}>
          <img style={styles.avatar} src={gravatar} alt={`${first_name} ${last_name}`} />
        </span>
        <span style={[styles.inlineUserDetail, styles.name]}>{first_name} {last_name}</span>
        <span style={[styles.inlineUserDetail, styles.totalHours]}>{total.toFixed(2)}</span>
        <span style={[styles.inlineUserDetail, styles.billableHours]}>{billable_total.toFixed(2)}</span>
        <span style={[styles.inlineUserDetail, styles.percentage]}>
          <span style={[styles.percentageBar.base, styles.percentageBar.billable, { width : `${Math.round(billable_total/total*100)}%` }]} />
          <span style={[styles.percentageBar.base, styles.percentageBar.unbillable, { width : `${(100 - Math.round(billable_total/total*100))}%` }]} />
          <span style={styles.percentageBar.figure}>{Math.round(billable_total/total*100)}%</span>
        </span>
      </li>
    )
  }

}

export default Radium(User)

const styles = {
  listItem : {
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    borderBottom : '1px solid #efefef',
    boxSizing : 'border-box',
    fontWeight : 200,
    padding : 10,
    fontSize : 14
  },
  inlineUserDetail : {
    flex : 1
  },
  avatarContainer : {
    lineHeight : 0
  },
  avatar : {
    width : 60,
    height : 60,
    borderRadius : '50%',
    '@media (max-width: 480px)' : {
      width : 50,
      height : 50
    }
  },
  name : {

  },
  totalHours : {

  },
  billableHours : {

  },
  percentage : {
    position : 'relative'
  },
  percentageBar : {
    base : {
      display : 'inline-flex',
      flex : 1,
      height : 18
    },
    billable : {
      backgroundColor : '#2B8CBE'
    },
    unbillable : {
      backgroundColor : '#7BCCC4'
    },
    figure : {
      position : 'absolute',
      left : 4,
      top : 0,
      zIndex : 1,
      fontSize : 14,
      lineHeight : `${18/14}em`,
      fontWeight : 400,
      color : '#FFF'
    }
  }
}
