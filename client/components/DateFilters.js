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
          <ul>
            <li onClick={this.openCalendar.bind(this)}>
              <span>From</span>
              <span>{moment(startDate).format('YYYY-MM-DD')}</span>
            </li>
            <li onClick={this.openCalendar.bind(this)}>
              <span>To</span>
              <span>{moment(endDate).format('YYYY-MM-DD')}</span>
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
