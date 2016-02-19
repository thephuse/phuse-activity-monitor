import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { render } from 'react-dom'
import moment from 'moment'
import Radium from 'radium'
import { sortBy, setDates, fetchTimes } from '../actions'
import sortByValues from '../helpers/sortByValues'
import sort from '../helpers/sort'
import User from '../components/User'
import Sort from '../components/Sort'
import Loader from '../components/Loader'
import DateFilters from '../components/DateFilters'
import PeriodStatistics from '../components/PeriodStatistics'

class App extends Component {

  componentDidMount() {
    const { dispatch, times } = this.props
    dispatch(fetchTimes())
  }

  render() {
    const {
      startDate,
      endDate,
      sortByValues,
      isFetching,
      times,
      period
    } = this.props

    return (
      <main>
        <DateFilters {...this.props} />
        <Loader loading={isFetching}>
          <PeriodStatistics times={times} />
          {( times.length
            ? <ul style={styles.userList}>
                <Sort {...this.props} />
                {times.map(user => {
                  return (
                    <User key={user.id} {...user}  />
                  )
                })}
              </ul>
            : (period === 'DAY'
              ? <div style={styles.noResults}>No times have been logged for {moment(startDate).format('MMMM Do, YYYY')}.</div>
              : <div style={styles.noResults}>No times have been logged between {moment(startDate).format('MMMM Do, YYYY')} and {moment(endDate).format('MMMM Do, YYYY')}.</div>
            )
          )}
        </Loader>
      </main>
    )
  }

}

App.propTypes = {
  startDate : PropTypes.string.isRequired,
  endDate : PropTypes.string.isRequired,
  period : PropTypes.string.isRequired,
  sortByValues : PropTypes.array.isRequired,
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

export default connect(mapStateToProps)(Radium(App))

const styles = {
  userList : {
    listStyle : 'none',
    maxWidth : 720,
    margin : '0 auto',
    padding : 0
  },
  noResults : {
    maxWidth : 720,
    padding : 0,
    fontFamily : 'Helvetica Neue, Helvetica, Arial, sans-serif',
    textAlign : 'center',
    fontWeight : 200,
    margin : '80px auto'
  }
}
