import React, { PureComponent } from 'react'
// import { connect } from 'react-redux'
// import { connect as subscribeToWebsocket } from '../actions/websocket'
import EditEvaluationForm from '../components/evaluations/EditEvaluationForm'

class Evaluation extends PureComponent {
  constructor() {
    super()

    this.state = {
      clicked: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = (id) => {
    if (this.props.evaluation.userId !== this.props.userId ) {
      return alert('You are not allowed to edit this!')
    }
    this.setState({
      clicked: true
    })
  }

  renderRemark = (evaluation) => {
    return(
      <div>
        <div>{evaluation.remarks}</div>
        <button onClick={this.handleClick}>Edit</button>
      </div>
    )
  }

  render() {
    const evaluation = this.props.evaluation

    return (
      <div style={{ maxWidth: 200, }}>
        <div>{ this.state.clicked ? <EditEvaluationForm
          evaluation={evaluation}
          batchId={this.props.batchId}
          studentId={this.props.studentId}/> : this.renderRemark(evaluation) }</div>
      </div>
    )
  }
}

export default Evaluation
