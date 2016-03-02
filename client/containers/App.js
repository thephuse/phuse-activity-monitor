import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { render } from 'react-dom'
import moment from 'moment'
import Radium, { StyleRoot } from 'radium'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { sortBy, setDates, fetchTimes, openCalendar } from '../actions'
import sortByValues from '../helpers/sortByValues'
import sort from '../helpers/sort'

import User from '../components/User'
import Sort from '../components/Sort'
import Loader from '../components/Loader'
import DateFilters from '../components/DateFilters'
import PeriodFilters from '../components/PeriodFilters'
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
      period,
      calendar
    } = this.props

    const noResultsDay = <div style={styles.noResults}>No times have been logged for {moment(startDate).format('MMMM Do, YYYY')}.</div>
    const noResultsPeriod = <div style={styles.noResults}>No times have been logged between {moment(startDate).format('MMMM Do, YYYY')} and {moment(endDate).format('MMMM Do, YYYY')}.</div>
    const items = times.map(user => <User key={user.id} {...user}  />)

    return (
      <StyleRoot>
        <nav style={styles.dateNav}>
          <DateFilters {...this.props} />
          <PeriodFilters {...this.props} />
        </nav>
        <PeriodStatistics times={times} />
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionAppear={true}
          transitionAppearTimeout={125}
          transitionEnterTimeout={125}
          transitionLeaveTimeout={125}>
            {
              isFetching ? <Loader />
              : times.length
                ? <ul style={styles.userList}><Sort {...this.props} />{items}</ul>
                : period === 'DAY' ? noResultsDay : noResultsPeriod
            }
        </ReactCSSTransitionGroup>
      </StyleRoot>
    )
  }

}

App.propTypes = {
  startDate : PropTypes.string.isRequired,
  endDate : PropTypes.string.isRequired,
  period : PropTypes.string.isRequired,
  calendar : PropTypes.bool.isRequired,
  sortByValues : PropTypes.array.isRequired,
  sortBy : PropTypes.oneOf(sortByValues.map(i => i.value)),
  times : PropTypes.array.isRequired,
  isFetching : PropTypes.bool.isRequired,
  dispatch : PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const {
    sortBy,
    startDate,
    endDate,
    period,
    isFetching,
    times,
    calendar
  } = state.timesheets

  return {
    sortBy,
    startDate,
    endDate,
    period,
    isFetching,
    sortByValues,
    calendar,
    times : sort(times, sortBy)
  }
}

export default connect(mapStateToProps)(Radium(App))

const styles = {
  dateNav : {
    borderBottom : '1px solid #efefef',
    padding : '30px 0',
    margin : '0 0 30px',
    background : '#f9f9f9'
  },
  userList : {
    listStyle : 'none',
    maxWidth : 720,
    margin : '0 auto',
    padding : 0
  },
  noResults : {
    maxWidth : 720,
    padding : 0,
    textAlign : 'center',
    fontWeight : 200,
    margin : '80px auto'
  }
}
