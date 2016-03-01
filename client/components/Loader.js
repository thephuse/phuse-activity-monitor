import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import LoaderSpinner from './LoaderSpinner'

class Loader extends Component {

  render() {
    const {
      loading,
      children
    } = this.props

    return (loading ? <LoaderSpinner /> : <span>{children}</span>)
  }

}

Loader.propTypes = {
  loading : PropTypes.bool.isRequired,
  children : PropTypes.array
}

export default Loader
