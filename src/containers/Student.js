import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOneBatch, fetchStudents } from '../actions/batches/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import EvaluationForm from '../components/students/EvaluationForm'
import EditStudentForm from '../components/students/EditStudentForm'

const evaluationShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  remarks: PropTypes.string,
})

const studentShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  evaluations: PropTypes.arrayOf(evaluationShape).isRequired
})

class Student extends PureComponent {
  static propTypes = {
    fetchOneBatch: PropTypes.func.isRequired,
    //fetchStudents: PropTypes.func.isRequired,
    subscribeToWebsocket: PropTypes.func.isRequired,
    batch: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      students: PropTypes.arrayOf(studentShape).isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
    })
  }

  componentWillMount() {
    const { batch, fetchOneBatch, subscribeToWebsocket } = this.props
    const batchId = this.props.match.params.batchId
    //const studentId = this.props.match.params.studentId

    if (!batch) { fetchOneBatch(batchId) }
    subscribeToWebsocket()
  }

  componentWillReceiveProps(nextProps) {
    const { batch } = nextProps

    if (batch) {
      this.props.fetchStudents(batch)
    }
  }

  renderEvaluations(evaluation, index) {
    let date = new Date(evaluation.date)
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    let renderDate = `${day}-${month}-${year}`

    if (renderDate === '1-0-1970') {
      renderDate = 'Not yet evaluated'
    }

    return(
      <span
        style={{ padding: 10, width: 80, color: '#ffffff' }}
        key={index}
        className={evaluation.color}
        onClick={console.log('click')}>
        { renderDate }
      </span>
    )
  }

  render() {
    const { batch } = this.props

    if (!batch) return null

    let student = batch.students.filter((s) => s._id === this.props.match.params.studentId)[0]

    return (
      <div>
        <h2>{ `${student.firstName} ${student.lastName}` }</h2>
        <EditStudentForm student={student} batchId={ batch._id }/>
        <div>
          <p>Current evaluations:</p>
          <div style={{ display: 'flex'}}>
            { student.evaluations.map(this.renderEvaluations) }
          </div>
        </div>
        <br/>
        <EvaluationForm student={student} batch={ batch }/>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, batches }, { match }) => {
  const batch = batches.filter((b) => (b._id === match.params.batchId))[0]
  return {
    batch,
  }
}

export default connect(mapStateToProps, {
  subscribeToWebsocket,
  fetchOneBatch,
  fetchStudents,
})(Student)
