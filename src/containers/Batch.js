import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchOneBatch, fetchStudents } from '../actions/batches/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import Paper from 'material-ui/Paper'
import StackedBar from '../components/batches/StackedBar'
import AskButton from '../components/batches/AskButton'
import AddStudentForm from '../components/students/AddStudentForm'
import removeOneStudent from '../actions/students/remove'
import './Batch.css'

const evaluationShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  date: PropTypes.string,
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

class Batch extends PureComponent {
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
    const { batch, fetchOneBatch, fetchStudents, subscribeToWebsocket } = this.props
    const { batchId } = this.props.match.params

    if (!batch) { fetchOneBatch(batchId) }
    subscribeToWebsocket()
  }

  componentWillReceiveProps(nextProps) {
    const { batch } = nextProps

    if (batch) {
      this.props.fetchStudents(batch)
    }
  }

  goToStudent = studentId => event => this.props.push(`/${this.props.batch._id}/showStudent/${studentId}`)

  backToBatches = () => event => {
    this.props.push(`/`)
  }

  showColor = (color) => {
    if (color ===  false) {
      return 'red'
    }
    return color
  }

  removeStudent = (batchId, studentId) => {
    this.props.removeOneStudent(batchId, studentId)
  }

  renderStudent = (student, index) => {
    let lastEvaluation = student.evaluations[student.evaluations.length-1]
    let studentColor = 'red'

    if (lastEvaluation) {
      studentColor = lastEvaluation.color
    }

    return (
      <div key={index}>
        <Paper className="buttonStyle" onClick={this.goToStudent(student._id)}>
            <div className="studentPicture" style={{ backgroundImage: `url(${student.picture})`, backgroundSize: 'cover', width: '100%', height: 200 }}></div>
            <p className="studentName">Name: { `${student.firstName} ${student.lastName}` }</p>
            <p className="studentColor">Currently: <span className="colors" id={ this.showColor(studentColor) }></span></p>
        </Paper>
        <button onClick={() => this.removeStudent(this.props.batch._id, student._id)}>Remove student</button>
      </div>
    )

    }

  render() {
    const { batch } = this.props
    if (!batch) return null

    console.log(batch.students)

    return (
      <div>
        <div style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'center' }} className="Batch">
          <h1>Students of batch { batch.batchNr }</h1>
          <StackedBar students={ batch.students }/>
          <AskButton batch={ batch } />
          <br/>
          <div style={{ display: 'flex', alignItems: 'center', flexFlow: 'row wrap' }}>
          {batch.students.map(this.renderStudent)}
          </div>
        </div>
        <AddStudentForm batchId={ batch._id }/>
        <br/>
        <button onClick={this.backToBatches()}>Back to the batches</button>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, batches }, { match }) => {
  const batch = batches.filter((b) => (b._id === match.params.batchId))[0]
  return {
    batch,
    currentUser
  }
}

export default connect(mapStateToProps, {
  subscribeToWebsocket,
  fetchOneBatch,
  fetchStudents,
  removeOneStudent,
  push,
})(Batch)
