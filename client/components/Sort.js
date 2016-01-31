import React, { Component, PropTypes } from 'react'
import { sortBy } from '../actions'
import sortByValues from '../helpers/sortByValues'

const styles = {
  listHeader : {
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    boxSizing : 'border-box',
    padding : 10,
    fontFamily : 'Helvetica Neue, Helvetica, Arial, sans-serif',
    textTransform : 'uppercase',
    fontWeight : 200,
    borderBottom : '1px solid #cfcfcf',
    fontSize : 13,
    color : '#777'
  },
  inlineUserDetail : {
    flex : 1,
    cursor : 'pointer',
    userSelect : 'none',
    WebkitUserSelect : 'none',
    boxSizing : 'border-box',
    marginRight : 10,
    position : 'relative'
  },
  sort : {
    base : {
      display : 'inline-block',
      verticalAlign : 'middle',
      top : '50%',
      width : 0,
      height : 0,
      marginTop : -3,
      marginLeft : 10,
      border : 'solid 4px transparent'
    },
    ascending : {
      borderBottom : 'solid 4px #999'
    },
    descending : {
      borderTop : 'solid 4px #999'
    }
  }
}

class Sort extends Component {

  setSortBy(value) {
    const { dispatch } = this.props
    let criterion = value.toUpperCase()
    if (this.props.sortBy === `${criterion}_ASC`) {
      dispatch(sortBy(`${criterion}_DESC`))
    } else {
      dispatch(sortBy(`${criterion}_ASC`))
    }
  }

  getSortState(value) {
    const { sortBy } = this.props
    let criterion = value.toUpperCase()
    if (this.props.sortBy === `${criterion}_ASC`) {
      return styles.sort.ascending
    } else if (this.props.sortBy === `${criterion}_DESC`) {
      return styles.sort.descending
    } else {
      return {}
    }
  }

  render() {
    return (
      <li style={styles.listHeader}>
        <span style={styles.inlineUserDetail}></span>
        <span onClick={this.setSortBy.bind(this, 'FIRST_NAME')} style={styles.inlineUserDetail}>
          <span>Name</span>
          <span style={Object.assign({}, styles.sort.base, this.getSortState('FIRST_NAME'))} />
        </span>
        <span onClick={this.setSortBy.bind(this, 'TOTAL_HOURS')} style={styles.inlineUserDetail}>
          <span>Total</span>
          <span style={Object.assign({}, styles.sort.base, this.getSortState('TOTAL_HOURS'))} />
        </span>
        <span onClick={this.setSortBy.bind(this, 'BILLABLE_HOURS')} style={styles.inlineUserDetail}>
          <span>Billable</span>
          <span style={Object.assign({}, styles.sort.base, this.getSortState('BILLABLE_HOURS'))} />
        </span>
        <span onClick={this.setSortBy.bind(this, 'BILLABLE_RATIO')} style={styles.inlineUserDetail}>
          <span>Billable Ratio</span>
          <span style={Object.assign({}, styles.sort.base, this.getSortState('BILLABLE_RATIO'))} />
        </span>
      </li>
    )
  }

}

Sort.propTypes = {
  sortBy : PropTypes.oneOf(sortByValues.map(i => i.value)),
  dispatch : PropTypes.func.isRequired
}

export default Sort
