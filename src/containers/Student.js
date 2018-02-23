import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOneBatch } from '../actions/batches/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import { push } from 'react-router-redux'
import Evaluation from './Evaluation'
import EvaluationForm from '../components/evaluations/EvaluationForm'
import EditStudentForm from '../components/students/EditStudentForm'

const evaluationShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  remarks: PropTypes.string,
  userId: PropTypes.string.isRequired,
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
    signedIn: PropTypes.bool,
    fetchOneBatch: PropTypes.func.isRequired,
    subscribeToWebsocket: PropTypes.func.isRequired,
    batch: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      students: PropTypes.arrayOf(studentShape).isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
    })
  }

  constructor() {
    super();

    this.state = {
      clicked: ''
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    const { batch, fetchOneBatch, subscribeToWebsocket } = this.props
    const batchId = this.props.match.params.batchId

    if (!batch) { fetchOneBatch(batchId) }
    subscribeToWebsocket()
  }

  pickColor = (color) => {
    let colorEvaluation = color
    return colorEvaluation
  }

  handleClick = (id) => {
    this.setState({
      clicked: id
    });
  }

  backToBatch = () => event => {
    this.props.push(`/showBatch/${this.props.batch._id}/`)
  }

  renderEvaluations = (evaluation, index) => {
    const student = this.props.batch.students.filter((s) => s._id === this.props.match.params.studentId)[0]

    let date = new Date(evaluation.date)
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    let renderDate = `${day}-${month}-${year}`

    return(
      <div key={index}>
        <button
          style={{ padding: 10, width: 80, color: '#ffffff' }}
          className={evaluation.color}
          onClick={() => this.handleClick(evaluation._id)}>
            {renderDate}
        </button>
        <br/><br/>
        <div>
          { this.state.clicked === evaluation._id ? <Evaluation
            evaluation={evaluation}
            userId={this.props.currentUser._id}
            batchId={this.props.batch._id}
            studentId={student._id}/> : null }
        </div>
      </div>
    )
  }

  render() {
    const { batch } = this.props

    if (!batch) return null

    let student = batch.students.filter((s) => s._id === this.props.match.params.studentId)[0]

    return (
      <div>
        <h2>{ `${student.firstName} ${student.lastName}` }</h2>
        <img src={ student.picture } style={{ width: 200, height: 250, backgroundSize: 'cover' }} alt={ student.firstName }/>
        <EditStudentForm student={student} batchId={ batch._id }/>
        <div>
          <p>Current evaluations:</p>
          <div style={{ display: 'flex'}}>
            { student.evaluations.map(this.renderEvaluations) }
          </div>
        </div>
        <br/>
        <EvaluationForm student={student} batch={ batch }/>
        <button onClick={this.backToBatch()}>Back to the batch!</button>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, batches }, { match }) => {
  const batch = batches.filter((b) => (b._id === match.params.batchId))[0]
  return {
    batch,
    currentUser,
  }
}

export default connect(mapStateToProps, {
  subscribeToWebsocket,
  fetchOneBatch,
  push
})(Student)
