import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import moment from 'moment'
import Radium from 'radium'

import Calendars from './Calendars'
import { openCalendar } from '../actions'

import 'react-day-picker/lib/style.css';

class DateFilters extends Component {

  openCalendar() {
    const { dispatch } = this.props
    dispatch(openCalendar())
  }

  render() {
    const {
      startDate,
      endDate,
      calendar
    } = this.props

    return (
      <div>
        <nav style={styles.dateInputContainer}>
          <ul style={styles.calendarInvokers}>
            <li key="startDate" style={[styles.calendarInvoker, styles.startDate]} onClick={this.openCalendar.bind(this)}>
              <span style={styles.calendarInvokerLabel}>From</span>
              <span style={styles.calendarInvokerDate}>{moment(startDate).format('MMMM Do, YYYY')}</span>
            </li>
            <li key="endDate" style={[styles.calendarInvoker, styles.endDate]} onClick={this.openCalendar.bind(this)}>
              <span style={styles.calendarInvokerLabel}>To</span>
              <span style={styles.calendarInvokerDate}>{moment(endDate).format('MMMM Do, YYYY')}</span>
            </li>
          </ul>
        </nav>
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionAppear={true}
          transitionAppearTimeout={125}
          transitionEnterTimeout={125}
          transitionLeaveTimeout={125}>
          {calendar === true ?
            <Calendars {...this.props} />
          : null}
        </ReactCSSTransitionGroup>
      </div>
    )
  }

}

DateFilters.propTypes = {
  startDate : PropTypes.string.isRequired,
  endDate : PropTypes.string.isRequired,
  dispatch : PropTypes.func.isRequired
}

export default Radium(DateFilters)

const styles = {
  dateInputContainer : {
    maxWidth : 720,
    padding : '0 10px',
    display : 'block',
    overflow : 'hidden',
    boxSizing : 'border-box',
    '@media (min-width: 569px)' : {
      background : 'url("/phuse-logo.svg") no-repeat 50% 100%',
      paddingTop : 30,
      margin : '0 auto 30px',
    },
    '@media (max-width: 568px)' : {
      paddingTop : 15,
      margin : '0 auto 15px'
    }
  },
  dateInput : {
    WebkitAppearance : 'none',
    border : 0,
    fontSize : 28,
    fontWeight : 100,
    background : 'transparent',
    borderRadius : 16
  },
  calendarInvokers : {
    listStyle : 'none',
    margin : 0,
    padding : 0,
    '@media (max-width: 568px)' : {
      textAlign : 'center'
    }
  },
  calendarInvoker : {
    fontSize : 20,
    paddingRight : 8,
    display : 'inline-block',
    lineHeight : '26px',
    cursor : 'pointer',
    userSelect : 'none',
    overflow : 'hidden',
    borderRadius : 13,
    transition : 'background-color 0.125s, color 0.125s',
    '@media (min-width: 569px)' : {
      ':hover' : {
        backgroundColor : '#2B8CBE',
        color : 'white'
      }
    },
    '@media (max-width: 568px)' : {
      position : 'relative',
      display : 'block'
    }
  },
  calendarInvokerLabel : {
    display : 'inline-block',
    fontSize : 12,
    lineHeight : '24px',
    verticalAlign : 'top',
    textTransform : 'uppercase',
    backgroundColor : '#efefef',
    padding : '0 8px',
    margin : '1px 6px 0 1px',
    borderRadius : 12,
    letterSpacing : 0.5,
    color : '#999',
    fontWeight : 200,
    '@media (max-width: 568px)' : {
      position : 'absolute',
      left : 0,
      top : 0,
      background : 'transparent'
    }
  },
  calendarInvokerDate : {
    display : 'inline-block',
    verticalAlign : 'top',
    fontWeight : 100,
    lineHeight : 'inherit'
  },
  startDate : {
    float : 'left',
    marginLeft : 9,
    '@media (max-width: 568px)' : {
      float : 'none',
      marginLeft : 0
    }
  },
  endDate : {
    float : 'right',
    marginRight : 2,
    '@media (max-width: 568px)' : {
      float : 'none',
      marginRight : 0,
      marginTop : 15
    }
  }
}
