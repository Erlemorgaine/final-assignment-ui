import React, { PureComponent } from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import ColorButton from './ColorButton'
import createEvaluation from '../../actions/students/createEvaluation'

let colorEvaluation = ""

class EvaluationForm extends PureComponent {

  pickColor = (color) => {
    colorEvaluation = color
    return colorEvaluation
  }

  goToNextStudent = (studentId) => event => {
    event.preventDefault()
    let newEvaluation = {
      date: this.refs.date.value,
      remarks: this.refs.remarks.value,
    }

    newEvaluation = [newEvaluation, this.props.student._id]

    this.props.createEvaluation(this.props.batch._id, newEvaluation)
    //this.props.push(`/${this.props.batch._id}/showStudent/${studentId}`)
  }

  goToBatch = () => event => {
    event.preventDefault()
    let newEvaluation = {
      date: this.refs.date.value,
      remarks: this.refs.remarks.value,
      color: colorEvaluation
    }
     newEvaluation = [newEvaluation, this.props.student._id]

    this.props.createEvaluation(this.props.batch._id, newEvaluation)
    //this.props.push(`/showBatch/${this.props.batch._id}/`)
  }

  render() {
    const students = this.props.batch.students
    let studentIndex = students.indexOf(this.props.student)
    let nextStudent = students[0]
    if (studentIndex < (students.length-1)) {
      nextStudent = students[studentIndex + 1]
    }

    return (
      <form>
        <h3>Make a new evaluation!</h3>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', flexFlow: 'row wrap' }}>
            <ColorButton color="Red" onClick={() => this.pickColor('red')}/>
            <ColorButton color="Yellow" onClick={() => this.pickColor('yellow')}/>
            <ColorButton color="Green" onClick={() => this.pickColor('green')}/>
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
            onClick={this.goToNextStudent(nextStudent._id)}
            value="Save and move to next student"/>
        </div>
      </form>
    )
  }
}

export default connect(null, { createEvaluation, push })(EvaluationForm)
