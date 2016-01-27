import { combineReducers } from 'redux'
import moment from 'moment'
import {
  SET_DATES,
  SET_PERIOD,
  SORT_BY,
  REQUEST_TIMES,
  RECEIVE_TIMES,
} from '../actions'
import sortByValues from '../helpers/sortByValues'
import periodValues from '../helpers/periodValues'
import dateFormat from '../helpers/dateFormat'

const initialState = {
  sortBy : sortByValues[0].value,
  period : periodValues[0].value,
  isFetching : false,
  startDate : moment().format(dateFormat),
  endDate : moment().format(dateFormat),
  times : []
}

function timesheets(state = initialState, action) {
  switch (action.type) {
    case SET_DATES :
      return Object.assign({}, state, {
        startDate : action.startDate,
        endDate : action.endDate
      })
    case SET_PERIOD :
      return Object.assign({}, state, {
        period : action.period
      })
    case SORT_BY :
      return Object.assign({}, state, {
        sortBy : action.value
      })
    case REQUEST_TIMES :
      return Object.assign({}, state, {
        isFetching : true
      })
    case RECEIVE_TIMES :
      return Object.assign({}, state, {
        isFetching : false,
        times : action.times
      })
    default :
      return state
  }
}

const rootReducer = combineReducers({
  timesheets
})

export default rootReducer
