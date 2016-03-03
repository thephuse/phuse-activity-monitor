import React, { Component, PropTypes } from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'
import moment from 'moment'
import Radium from 'radium'

import { setDates, setPeriod, fetchTimes, closeCalendar } from '../actions'

class Calendars extends Component {

  closeCalendar() {
    const { dispatch } = this.props
    dispatch(closeCalendar())
  }

  handleDayClick(startOrEnd, event, day, modifiers) {
    const { dispatch } = this.props
    if (modifiers.indexOf("disabled") === -1) {
      dispatch(setPeriod('CUSTOM'))
      dispatch(setDates(moment(day), startOrEnd))
      dispatch(fetchTimes())
    }
  }

  componentWillMount() {
    document.documentElement.classList.add('no-overflow')
  }

  componentWillUnmount() {
    document.documentElement.classList.remove('no-overflow')
  }

  render() {
    const {
      startDate,
      endDate,
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

    return (
      <div style={styles.modal}>
        <span style={styles.close} onClick={this.closeCalendar.bind(this)}>Close</span>
        <ul style={styles.dayPickers}>
          <li style={styles.dayPickerItem}>
            <div style={styles.dayPicker}>
              <DayPicker modifiers={startModifiers}
                onClick={this.stopPropagation}
                onDayClick={this.handleDayClick.bind(this, 'start')}
                initialMonth={moment(startDate).startOf('month').toDate()} />
            </div>
          </li>
          <li style={styles.dayPickerItem}>
            <div style={styles.dayPicker}>
              <DayPicker modifiers={endModifiers}
                onClick={this.stopPropagation}
                onDayClick={this.handleDayClick.bind(this, 'end')}
                initialMonth={moment(endDate).startOf('month').toDate()} />
            </div>
          </li>
        </ul>
      </div>
    )
  }

}

Calendars.propTypes = {
  startDate : PropTypes.string.isRequired,
  endDate : PropTypes.string.isRequired,
  dispatch : PropTypes.func.isRequired
}

export default Radium(Calendars)

const styles = {
  modal : {
    position : 'fixed',
    top : 0,
    left : 0,
    width : '100vw',
    height : '100vh',
    background : 'rgba(255,255,255,0.96)',
    zIndex : 3,
    textAlign : 'center',
    overflow : 'scroll',
    WebkitOverflowScrolling : 'touch'
  },
  close : {
    display : 'inline-block',
    fontSize : 12,
    width : '6em',
    height : '6em',
    lineHeight : '6em',
    position : 'absolute',
    top : '50%',
    left : '50%',
    transform : 'translateX(-50%)',
    zIndex : 1,
    textTransform : 'uppercase',
    fontWeight : 200,
    background : '#F3F3F3',
    transition : 'background 0.125s, color 0.125s',
    color : '#666',
    borderRadius : '50%',
    cursor : 'pointer',
    letterSpacing : 0.5,
    ':hover' : {
      background : '#2B8CBE',
      color : '#FFF'
    }
  },
  dayPickers : {
    listStyle : 'none',
    padding : 0,
    margin : '0 auto',
    '@media (min-width: 641px)' : {
      position : 'relative',
      top : '50vh',
      transform : 'translateY(-50%)'
    }
  },
  dayPickerItem : {
    fontSize : 'initial',
    textAlign : 'center',
    '@media (min-width: 641px)' : {
      display : 'inline-block',
      verticalAlign : 'top',
      width : '50%',
      maxWidth : 400
    },
    '@media (max-width: 640px)' : {

    }
  },
  dayPicker : {
    display : 'inline-block',
    maxWidth : 280
  }
}
