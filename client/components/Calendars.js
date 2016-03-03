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
              <span style={styles.dayPickerHeader}>From</span>
              <DayPicker modifiers={startModifiers}
                onClick={this.stopPropagation}
                onDayClick={this.handleDayClick.bind(this, 'start')}
                initialMonth={moment(startDate).startOf('month').toDate()} />
            </div>
          </li>
          <li style={styles.dayPickerItem}>
            <div style={styles.dayPicker}>
              <span style={styles.dayPickerHeader}>To</span>
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
    background : 'white',
    zIndex : 3,
    textAlign : 'center',
    overflowY : 'auto',
    boxSizing : 'border-box',
    WebkitOverflowScrolling : 'touch',
    '@media (max-width: 640px)' : {
      paddingTop : 50,
      paddingBottom : 20
    }
  },
  close : {
    background : 'white',
    color : '#2B8CBE',
    cursor : 'pointer',
    userSelect : 'none',
    fontSize : 16,
    fontWeight : 200,
    '@media (min-width: 641px)' : {
      display : 'inline-block',
      border : '1px solid #2B8CBE',
      width : '4.5em',
      height : '4.5em',
      lineHeight : '4.5em',
      position : 'absolute',
      top : '50%',
      left : '50%',
      transform : 'translate(-50%,15%)',
      zIndex : 1,
      transition : 'background 0.125s, color 0.125s',
      borderRadius : '50%',
      letterSpacing : 0.5,
      ':hover' : {
        background : '#2B8CBE',
        color : '#FFF'
      }
    },
    '@media (max-width: 640px)' : {
      position : 'fixed',
      width : '100%',
      height : 40,
      lineHeight : '40px',
      left : 0,
      top : 0,
      zIndex : 5,
      borderBottom : '1px solid #dfdfdf'
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
    },
    '@media (min-width: 641px) and (max-height: 400px)' : {
      top : 0,
      transform : 'none',
      padding : '40px 0'
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
  },
  dayPickerHeader : {
    fontSize : 28,
    fontWeight : 100,
    color : '#888',
    letterSpacing : 0.5,
    display : 'block',
    margin : '0 15px',
    paddingBottom : 12,
    borderBottom : '1px solid #cfcfcf'
  }
}
