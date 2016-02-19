const styles = require('../stylus/LoadingSpinner.styl')

import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'

class LoaderSpinner extends Component {

  render() {
    return (
      <div className={styles.loader}>
        <div className={styles.base}>
          <div className={styles.slice}>
            <div className={styles.bar}/>
            <div className={styles.center}>
              <div className={styles.hourglass}>
                <div className={styles.sandTop} />
                <div className={styles.sandBottom} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default LoaderSpinner
