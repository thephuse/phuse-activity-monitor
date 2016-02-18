import React, { Component, PropTypes } from 'react'
import Radium from 'radium'

const getBillablePercentage = function(timesheets) {
    let total = 0
    let billableTotal = 0
    let billablePercentage = 0
    if (timesheets && timesheets.length) {
      total = timesheets.map(timesheet => timesheet.total).reduce((prev, curr) => { return prev + curr })
      billableTotal = timesheets.map(timesheet => timesheet.billable_total).reduce((prev, curr) => { return prev + curr })
      billablePercentage = (billableTotal / total * 100)
    }
    return {
      total,
      billableTotal,
      billablePercentage
    }
  }

class PeriodStatistics extends Component {

  render() {

    const { times } = this.props

    const {
      total,
      billableTotal,
      billablePercentage
    } = getBillablePercentage(times)

    return (
      <section>

        <div>
          <span style={styles.hoursFigure}>{total.toFixed(1)}</span>
          <span style={styles.hoursText}>total</span>
        </div>

        <div>
          <span style={styles.hoursFigure}>{billableTotal.toFixed(1)}</span>
          <span style={styles.hoursText}>billable</span>
        </div>

        <div style={styles.base}>
          <div style={styles.slice}>
            <div style={[styles.bar, {transform : `rotate(${360/100*billablePercentage}deg)`}]}></div>
            <div style={[styles.fill, {transform : (billablePercentage >= 50 ? 'rotate(180deg)' : 'rotate(0deg)') }]}></div>
            <div style={styles.center}>
              <span style={styles.text}>{Math.round(billablePercentage)}%</span>
              <span style={[styles.hoursText, styles.ratioHoursText]}>ratio</span>
            </div>
          </div>
        </div>

      </section>
    )

  }

}

export default Radium(PeriodStatistics)

const ratioFontSize = 32

const styles = {
  hoursFigure : {
    fontFamily : 'Helvetica Neue, Helvetica, Arial, sans-serif'
  },
  hoursText : {
    fontFamily : 'Helvetica Neue, Helvetica, Arial, sans-serif',
    fontSize : 11,
    fontWeight : 200,
    textTransform : 'uppercase',
    display : 'block'
  },
  ratioHoursText : {
    marginTop : ratioFontSize * 0.72,
    letterSpacing : 0.75,
    color : '#999'
  },
  base : {
    position : 'relative',
    fontSize : 100,
    width : '1em',
    height : '1em',
    borderRadius : '50%',
    backgroundColor : '#DFDFDF',
    boxSizing : 'border-box'
  },
  slice : {
    clip : 'rect(auto, auto, auto, auto)',
    position : 'absolute',
    width : '1em',
    height : '1em',
    boxSizing : 'content-box'
  },
  bar : {
    clip : 'rect(0em, 0.5em, 1em, 0em)',
    position : 'absolute',
    border : '0.03em solid #2B8CBE',
    width : '0.94em',
    height : '0.94em',
    borderRadius : '50%'
  },
  fill : {
    borderRadius : '50%',
    position : 'absolute',
    border : '0.03em solid #2B8CBE',
    width : '0.94em',
    height : '0.94em',
    clip : 'rect(0em, 0.5em, 1em, 0em)'
  },
  center : {
    position : 'absolute',
    top : '0.03em',
    left : '0.03em',
    lineHeight : '0.94em',
    display : 'block',
    borderRadius : '50%',
    backgroundColor : 'white',
    width : '0.94em',
    height : '0.94em',
    textAlign : 'center'
  },
  text : {
    display : 'inline-block',
    fontFamily : 'Helvetica Neue, Helvetica, Arial, sans-serif',
    fontSize : ratioFontSize,
    lineHeight : '1',
    marginTop : '-0.5em',
    fontWeight : 100,
    position : 'absolute',
    top : '50%',
    left : 0,
    width : '100%'
  }
}
