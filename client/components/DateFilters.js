import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import throttle from 'throttleit'
import Radium from 'radium'
import { sortBy, setDates, setPeriod, fetchTimes } from '../actions'
import periodValues from '../helpers/periodValues'

class DateFilters extends Component {

  constructor() {
    super()
    this.setPeriod = throttle(this.setPeriod, 1000)
    this.setDate = throttle(this.setDate, 1000)
    this.setCustomDate = throttle(this.setCustomDate, 1000)
  }

  setPeriod(value) {
    const { dispatch } = this.props
    dispatch(setPeriod(value))
    dispatch(setDates())
    dispatch(fetchTimes())
  }

  setCustomDate(startOrEnd, event) {
    const { dispatch } = this.props
    if (event.target && event.target.value) {
      dispatch(setPeriod('CUSTOM'))
      dispatch(setDates(moment(event.target.value), startOrEnd))
      dispatch(fetchTimes())
    }
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
        newDate = moment(startDate)[modifier](1, 'days')
        break
      case 'CUSTOM' :
      default :
        newDate = moment(startDate)[modifier](1, 'days')
        dispatch(setPeriod('DAY'))
        break
    }
    dispatch(setDates(newDate))
    dispatch(fetchTimes())
  }

  render() {
    const {
      startDate,
      endDate,
      period
    } = this.props

    return (
      <nav style={styles.dateNav}>
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
        <ul style={styles.periodList}>
          <li style={styles.buttonListItem} onClick={this.setDate.bind(this, 'subtract')}>
            <span style={[styles.dateSkipperArrows.base, styles.dateSkipperArrows.left]} />
            <span style={styles.dateSkipper}>Earlier</span>
          </li>
          {periodValues.map(periodValue => {
            return (
              <li key={periodValue.value} style={styles.buttonListItem}>
                <button
                  onClick={this.setPeriod.bind(this, periodValue.value)}
                  style={[styles.button, styles.buttonDisabled(periodValue.value === period)]}
                  disabled={periodValue.value === period}>
                  {periodValue.title}
                </button>
              </li>
            )
          })}
          <li style={styles.buttonListItem}>
            <span style={[styles.button, styles.buttonDisabled('CUSTOM' === period), styles.buttonNotClickable]}>Custom</span>
          </li>
          <li style={styles.buttonListItem} onClick={this.setDate.bind(this, 'add')}>
            <span style={styles.dateSkipper}>Later</span>
            <span style={[styles.dateSkipperArrows.base, styles.dateSkipperArrows.right]} />
          </li>
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

export default Radium(DateFilters)

const styles = {
  dateNav : {
    borderBottom : '1px solid #efefef',
    padding : '30px 0',
    margin : '0 0 30px',
    background : '#f9f9f9'
  },
  dateInputContainer : {
    maxWidth : 720,
    margin : '0 auto 30px',
    display : 'flex'
  },
  dateInput : {
    WebkitAppearance : 'none',
    border : 0,
    fontFamily : 'Helvetica Neue, Helvetica, Arial, sans-serif',
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
  },
  periodList : {
    display : 'flex',
    listStyle : 'none',
    maxWidth : 720,
    margin : '0 auto',
    alignItems : 'center',
    justifyContent : 'space-between',
    padding : 0
  },
  buttonListItem : {
    listStyle : 'none',
    fontFamily : 'Helvetica Neue, Helvetica, Arial, sans-serif',
    fontSize : 14,
    fontWeight : 200
  },
  button : {
    display : 'block',
    border : 'none',
    WebkitAppearance : 'none',
    fontFamily : 'Helvetica Neue, Helvetica, Arial, sans-serif',
    fontSize : 15,
    fontWeight : 200,
    cursor : 'pointer',
    background : 'transparent',
    outline : 0,
    borderRadius : 15,
    padding : '4px 10px',
    color : '#2B8CBE',
  },
  buttonDisabled : function(state) {
    return (state) ? {
      background : '#2B8CBE',
      color : '#FFF',
      ':hover' : {
        background : '#2B8CBE'
      }
    } : {}
  },
  buttonNotClickable : {
    cursor : 'default'
  },
  dateSkipper : {
    textTransform : 'uppercase',
    fontSize : 14,
    cursor : 'pointer',
    color : '#555'
  },
  dateSkipperArrows : {
    base : {
      width : 0,
      height : 0,
      display : 'inline-block',
      borderTop : '6px solid transparent',
      borderRight : '6px solid transparent',
      borderBottom : '6px solid transparent',
      borderLeft : '6px solid transparent',
    },
    left : {
      borderRight : '6px solid #555',
      marginRight : 8
    },
    right : {
      borderLeft : '6px solid #555',
      marginLeft : 8
    }
  }
}
