import React, { PureComponent } from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import ColorButton from './ColorButton'

let colorEvaluation = ""

class EvaluationForm extends PureComponent {

  createEvaluation = () => {

    // let newEvaluation = {
    //   date: this.refs.date.value,
    //   remarks: this.refs.remarks.value,
    // }
  }

  pickColor = (color) => {
    colorEvaluation = color
    return colorEvaluation
  }

  goToNextStudent = studentId => event => {
    console.log('click')
    this.props.push(`/${this.props.batch._id}/showStudent/${studentId}`)
  }

  goToBatch = () => event => {
    this.props.push(`/showBatch/${this.props.batch._id}/`)
  }

  render() {

    return (
      <form>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', flexFlow: 'row wrap' }}>
            <ColorButton color="Red" onClick={this.pickColor}/>
            <ColorButton color="Yellow" onClick={this.pickColor}/>
            <ColorButton color="Green" onClick={this.pickColor}/>
            <br/>
          </div>
          <span>
            <p>Remarks:</p>
            <textarea style={{ marginBottom: '30px' }}
              name="textarea"
              cols="30"
              rows="10"
              ref="remarks">
            </textarea>
          </span>
          <span>
            <div>Evaluation date:</div>
            <input
              type="date"
              ref="date"/>
          </span>
          <br/>
          <input
            type="submit"
            onClick={this.goToBatch()}
            value="Save"/>
          <input
            type="submit"
            onClick={this.goToNextStudent()}
            value="Save and move to next student"/>
        </div>
      </form>
    )
  }
}

export default connect(null, { push })(EvaluationForm)
