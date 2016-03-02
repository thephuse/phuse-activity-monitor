import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Radium from 'radium'
import DayPicker, { DateUtils } from 'react-day-picker'
import { setDates, setPeriod, fetchTimes, openCalendar } from '../actions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import 'react-day-picker/lib/style.css';

class DateFilters extends Component {

  openCalendarPane() {
    const { dispatch } = this.props
    dispatch(openCalendar())
  }

  handleDayClick(startOrEnd, event, day, modifiers) {
    const { dispatch } = this.props
    if (modifiers.indexOf("disabled") === -1) {
      dispatch(setPeriod('CUSTOM'))
      dispatch(setDates(moment(day), startOrEnd))
      dispatch(fetchTimes())
    }
  }

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
      period,
      calendar
    } = this.props

    const startModifiers = {
      disabled : day => (moment(day).isAfter(endDate, 'day')),
      selected : day => (moment(day).isSame(startDate, 'day'))
    }

    const endModifiers = {
      disabled : day => (moment(day).isBefore(startDate, 'day') || moment(day).isAfter(new Date(), 'day')),
      selected : day => (moment(day).isSame(endDate, 'day'))
    }

    const desktop = (
      <div>
        <nav style={styles.dateInputContainer} onClick={this.openCalendarPane.bind(this)}>
          <span>{moment(startDate).format('YYYY-MM-DD')}</span>
          <span>{moment(endDate).format('YYYY-MM-DD')}</span>
        </nav>
        {calendar === true ?
          <div>
            <DayPicker modifiers={startModifiers}
              onClick={this.stopPropagation}
              onDayClick={this.handleDayClick.bind(this, 'start')}
              initialMonth={moment(startDate).startOf('month').toDate()} />
            <DayPicker modifiers={endModifiers}
              onClick={this.stopPropagation}
              onDayClick={this.handleDayClick.bind(this, 'end')}
              initialMonth={moment(endDate).startOf('month').toDate()} />
          </div>
        : null}
      </div>
    )

    const mobile = (
      <ul style={styles.dateInputContainer}>
        <li>
          <input
            type="date"
            style={[styles.dateInput, styles.startDate]}
            value={moment(startDate).format('YYYY-MM-DD')}
            max={moment(endDate).format('YYYY-MM-DD')}
            onChange={this.setCustomDate.bind(this, 'start')} />
        </li>
        <li>
          <input
            type="date"
            style={[styles.dateInput, styles.endDate]}
            value={moment(endDate).format('YYYY-MM-DD')}
            min={moment(startDate).format('YYYY-MM-DD')}
            max={moment().format('YYYY-MM-DD')}
            onChange={this.setCustomDate.bind(this, 'end')} />
        </li>
      </ul>
    )

    return desktop
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
