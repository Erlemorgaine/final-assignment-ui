import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import createStudent from '../../actions/students/create'

class AddStudentForm extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  saveStudent = () => {
    if (!this.refs.firstName.value) {
      return alert('The student needs a first name')
    }
    if (!this.refs.lastName.value) {
      return alert('The student needs a last name')
    }
    if (!this.refs.picture.value) {
      return alert('The student needs a picture')
    }

    let newStudent = {
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      picture: this.refs.picture.value,
    }

    this.props.createStudent(this.props.batchId, newStudent)
  }

  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="AddStudentForm">
        <h3>Add new student</h3>
        <div>
          First name:
          <input
            type="text"
            ref="firstName"/>
        </div>
        Last name:
        <div>
          <input
            type="text"
            ref="lastName"/>
        </div>
        <div>
          Picture url:
          <input
            type="text"
            ref="picture"/>
        </div>
        <RaisedButton
          label="Add student to class"
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
  createStudent,
})(AddStudentForm)
