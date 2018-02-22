import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import updateStudent from '../../actions/students/update'

class EditStudentForm extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  saveStudent = () => {
    let updatedStudent = {
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      picture: this.refs.picture.value,
    }

    updatedStudent = [this.props.student._id, updatedStudent]
    this.props.updateStudent(this.props.batchId, updatedStudent)
  }

  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="EditStudentForm">
        <h3>Edit this student</h3>
        <div>
          First name:
          <input
            type="text"
            ref="firstName"
            placeholder={this.props.student.firstName}/>
        </div>
        Last name:
        <div>
          <input
            type="text"
            ref="lastName"
            placeholder={this.props.student.lastName}/>
        </div>
        <div>
          Picture url:
          <input
            type="text"
            ref="picture"
            placeholder={this.props.student.picture}/>
        </div>
        <RaisedButton
          label="Save"
          primary={true}
          onClick={this.saveStudent} />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, {
  updateStudent,
})(EditStudentForm)
