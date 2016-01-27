import fetch from 'isomorphic-fetch'

export const SORT_BY = 'SORT_BY'
export const SET_DATES = 'SET_DATES'
export const REQUEST_TIMES = 'REQUEST_TIMES'
export const RECEIVE_TIMES = 'RECEIVE_TIMES'

export const SortByValues = {
  NAME_ASC : 'NAME_ASC',
  NAME_DESC : 'NAME_DESC',
  HOURS_ASC : 'HOURS_ASC',
  HOURS_DESC : 'HOURS_DESC',
  BILLABLE_HOURS_ASC : 'BILLABLE_HOURS_ASC',
  BILLABLE_HOURS_DESC : 'BILLABLE_HOURS_DESC'
}

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

function fixDates(state) {
  return {
    startDate : state.timesheets.startDate,
    endDate : state.timesheets.endDate
  }
}

export function sortBy(sort) {
  return {
    type : SORT_BY,
    sort
  }
}

export function setDates(startDate, endDate) {
  return {
    type : SET_DATES,
    startDate,
    endDate
  }
}

export function fetchTimes() {
  return (dispatch, getState) => {
    let dates = requestTimes(fixDates(getState()));
    dispatch(requestTimes(dates))
    return fetch(`http://localhost:3000/times/${dates.startDate}/${dates.endDate}`)
      .then(response => response.json())
      .then(json => json.map(item => item.user))
      .then(times => dispatch(receiveTimes(times)))
  }
}
