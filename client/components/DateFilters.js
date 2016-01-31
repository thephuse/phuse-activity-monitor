import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import throttle from 'throttleit'
import { sortBy, setDates, setPeriod } from '../actions'
import periodValues from '../helpers/periodValues'

const styles = {
  buttonListItem : {
    display : 'inline-block',
    listStyle : 'none'
  },
  button : {
    display : 'inline-block',
    background : 'white',
    border : 'none'
  }
}

class DateFilters extends Component {

  constructor() {
    super()
    this.setPeriod = throttle(this.setPeriod, 1000)
    this.setDate = throttle(this.setDate, 1000)
  }

  setToday(value) {
    const { dispatch } = this.props
    dispatch(setPeriod('DAY'))
    dispatch(setDates(moment()))
  }

  setPeriod(value) {
    const { dispatch } = this.props
    dispatch(setPeriod(value))
  }

  setDate(modifier) {
    const { startDate, period, dispatch } = this.props
    let newDate
    switch (period) {
      case 'YEAR' :
        newDate = moment(startDate)[modifier](1, 'years')
        break
      case 'MONTH' :
        newDate = moment(startDate)[modifier](1, 'months')
        break
      case 'WEEK' :
        newDate = moment(startDate)[modifier](1, 'weeks')
        break
      case 'DAY' :
      default :
        newDate = moment(startDate)[modifier](1, 'days')
        break
    }
    dispatch(setDates(newDate))
  }

  render() {
    const {
      startDate,
      endDate,
      period
    } = this.props

    return (
      <nav>
        <h2>{moment(startDate).format('YYYY-MM-DD')} - {moment(endDate).format('YYYY-MM-DD')}</h2>
        <span onClick={this.setDate.bind(this, 'subtract')}>Earlier</span>
        <span onClick={this.setDate.bind(this, 'add')}>Later</span>
        <ul>
          <li style={styles.buttonListItem}>
            <button onClick={this.setToday.bind(this)} style={styles.button}>Today</button>
          </li>
          {periodValues.map(periodValue => {
            return (
              <li key={periodValue.value} style={styles.buttonListItem}>
                <button onClick={this.setPeriod.bind(this, periodValue.value)} style={styles.button} disabled={periodValue.value === period}>
                  {periodValue.title}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }

}

DateFilters.propTypes = {
  startDate : PropTypes.string.isRequired,
  endDate : PropTypes.string.isRequired,
  period : PropTypes.string.isRequired,
  dispatch : PropTypes.func.isRequired
}

export default DateFilters
