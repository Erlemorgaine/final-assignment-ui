import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { connect as subscribeToWebsocket } from '../../actions/websocket'
import updateEvaluation from '../../actions/evaluations/update'

class EditEvaluationForm extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  saveEvaluation = () => event => {
    event.preventDefault()

    let updatedEvaluation = {
      remarks: this.refs.remarks.value,
      color: this.refs.color.value,
    }

    updatedEvaluation = [this.props.studentId, this.props.evaluation._id, updatedEvaluation]
    this.props.updateEvaluation(this.props.batchId, updatedEvaluation)
  }

  render() {
    return (
      <form style={{ maxWidth: 200, }}>
        <textarea ref="remarks" placeholder={this.props.evaluation.remarks} id="" cols="20" rows="10"></textarea>
        <select ref="color" name="colors">
          <option value="green">green</option>
          <option value="yellow">yellow</option>
          <option value="red">red</option>
        </select>
        <input
          type="submit"
          onClick={this.saveEvaluation()}
          value="Save"/>
      </form>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, {
  updateEvaluation,
})(EditEvaluationForm)
