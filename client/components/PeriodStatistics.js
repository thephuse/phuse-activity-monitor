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
      <section style={styles.periodStatisticsWrapper}>

        <div style={styles.periodStatistic}>
          <div style={[styles.base, styles.lightBase]}>
            <span style={[styles.text, styles.circleText]}>{total.toFixed(1)}</span>
            <span style={[styles.hoursText, styles.ratioHoursText]}>total</span>
          </div>
        </div>

        <div style={styles.periodStatistic}>
          <div style={[styles.base, styles.lightBase]}>
            <span style={[styles.text, styles.circleText]}>{billableTotal.toFixed(1)}</span>
            <span style={[styles.hoursText, styles.ratioHoursText]}>billable</span>
          </div>
        </div>

        <div style={styles.periodStatistic}>
          <div style={styles.base}>
            <div style={styles.slice}>
              <div style={[styles.bar, {
                display : (billablePercentage === 0 ? 'none' : 'block'),
                transform : `rotate(${360/100*billablePercentage}deg)`
              }]}></div>
              <div style={[styles.fill, {
                display : (billablePercentage === 0 ? 'none' : 'block'),
                transform : (billablePercentage >= 50 ? 'rotate(180deg)' : 'rotate(0deg)'),
                borderColor : (billablePercentage <= 50 ? '#DFDFDF' : '#2B8CBE')
              }]}></div>
              <div style={styles.center}>
                <span style={[styles.text, styles.circleText]}>{Math.round(billablePercentage)}%</span>
                <span style={[styles.hoursText, styles.ratioHoursText]}>ratio</span>
              </div>
            </div>
          </div>
        </div>

      </section>
    )

  }

}

export default Radium(PeriodStatistics)

const styles = {
  periodStatisticsWrapper : {
    maxWidth : 720,
    margin : '0 auto 30px',
    display : 'block',
    '@media (max-width: 480px)' : {
      margin : '0 auto 20px'
    }
  },
  periodStatistic : {
    display : 'inline-block',
    textAlign : 'center',
    width : 'calc(100% / 3)',
    padding : '0 5px',
    boxSizing : 'border-box'
  },
  hoursFigure : {},
  base : {
    position : 'relative',
    fontSize : 100,
    width : '1em',
    height : '1em',
    borderRadius : '50%',
    backgroundColor : '#DFDFDF',
    boxSizing : 'border-box',
    display : 'inline-block',
    '@media (max-width: 480px)' : {
      fontSize : 90
    }
  },
  lightBase : {
    backgroundColor : '#F3F3F3'
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
    borderWidth : '0.03em',
    borderStyle : 'solid',
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
    fontSize : '0.32em',
    lineHeight : '1',
    fontWeight : 100,
  },
  circleText : {
    position : 'absolute',
    bottom : '40%',
    left : 0,
    width : '100%'
  },
  hoursText : {
    fontSize : '0.11em',
    fontWeight : 200,
    textTransform : 'uppercase',
    display : 'block'
  },
  ratioHoursText : {
    display : 'block',
    position : 'absolute',
    top : '65%',
    letterSpacing : 0.75,
    width : '100%',
    color : '#999',
    lineHeight : 1
  },
}
