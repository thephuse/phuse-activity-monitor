import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { render } from 'react-dom';
import { sortBy, setDates, fetchTimes } from '../actions'
import sortByValues from '../helpers/sortByValues'
import sort from '../helpers/sort'
import User from '../components/User'
import Sort from '../components/Sort'
import DateFilters from '../components/DateFilters'

const styles = {
  userList : {
    listStyle : 'none',
    maxWidth : 720,
    margin : '0 auto'
  }
}

class App extends Component {

  componentDidMount() {
    const { dispatch, times } = this.props
    dispatch(fetchTimes())
  }

  render() {
    const { startDate, endDate, sortByValues, times } = this.props

    return (
      <div>
        <DateFilters {...this.props} />
        <ul style={styles.userList}>
          <Sort {...this.props} />
          {times.map(user => {
            return (
              <User key={user.id} {...user}  />
            )
          })}
        </ul>
      </div>
    )
  }

}

App.propTypes = {
  sortBy : PropTypes.oneOf(sortByValues.map(i => i.value)),
  times : PropTypes.array.isRequired,
  isFetching : PropTypes.bool.isRequired,
  dispatch : PropTypes.func.isRequired
}

function mapStateToProps(state) {

  const { sortBy, startDate, endDate, period, isFetching, times } = state.timesheets

  return {
    sortBy,
    startDate,
    endDate,
    period,
    isFetching,
    sortByValues,
    times : sort(times, sortBy)
  }
}

export default connect(mapStateToProps)(App)
