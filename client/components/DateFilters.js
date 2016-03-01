import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Radium from 'radium'
import { setDates, setPeriod, fetchTimes } from '../actions'

class DateFilters extends Component {

  setCustomDate(startOrEnd, event) {
    const { dispatch } = this.props
    if (event.target && event.target.value) {
      dispatch(setPeriod('CUSTOM'))
      dispatch(setDates(moment(event.target.value), startOrEnd))
      dispatch(fetchTimes())
    }
  }

  render() {
    const {
      startDate,
      endDate,
      period
    } = this.props

    return (
      <div style={styles.dateInputContainer}>
        <input
          type="date"
          style={[styles.dateInput, styles.startDate]}
          value={moment(startDate).format('YYYY-MM-DD')}
          max={moment(endDate).format('YYYY-MM-DD')}
          onChange={this.setCustomDate.bind(this, 'start')} />
        <input
          type="date"
          style={[styles.dateInput, styles.endDate]}
          value={moment(endDate).format('YYYY-MM-DD')}
          min={moment(startDate).format('YYYY-MM-DD')}
          max={moment().format('YYYY-MM-DD')}
          onChange={this.setCustomDate.bind(this, 'end')} />
      </div>
    )
  }

}

DateFilters.propTypes = {
  startDate : PropTypes.string.isRequired,
  endDate : PropTypes.string.isRequired,
  period : PropTypes.string.isRequired,
  dispatch : PropTypes.func.isRequired
}

export default Radium(DateFilters)

const styles = {
  dateInputContainer : {
    maxWidth : 720,
    margin : '0 auto 30px',
    display : 'flex'
  },
  dateInput : {
    WebkitAppearance : 'none',
    border : 0,
    fontSize : 28,
    fontWeight : 100,
    background : 'transparent',
    borderRadius : 16
  },
  startDate : {
    float : 'left'
  },
  endDate : {
    float : 'right'
  }
}
