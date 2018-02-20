import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchOneBatch, fetchStudents } from '../actions/batches/fetch'
//import doTurn from '../actions/batches/doTurn'
import { connect as subscribeToWebsocket } from '../actions/websocket'
//import TurnButton from '../components/batches/TurnButton'
import Paper from 'material-ui/Paper'
import StackedBar from '../components/batches/StackedBar'
import './Batch.css'

const studentShape = PropTypes.shape({
  //userId: PropTypes.string.isRequired,
  symbol: PropTypes.string,
  name: PropTypes.string
})

class Batch extends PureComponent {
  static propTypes = {
    fetchOneBatch: PropTypes.func.isRequired,
    //fetchPlayers: PropTypes.func.isRequired,
    subscribeToWebsocket: PropTypes.func.isRequired,
    batch: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      students: PropTypes.arrayOf(studentShape).isRequired,
    }),
    currentPlayer: studentShape,
    isPlayer: PropTypes.bool,
    isJoinable: PropTypes.bool,
  }

  componentWillMount() {
    const { batch, fetchOneBatch, subscribeToWebsocket } = this.props
    const { batchId } = this.props.match.params

    if (!batch) { fetchOneBatch(batchId) }
    subscribeToWebsocket()
  }

  componentWillReceiveProps(nextProps) {
    const { batch } = nextProps

    if (batch) {
      //this.props.fetchPlayers(batch)
    }
  }

  goToStudent = studentId => event => this.props.push(`/${this.props.batch._id}/showStudent/${studentId}`)

  // doTurnWithBatchId = (weapon) => () => {
  //   return this.props.doTurn(weapon, this.props.batch._id)
  // }

  showColor = (color) => {
    if (!color) {
      return 'R'
    }
    return color
  }

  renderStudent = (student, index) => {
    return (
      <Paper
        key={index}
        className="buttonStyle" onClick={this.goToStudent(student._id)}>
          <p className="studentPicture">{ student.picture }</p>
          <p className="studentName">Name: { student.name }</p>
          <p className="studentColor">Currently: <span className="colors" id={ this.showColor(student.days[student.days.length-1].color) }></span></p>
        </Paper>
    )

    }

  render() {
    const { batch } = this.props
    if (!batch) return null

    return (
      <div style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'center' }} className="Batch">
        <h1>Students of batch { batch.batchNr }</h1>
        <StackedBar students={ batch.students }/>
        <div style={{ display: 'flex', alignItems: 'center', flexFlow: 'row wrap' }}>
        {this.props.batch.students.sort((a, b) => {
          return a.name - b.name
        }).map(this.renderStudent)}
        </div>
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
  push,
  //doTurn
})(Batch)
