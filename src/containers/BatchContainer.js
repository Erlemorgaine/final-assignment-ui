import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchBatches, { fetchPlayers } from '../actions/batches/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import CreateBatchForm from '../components/batches/CreateBatchForm'
import Paper from 'material-ui/Paper'
//import Menu from 'material-ui/Menu'
//import MenuItem from 'material-ui/MenuItem'
import './BatchContainer.css'

class BatchContainer extends PureComponent {
  componentWillMount() {
    this.props.fetchBatches()
    this.props.subscribeToWebsocket()
  }

  goToBatch = batchId => event => this.props.push(`/showBatch/${batchId}`)

  renderBatch = (batch, index) => {

    return (
      <Paper key={index} className="buttonStyle" onClick={this.goToBatch(batch._id)}>
        <p>Batch #{ batch.batchNr }</p>
        <p>Starts at: { batch.startDate }</p>
        <p>Ends at: { batch.endDate }</p>
        <p>{ batch.students.length } students</p>
      </Paper>
    )
  }

  render() {
    return (
      <div className="BatchContainer">
        <h1>Welcome { this.props.currentUser.name }! </h1>
        <div style={{ display: 'flex', alignItems: 'center', flexFlow: 'row wrap' }}>
          {this.props.batches.sort((a, b) => {
            return a.batchNr - b.batchNr
          }).map(this.renderBatch)}
        </div>
        <br/>
        <CreateBatchForm />
      </div>
    )
  }
}

const mapStateToProps = ({ batches, currentUser }) => ({ batches, currentUser })

export default connect(mapStateToProps, { fetchBatches, subscribeToWebsocket, fetchPlayers, push })(BatchContainer)
