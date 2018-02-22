// src/components/batches/CreateBatchButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
//import StarIcon from 'material-ui/svg-icons/action/favorite'
import createBatch from '../../actions/batches/create'

class CreateBatchForm extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  saveBatch = () => {
    let batchNr = 0

    if (this.refs.batchNr.value <= this.props.batchNr) {
      batchNr = this.props.batchNr + 1
    } else {
      batchNr = this.refs.batchNr.value
    }

    if (!this.refs.startDate.value || !this.refs.endDate.value) {
      return alert('You must provide a start AND end date!')
    }

    let newBatch = {
      batchNr: batchNr,
      startDate: this.refs.startDate.value,
      endDate: this.refs.endDate.value,
    }

    this.props.createBatch(newBatch)
  }

  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="CreateBatchForm">
        <span>Start date:</span>
        <input
          type="date"
          ref="startDate"/>
        <span>End date:</span>
        <input
          type="date"
          ref="endDate"/>
        <span>Batch nr (automatically generated if you do not pick!):</span>
        <input
          type="number"
          min={this.props.batchNr + 1}
          ref="batchNr"
          placeholder="If you don't choose a number value, the number will automatically be generated"/>
        <div>
          <RaisedButton
            label="Create New Batch"
            primary={true}
            onClick={this.saveBatch} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { createBatch })(CreateBatchForm)
