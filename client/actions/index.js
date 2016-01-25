import fetch from 'whatwg-fetch';

export const SET_DATES = 'SET_DATES';
export const REQUEST_TIMES = 'REQUEST_TIMES';
export const RECEIVE_TIMES = 'RECEIVE_TIMES';

export const SortBy = {
  NAME_ASC : 'NAME_ASC',
  NAME_DESC : 'NAME_DESC',
  HOURS_ASC : 'HOURS_ASC',
  HOURS_DESC : 'HOURS_DESC',
  BILLABLE_HOURS_ASC : 'BILLABLE_HOURS_ASC',
  BILLABLE_HOURS_DESC : 'BILLABLE_HOURS_DESC'
}

function requestTimes(startDate, endDate) {
  return {
    type : REQUEST_TIMES,
    startDate : startDate,
    endDate : endDate
  }
}

function receiveTimes(startDate, endDate, json) {
  return {
    type : RECEIVE_TIMES,
    startDate : startDate,
    endDate : endDate,
    times : json,
    receivedAt : Date.now()
  }
}

export function setDates(startDate, endDate) {
  return {
    type : SET_DATES,
    startDate : startDate,
    endDate : endDate
  }
}

export function fetchTimes(startDate, endDate) {
  return dispatch -> {
    dispatch(requestTimes(startDate, endDate));
    return fetch(`http://localhost:3000/times/${startDate}/${endDate}`)
      .then(response => dispatch(receiveTimes(startDate, endDate, json)))
  }
}
