import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { render } from 'react-dom';
import { SortByValues, sortBy, setDates, fetchTimes } from '../actions'
import User from '../components/User'

class AppContainer extends Component {

  constructor(props) {
    super(props)
    this.setSortBy = this.setSortBy.bind(this)
  }

  componentDidMount() {
    const { dispatch, times } = this.props
    dispatch(fetchTimes())
  }

  setSortBy(event) {
    const { dispatch } = this.props
    dispatch(sortBy(SortByValues.NAME_DESC))
  }

  render() {
    const { times } = this.props

    return (
      <div>
        <button onClick={this.setSortBy} />
        <ul>
          {times.map(user => {
            return (
              <User key={user.id} {...user}  />
            )
          })}
        </ul>
      </div>
    )
  }

}

AppContainer.propTypes = {
  sortBy : PropTypes.oneOf(Object.keys(SortByValues)),
  times : PropTypes.array.isRequired,
  isFetching : PropTypes.bool.isRequired,
  dispatch : PropTypes.func.isRequired
}

function mapStateToProps(state) {

  const { sortBy, startDate, endDate, isFetching, times } = state.timesheets

  return {
    sortBy,
    startDate,
    endDate,
    isFetching,
    times
  }
}

export default connect(mapStateToProps)(AppContainer)
