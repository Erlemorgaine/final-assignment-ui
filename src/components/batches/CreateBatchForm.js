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
    let newBatch = {
      startDate: this.refs.startDate.value,
      endDate: this.refs.endDate.value
    }
    
    this.props.createBatch(newBatch)
  }

  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="CreateBatchForm">
        <input 
          type="date"
          ref="startDate"/>
        <input 
          type="date"
          ref="endDate"/>
        <RaisedButton
          label="Create New Batch"
          primary={true}
          onClick={this.saveBatch} />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { createBatch })(CreateBatchForm)
