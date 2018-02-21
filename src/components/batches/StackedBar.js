import React, { PureComponent } from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { connect as subscribeToWebsocket } from '../../actions/websocket'
import './StackedBar.css'

class StackedBar extends PureComponent {

  calculateColorPercentage(color) {
    let colorGroup = this.props.students.filter((s) => {
      let lastDay = s.days[s.days.length-1]
      let studentColor = 'red'

      if (lastDay) {
        studentColor = lastDay.color
      }
      return studentColor === color
    })

    let colorPercentage = (colorGroup.length / this.props.students.length)*100
    if (!colorPercentage) {
      return 0
    }
    return colorPercentage
  }

  render() {
    let percentageRed = this.calculateColorPercentage("red")
    let percentageYellow = this.calculateColorPercentage("yellow")
    let percentageGreen = this.calculateColorPercentage("green")

    return (
      <div className="stackedBar">
        <span style={{ width: `${percentageRed}%` }} className="bar red">{ percentageRed }%</span>
        <span style={{ width: `${percentageYellow}%` }} className="bar yellow">{ percentageYellow }%</span>
        <span style={{ width: `${percentageGreen}%` }} className="bar green">{ percentageGreen }%</span>
      </div>
    )
  }
}

export default connect(null, {subscribeToWebsocket})(StackedBar)
