import {
  SET_DATES,
  REQUEST_TIMES,
  RECEIVE_TIMES,
  SortBy
} from '../actions';

const initialState = {
  sortBy : SortBy.NAME_ASC,
  isFetching : false,
  times : []
}

function times(state = initialState, action) {
  switch (action.type) {
    case SET_DATES :
      return Object.assign({}, state, {
        sortBy : action.sortBy
      })
    case REQUEST_TIMES :
      return Object.assign({}, state, {
        isFetching : true
      })
    default :
      return state
  }
}
