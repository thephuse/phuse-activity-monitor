import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Radium from 'radium'
import { setDates, setPeriod, fetchTimes } from '../actions'
import periodValues from '../helpers/periodValues'

class PeriodFilters extends Component {

  setPeriod(value) {
    const { dispatch } = this.props
    dispatch(setPeriod(value))
    dispatch(setDates())
    dispatch(fetchTimes())
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
                style={[styles.button, styles.buttonCurrent(periodValue.value === period)]}>
                {periodValue.title}
              </button>
            </li>
          )
        })}
        <li style={[styles.buttonListItem, styles.superfluousOnMobile]}>
          <span style={[styles.button, styles.buttonCurrent('CUSTOM' === period), styles.buttonNotClickable]}>Custom</span>
        </li>
        <li style={styles.buttonListItem} onClick={this.setDate.bind(this, 'add')}>
          <span style={styles.dateSkipper}>Later</span>
          <span style={[styles.dateSkipperArrows.base, styles.dateSkipperArrows.right]} />
        </li>
      </ul>
    )
  }

}

export default Radium(PeriodFilters)

PeriodFilters.propTypes = {
  startDate : PropTypes.string.isRequired,
  endDate : PropTypes.string.isRequired,
  period : PropTypes.string.isRequired,
  dispatch : PropTypes.func.isRequired
}

const styles = {
  periodList : {
    display : 'flex',
    listStyle : 'none',
    maxWidth : 760,
    padding : '0 20px',
    margin : '0 auto',
    alignItems : 'center',
    justifyContent : 'space-between',
    boxSizing : 'border-box'
  },
  buttonListItem : {
    listStyle : 'none',
    fontSize : 14,
    fontWeight : 200
  },
  button : {
    display : 'block',
    border : 'none',
    WebkitAppearance : 'none',
    fontSize : 15,
    fontWeight : 200,
    cursor : 'pointer',
    background : 'transparent',
    outline : 0,
    borderRadius : 15,
    padding : '4px 10px',
    color : '#2B8CBE'
  },
  buttonCurrent : function(state) {
    return (state ? {
      background : '#2B8CBE',
      color : '#FFF',
    } : {})
  },
  dateSkipper : {
    textTransform : 'uppercase',
    fontSize : 14,
    cursor : 'pointer',
    color : '#555',
    '@media (max-width: 480px)' : {
      display : 'none'
    }
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
  },
  superfluousOnMobile : {
    '@media (max-width: 480px)' : {
      display : 'none'
    }
  }
}
