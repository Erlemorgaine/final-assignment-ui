import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import ColorButton from './ColorButton'
import createEvaluation from '../../actions/evaluations/create'

let colorEvaluation = ""

class EvaluationForm extends PureComponent {

  pickColor = (color) => {
    colorEvaluation = color
    return colorEvaluation
  }

  saveStudent = (date, remarks, color, student, batch, saveData) => {
    return new Promise(function(resolve, reject) {
      if (!date) {
        date = Date.now()
      }
      if (!color) {
        return alert('You need to provide a color')
      }
      if ((color === 'red' || color === 'yellow') && !remarks) {
        return alert('You need to provide a remark')
      }
      let newEvaluation = {
        date: date,
        remarks: remarks,
        color: color,
      }

      newEvaluation = [newEvaluation, student._id]
      if (newEvaluation) {
        saveData(batch._id, newEvaluation)
        resolve(batch._id)
      } else {
        reject(batch._id)
      }
    })
  }

  goToNextStudent = (studentId, pushIt) => event => {
    event.preventDefault()
    this.saveStudent(this.refs.date.value, this.refs.remarks.value, colorEvaluation, this.props.student, this.props.batch, this.props.createEvaluation)
      .then(function(batchId) {
        console.log('resolved')
        pushIt(`/${batchId}/showStudent/${studentId}`)
      })
  }

  goToBatch = (pushIt) => event => {
    event.preventDefault()
    this.saveStudent(this.refs.date.value, this.refs.remarks.value, colorEvaluation, this.props.student, this.props.batch, this.props.createEvaluation)
      .then(function(batchId) {
        console.log('resolved')
        pushIt(`/showBatch/${batchId}`)
      })
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
            onClick={this.goToBatch(this.props.push)}
            value="Save"/>
          <input
            type="submit"
            onClick={this.goToNextStudent(nextStudent._id, this.props.push)}
            value="Save and move to next student"/>
        </div>
      </form>
    )
  }
}

export default connect(null, { createEvaluation, push })(EvaluationForm)
