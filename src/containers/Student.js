import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOneBatch, fetchStudents } from '../actions/batches/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import EvaluationForm from '../components/students/EvaluationForm'

const studentShape = PropTypes.shape({
  //userId: PropTypes.string.isRequired,
  symbol: PropTypes.string,
  name: PropTypes.string
})

class Student extends PureComponent {
  static propTypes = {
    fetchOneBatch: PropTypes.func.isRequired,
    fetchStudents: PropTypes.func.isRequired,
    subscribeToWebsocket: PropTypes.func.isRequired,
    batch: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      //userId: PropTypes.string.isRequired,
      students: PropTypes.arrayOf(studentShape).isRequired,
    }),
    currentStudent: studentShape,
    //mixins: [IntlMixin]
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

    return(
      <span
        style={{ padding: 10, width: 80 }}
        key={index}
        className={evaluation.color}
        onClick={console.log('click')}>
        { day }-{ month }-{ year }
      </span>
    )
  }

  render() {
    const { batch } = this.props

    if (!batch) return null

    let student = batch.students.filter((s) => s._id === this.props.match.params.studentId)[0]

    return (
      <div>
        <h2>{ student.name }</h2>
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
