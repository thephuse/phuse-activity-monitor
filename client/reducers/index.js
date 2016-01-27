import { combineReducers } from 'redux';
import { SET_DATES, SORT_BY, REQUEST_TIMES, RECEIVE_TIMES, SortByValues } from '../actions'

const initialState = {
  sortBy : SortByValues.NAME_ASC,
  isFetching : false,
  startDate : 20151201,
  endDate : 20160101,
  times : []
}

function timesheets(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case SET_DATES :
      return Object.assign({}, state, {
        startDate : action.startDate,
        endDate : action.endDate
      })
    case SORT_BY :
      return Object.assign({}, state, {
        sortBy : action.sortBy
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
