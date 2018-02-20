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
  }

  componentWillMount() {
    const { batch, fetchOneBatch, subscribeToWebsocket } = this.props
    const batchId = this.props.match.params.batchId
    const studentId = this.props.match.params.studentId

    if (!batch) { fetchOneBatch(batchId) }
    subscribeToWebsocket()
  }

  componentWillReceiveProps(nextProps) {
    const { batch } = nextProps

    if (batch) {
      this.props.fetchStudents(batch)
    }
  }

  render() {
    const { batch } = this.props

    if (!batch) return null

    let student = batch.students.filter((s) => s._id === this.props.match.params.studentId)[0]

    return (
      <div>
        <h2>{ student.name }</h2>
        <EvaluationForm />
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
