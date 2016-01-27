import fetch from 'isomorphic-fetch'
import moment from 'moment'
import dateFormat from '../helpers/dateFormat'

export const SORT_BY = 'SORT_BY'
export const SET_DATES = 'SET_DATES'
export const SET_PERIOD = 'SET_PERIOD'
export const REQUEST_TIMES = 'REQUEST_TIMES'
export const RECEIVE_TIMES = 'RECEIVE_TIMES'


function requestTimes({ startDate, endDate }) {
  return {
    type : REQUEST_TIMES,
    startDate,
    endDate
  }
}

function receiveTimes(times) {
  return {
    type : RECEIVE_TIMES,
    times,
    receivedAt : Date.now()
  }
}

function generateDates(state) {
  return {
    startDate : state.timesheets.startDate,
    endDate : state.timesheets.endDate
  }
}

export function sortBy(sort) {
  return {
    type : SORT_BY,
    value : sort
  }
}

export function setPeriod(period) {
  return (dispatch, getState) => {
    dispatch({
      type : SET_PERIOD,
      period
    })
    dispatch(setDates(getState().timesheets.startDate))
  }
}

export function setDates(startDate) {
  let dates
  return (dispatch, getState) => {
    const period = getState().timesheets.period
    switch (period) {
      case 'YEAR' :
        dates = {
          startDate : moment(startDate).startOf('year').format(dateFormat),
          endDate : moment(startDate).startOf('year').add(1, 'year').format(dateFormat)
        }
        break
      case 'MONTH' :
        dates = {
          startDate : moment(startDate).startOf('month').format(dateFormat),
          endDate : moment(startDate).startOf('month').add(1, 'month').format(dateFormat)
        }
        break
      case 'WEEK' :
        dates = {
          startDate : moment(startDate).startOf('week').format(dateFormat),
          endDate : moment(startDate).startOf('week').add(1, 'week').format(dateFormat)
        }
        break
      case 'DAY' :
      default :
        dates = {
          startDate : moment(startDate).startOf('day').format(dateFormat),
          endDate : moment(startDate).startOf('day').format(dateFormat)
        }
        break
    }
    dispatch({
      type : SET_DATES,
      startDate : dates.startDate,
      endDate : dates.endDate
    })
    dispatch(fetchTimes())
  }
}

export function fetchTimes() {
  return (dispatch, getState) => {
    let dates = requestTimes(generateDates(getState()));
    dispatch(requestTimes(dates))
    return fetch(`http://localhost:3000/times/${dates.startDate}/${dates.endDate}`)
      .then(response => response.json())
      .then(json => json.map(item => item.user).filter(item => (item.total > 0)))
      .then(times => dispatch(receiveTimes(times)))
  }
}
