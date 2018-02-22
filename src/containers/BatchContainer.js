import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchBatches, { fetchStudents } from '../actions/batches/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import CreateBatchForm from '../components/batches/CreateBatchForm'
import Paper from 'material-ui/Paper'
import './BatchContainer.css'

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

class BatchContainer extends PureComponent {
  static propTypes = {
    fetchBatches: PropTypes.func.isRequired,
    subscribeToWebsocket: PropTypes.func.isRequired,
    batch: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      students: PropTypes.arrayOf(studentShape).isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
    })
  }

  componentWillMount() {
    this.props.fetchBatches()
    this.props.subscribeToWebsocket()
  }

  goToBatch = batchId => event => this.props.push(`/showBatch/${batchId}`)

  renderBatch = (batch, index) => {
    let startDate = new Date(batch.startDate)
    let endDate = new Date(batch.startDate)

    return (
      <Paper key={index} className="buttonStyle" onClick={this.goToBatch(batch._id)}>
        <p>Batch #{ batch.batchNr }</p>
        <p>Starts at: { startDate.getDate() }-{ startDate.getMonth() }-{ startDate.getFullYear() }</p>
        <p>Ends at: { endDate.getDate() }-{ endDate.getMonth() }-{ endDate.getFullYear() }</p>
        <p>{ batch.students.length } students</p>
      </Paper>
    )
  }

  render() {
    return (
      <div className="BatchContainer">
        <h1>Welcome! </h1>
        <div style={{ display: 'flex', alignItems: 'center', flexFlow: 'row wrap' }}>
          {this.props.batches.sort((a, b) => {
            return a.batchNr - b.batchNr
          }).map(this.renderBatch)}
        </div>
        <br/>
        <CreateBatchForm batchNr={this.props.batches.length} />
      </div>
    )
  }
}

const mapStateToProps = ({ batches, currentUser }) => ({ batches, currentUser })

export default connect(mapStateToProps, { fetchBatches, subscribeToWebsocket, fetchStudents, push })(BatchContainer)
