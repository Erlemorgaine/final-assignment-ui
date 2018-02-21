import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import askStudent from '../../actions/batches/askStudent'

class AskButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  render() {
    const { batch } = this.props
    if (!this.props.signedIn) return null

    return (
      <div className="AskButton">
        <RaisedButton
          label="Ask a question to ... :"
          primary={true}
          onClick={() => this.props.askStudent(batch._id)} />
        <div>{ batch.askedStudents[batch.askedStudents.length-1] }</div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, {
  askStudent,
})(AskButton)
