import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import ColorButton from './ColorButton'
import createEvaluation from '../../actions/evaluations/create'

class EvaluationForm extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  constructor() {
    super()

    this.state = {
      colorEvaluation: ""
    }

    this.pickColor = this.pickColor.bind(this)
  }

  pickColor = (color) => {
    console.log('picked')
    this.setState({
      colorEvaluation: color
    })
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
    this.saveStudent(this.refs.date.value, this.refs.remarks.value, this.state.colorEvaluation, this.props.student, this.props.batch, this.props.createEvaluation)
      .then(function(batchId) {
        pushIt(`/${batchId}/showStudent/${studentId}`)
      })
  }

  goToBatch = (pushIt) => event => {
    event.preventDefault()
    this.saveStudent(this.refs.date.value, this.refs.remarks.value, this.state.colorEvaluation, this.props.student, this.props.batch, this.props.createEvaluation)
      .then(function(batchId) {
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

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { createEvaluation, push })(EvaluationForm)
